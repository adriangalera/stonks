export enum ParseOperationType {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
}

export type OpenOperation = {
    ticker: string,
    buyPrice: number,
    amount: number,
    currency: string,
    currentPrice: number
}