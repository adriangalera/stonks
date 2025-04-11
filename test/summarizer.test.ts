import { describe, it, expect } from "vitest";
import { OperationType, type ParsedOperation } from "../src/parsers/parser";
import { summarize, type ClosedOperationSummary } from "../src/summarizer";

describe('Summarizer', () => {

    it("should summarize operations", async () => {
        let map: Map<string, ParsedOperation[]> = new Map<string, ParsedOperation[]>();
        map.set("TRANSDIGM", [
            {
                date: new Date("2025-02-03T23:00:00.000Z"),
                concept: "TRANSDIGM GROUP INC @ 1",
                amount: -1279.81,
                currency: "EUR",
                type: OperationType.BUY
            },
            {
                date: new Date("2025-03-03T23:00:00.000Z"),
                concept: "TRANSDIGM GROUP INC @ 1",
                amount: 1,
                currency: "EUR",
                type: OperationType.DIVIDEND
            },
            {
                date: new Date("2025-04-03T22:00:00.000Z"),
                concept: "TRANSDIGM GROUP INC @ 1",
                amount: 1127.03,
                currency: "EUR",
                type: OperationType.SELL
            }
        ])
        map.set("SKYWORKS",
            [
                {
                    date: new Date("2025-02-03T23:00:00.000Z"),
                    concept: "SKYWORKS SOLUTIONS INC @ 4",
                    amount: -336.91,
                    currency: "EUR",
                    type: OperationType.BUY
                },
                {
                    date: new Date("2025-02-05T23:00:00.000Z"),
                    concept: "SKYWORKS SOLUTIONS INC @ 4",
                    amount: 246.08,
                    currency: "EUR",
                    type: OperationType.SELL
                }
            ]
        )

        const summary = summarize(map)
        expect(summary.closedOperations[0]).toStrictEqual({
            concept: "TRANSDIGM GROUP INC @ 1",
            buyPrice: "1279.81",
            sellPrice: "1127.03",
            profit: "-151.78",
            sellDate: new Date("2025-04-03T22:00:00.000Z"),
        } as ClosedOperationSummary)
        expect(summary.closedOperations[1]).toStrictEqual({
            concept: "SKYWORKS SOLUTIONS INC @ 4",
            buyPrice: "336.91",
            sellPrice: "246.08",
            profit: "-90.83",
            sellDate: new Date("2025-02-05T23:00:00.000Z"),
        } as ClosedOperationSummary)
        expect(summary.totalProfit).toBe("-242.61")
    })
})