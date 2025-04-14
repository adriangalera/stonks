import Papa, { type ParseResult } from 'papaparse';

export enum ParseOperationType {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
}

export type OpenOperation = {
    ticker: string,
    buyPrice: number,
    amount: number,
    currency: string,
    currentPrice: number | undefined,
    profit: number | undefined
}

const parse = (data: any): OpenOperation => {
    return {
        ticker: data["Ticker"],
        buyPrice: parseFloat(data["BuyPrice"]),
        amount: parseInt(data["Amount"]),
        currency: data["Currency"],
        currentPrice: undefined,
        profit: undefined
    }
}

export const parseOpenOperations = (csvData: string): OpenOperation[] => {
    const rawData: ParseResult<string> = Papa.parse(csvData, { header: true, skipEmptyLines: true })
    return rawData.data.map((data) => parse(data))
}