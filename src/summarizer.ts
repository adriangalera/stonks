import { OperationType, type ParsedOperation } from "./parsers/parser";

export type ClosedOperationSummary = {
    concept: string,
    buyPrice: string,
    sellPrice: string,
    profit: string,
    sellDate: Date,
}

export type Summary = {
    closedOperations: ClosedOperationSummary[],
    totalProfit: string
}

export const summarize = (data: Map<string, ParsedOperation[]>): Summary => {
    let operations: ClosedOperationSummary[] = []
    let totalProfit: number = 0

    for (let ops of data.values()) {
        const operationProfit = ops.reduce((sum, item) => sum + item.amount, 0);
        const buyOperation = ops.find(op => op.type === OperationType.BUY);
        const sellOperation = ops.find(op => op.type === OperationType.SELL);

        const buyPrice = -1 * (buyOperation?.amount || 0)

        const opSummary: ClosedOperationSummary = {
            concept: ops[0].concept,
            buyPrice: buyPrice.toFixed(2),
            sellPrice: sellOperation?.amount.toFixed(2) || "",
            profit: operationProfit.toFixed(2) || "",
            sellDate: sellOperation?.date || new Date(0)
        }
        operations.push(opSummary)
        totalProfit += operationProfit
    }

    return {
        closedOperations: operations,
        totalProfit: totalProfit.toFixed(2)
    }
}