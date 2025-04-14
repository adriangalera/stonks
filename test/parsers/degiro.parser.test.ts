import { describe, it, expect } from "vitest";
import { readFileSync } from 'fs';
import { join } from 'path';
import { OperationType, parseCsvForClosedOperations } from "../../src/parsers/parser"
import { DegiroParser } from "../../src/parsers/degiro.parser";

describe('Degiro parser', () => {

    const deGiroClosedPositions = [
        "BAXTER INTERNATIONAL",
        "GARMIN LTD",
        "HASBRO INC",
        "NIKE INC 'B'",
        "WESTROCK CO",
        "IRLAND 09-25"
    ]

    it("should return exactly closed positions for degiro", async () => {
        const filePath = join(__dirname, 'degiro.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)
        expect(new Set(closedOperationsByConcept.keys())).toStrictEqual(new Set(deGiroClosedPositions))
    })
    
    it("should determine the type of operations", async () => {
        const filePath = join(__dirname, 'degiro.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)

        for (let ops of closedOperationsByConcept.values()) {
            const types = DegiroParser.setOperationType(ops).map((op) => op.type)
            expect(types).not.contain(OperationType.UNKNOWN)
        }
    })
});