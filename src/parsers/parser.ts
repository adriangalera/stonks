import Papa, { type ParseResult } from 'papaparse';
import { MyInvestorParser } from './myinvestor.parser';
import { DegiroParser } from './degiro.parser';

export interface Parser {
    parseOperation(data: any): ParsedOperation
    parseDate(dateStr: string): Date,
    parseAmount(amountStr: string): number
    postProcess(data: ParsedOperation[]): ParsedOperation[]
    setOperationType(operations: ParsedOperation[]): ParsedOperation[]
}

export enum OperationType {
    BUY = "BUY",
    SELL = "SELL",
    DIVIDEND = "DIVIDEND",
    COST = "COST",
    UNKNOWN = "UNKNOWN"
}

export type ParsedOperation = {
    date: Date,
    concept: string,
    amount: number
    currency: string
    type: OperationType
}

type ParserConfig = {
    parser: Parser
    separator: string
}

export enum ParseOperationType {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
}

const groupByConcept = (allOperations: ParsedOperation[]): Map<string, ParsedOperation[]> => {
    const groupedByConcept = new Map<string, ParsedOperation[]>();
    for (const operation of allOperations) {
        const concept = operation.concept;
        if (!groupedByConcept.has(concept)) {
            groupedByConcept.set(concept, []);
        }
        groupedByConcept.get(concept)!.push(operation);
    }
    return groupedByConcept
}

const onlyClosedOperations = (parser: Parser, allOperations: ParsedOperation[]): Map<string, ParsedOperation[]> => {
    const closedOperations = new Map<string, ParsedOperation[]>();
    const groupedByConcept = groupByConcept(allOperations)
    for (const [concept, operations] of groupedByConcept.entries()) {
        const operationsWithTypes = parser.setOperationType(operations)
        const types = operationsWithTypes.map((op) => op.type)
        if (types.includes(OperationType.SELL) && types.includes(OperationType.BUY)) {
            closedOperations.set(concept, operationsWithTypes)
        }
    }
    return closedOperations
}

const findParser = (csvData: string): ParserConfig => {
    if (csvData.includes('Fecha de valor')) {
        return { parser: MyInvestorParser, separator: ";" }
    }
    if (csvData.includes("ID Orden")) {
        return { parser: DegiroParser, separator: "," }
    }
    throw new Error("Cannot find a parser")
}

const applyDates = (parsedData: ParsedOperation[], startDate?: Date | null, endDate?: Date | null): ParsedOperation[] => {
    if (endDate == null) {
        endDate = new Date()
    }
    if (startDate == null) {
        startDate = new Date('2010-01-01')
    }
    return parsedData.filter((operation) => operation.date.getTime() >= new Date(startDate).getTime() && operation.date.getTime() <= new Date(endDate).getTime())
}

export const parseCsvForClosedOperations = (csvData: string, startDate?: Date | null, endDate?: Date | null): Map<string, ParsedOperation[]> => {
    const parserConfig = findParser(csvData)
    const parser = parserConfig.parser
    const rawData: ParseResult<string> = Papa.parse(csvData, { header: false, skipEmptyLines: true })
    let parsedData = rawData.data.map((data) => parser.parseOperation(data))
    parsedData = parser.postProcess(parsedData)
    parsedData = applyDates(parsedData, startDate, endDate)
    return onlyClosedOperations(parser, parsedData)
}

