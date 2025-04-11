import type { Parser, ParsedOperation } from "./parser"
import { OperationType } from "./parser";

const buyDividendRatio: number = 5

export const MyInvestorParser: Parser = {

    parseOperation(data: any): ParsedOperation {
        return {
            date: this.parseDate(data[0]),
            concept: data[2],
            amount: this.parseAmount(data[3]),
            currency: data[4],
            type: OperationType.UNKNOWN
        }
    },
    parseDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // month is 0-based
    },
    parseAmount(amountStr: string): number {
        return parseFloat(amountStr.replace(',', '.'));
    },
    postProcess(data: ParsedOperation[]): ParsedOperation[] {
        return data
            .filter(data => data.concept.includes("@"))
            .filter(data => data.currency === "EUR")
            .sort((a, b) => a.date.getTime() - b.date.getTime())
    },
    setOperationType(operations: ParsedOperation[]): ParsedOperation[] {
        operations.sort((a, b) => a.date.getTime() - b.date.getTime())

        const initialOperation = operations[0]
        if (initialOperation.amount < 0) initialOperation.type = OperationType.BUY

        for (let i = 1; i < operations.length; i++) {
            if (operations[i].amount > 0) {
                let operationPercentage = Math.abs(operations[i].amount / initialOperation.amount) * 100
                if (operationPercentage < buyDividendRatio) {
                    operations[i].type = OperationType.DIVIDEND
                } else {
                    operations[i].type = OperationType.SELL
                }
            } else {
                operations[i].type = OperationType.BUY
            }
        }

        return operations
    }
}