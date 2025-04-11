import type { Parser, ParsedOperation } from "./parser"
import { OperationType } from "./parser";

const buyDividendRatio: number = 6

export const DegiroParser: Parser = {
    parseOperation(data: any): ParsedOperation {
        return {
            date: this.parseDate(data[2]),
            concept: data[3],
            amount: this.parseAmount(data[8]),
            currency: data[7],
            type: OperationType.UNKNOWN
        }
    },
    parseDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day); // month is 0-based
    },
    parseAmount(amountStr: string): number {
        return parseFloat(amountStr);
    },
    postProcess(data: ParsedOperation[]): ParsedOperation[] {
        return data
            .filter(data => data.concept && data.concept.length > 0)
            .filter(data => data.currency === "EUR")
            .filter(data => data.concept !== "FLATEX EURO BANKACCOUNT")
            .filter(data => data.amount !== 0)
    },
    setOperationType(operations: ParsedOperation[]): ParsedOperation[] {
        operations.sort((a, b) => a.date.getTime() - b.date.getTime())
        // buy price will the minimum of all numbers
        const minIndex = operations.reduce((minIdx, item, idx, arr) => item.amount < arr[minIdx].amount ? idx : minIdx, 0);
        const buyPrice = operations[minIndex].amount

        for (let i = 0; i < operations.length; i++) {
            if (operations[i].amount == buyPrice) {
                operations[i].type = OperationType.BUY
            } else {
                if (operations[i].amount < 0) {
                    operations[i].type = OperationType.COST
                }
                if (operations[i].amount > 0) {
                    let operationPercentage = Math.abs(operations[i].amount / buyPrice) * 100
                    if (operationPercentage < buyDividendRatio) {
                        operations[i].type = OperationType.DIVIDEND
                    } else {
                        operations[i].type = OperationType.SELL
                    }
                }
            }
        }
        return operations
    }
}