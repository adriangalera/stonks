import { describe, it, expect } from "vitest";
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseOpenOperations, type OpenOperation } from "../../src/parsers/openOperations.parser";

describe('Open operations parser', () => {

    const openOperations: OpenOperation[] = [
        {
            ticker: "INTC",
            buyPrice: 33.6,
            amount: 6,
            currency: "USD",
            currentPrice: undefined,
            profit: undefined
        },
        {
            ticker: "ARM",
            buyPrice: 185.18,
            amount: 1,
            currency: "USD",
            currentPrice: undefined,
            profit: undefined
        },
    ]

    it("should parse open operations", () => {
        const filePath = join(__dirname, 'open-operations.csv');
        const content = readFileSync(filePath, 'utf-8');
        let parsedOpenOperations = parseOpenOperations(content)
        expect(parsedOpenOperations).toStrictEqual(openOperations)
    })
});