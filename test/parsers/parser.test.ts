import { describe, it, expect } from "vitest";
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseCsvForClosedOperations } from "../../src/parsers/parser"

describe('Parser', () => {

    const deGiroClosedPositions = [
        "BAXTER INTERNATIONAL",
        "GARMIN LTD",
        "HASBRO INC",
        "NIKE INC 'B'",
        "WESTROCK CO",
        "IRLAND 09-25"
    ]

    it("should apply default date filter", async () => {
        const filePath = join(__dirname, 'degiro.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)
        expect(new Set(closedOperationsByConcept.keys())).toStrictEqual(new Set(deGiroClosedPositions))
    })

    it("should apply date filter and do not fit any closed operation", async () => {
        const startDate = new Date("2023-07-02")
        const endDate = new Date("2023-07-31")
        const filePath = join(__dirname, 'degiro.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content, startDate, endDate)
        expect(new Set(closedOperationsByConcept.keys())).toStrictEqual(new Set())
    })
    it("should apply date filter and fit some closed operation", async () => {
        const startDate = new Date("2023-07-02")
        const endDate = new Date("2023-10-31")
        const filePath = join(__dirname, 'degiro.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content, startDate, endDate)
        expect(new Set(closedOperationsByConcept.keys())).toStrictEqual(new Set(["HASBRO INC"]))
    })

});