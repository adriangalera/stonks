import { describe, it, expect } from "vitest";
import { readFileSync } from 'fs';
import { join } from 'path';
import { OperationType, parseCsvForClosedOperations } from "../../src/parsers/parser"
import type { ParsedOperation } from "../../src/parsers/parser"
import { MyInvestorParser } from "../../src/parsers/myinvestor.parser";

describe('Myinvestor parser', () => {

    const openedPositions = ["IBM @ 1", "ENTERGY CORP @ 3", "INTEL CORPORATION @ 6", "ARM HOLDINGS PLC @ 1"]
    const closedPositions = [
        "SEAGATE TECHNOLOGY HOLDINGS @", "ENPHASE ENERGY @ 1", "APPLE COMPUTER @ 1", "PINNACLE WEST CAPITAL @ 2", "WESTERN DIGITAL @ 4",
        "TAIWAN SEMI. ADR @ 2", "TRACTOR SUPPLY COMPANY @ 1", "ALPHABET INC CL A @ 1", "ADVANCED MICRO DEVICES @ 1", "STANLEY BLACK DECKER @ 3",
        "MASCO CORPORATION @ 3", "CROWDSTRIKE HOLDINGS INC - A @", "SEAGATE TECHNOLOGY HOLDINGS @", "SYNOPSYS INC @ 1", "CONOCOPHILLIPS @ 4",
        "ELECTRONIC ARTS @ 3", "SHERWINS WILLIAMS @ 1", "PEPSICO INC @ 2", "CONSTEL A @ 2", "DECKERS OUTDOOR CORP @ 2", "FORTIVE CORP W I @ 3",
        "MASTERCARD INC @ 1", "MERCK CO INC NEW @ 5", "NATERA INC @ 4", "NVIDIA CP @ 2", "SKYWORKS SOLUTIONS INC @ 4", "SUPER MICRO COMPUTER INC @ 10",
        "SYSCO @ 4", "TAIWAN SEMI. ADR @ 3", "TEXTRON INC @ 5", "TRANSDIGM GROUP INC @ 1",
    ]

    it("should not return opened positions for myinvestor", async () => {
        const filePath = join(__dirname, 'myinvestor.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)

        for (const key of openedPositions) {
            expect(closedOperationsByConcept.has(key), `Key "${key}" should NOT be in the map`).toBe(false);
        }
    })
    it("should return exactly closed positions for myinvestor", async () => {
        const filePath = join(__dirname, 'myinvestor.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)
        expect(new Set(closedOperationsByConcept.keys())).toStrictEqual(new Set(closedPositions))
    })
    it("should determine each type of operations", async () => {
        const filePath = join(__dirname, 'myinvestor.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)

        for (let ops of closedOperationsByConcept.values()) {
            const types = MyInvestorParser.setOperationType(ops).map((op) => op.type)
            expect(types).not.contain(OperationType.UNKNOWN)
        }
    })
    it("should detect types on complex operations", async () => {
        const filePath = join(__dirname, 'myinvestor.test.csv');
        const content = readFileSync(filePath, 'utf-8');
        const closedOperationsByConcept = await parseCsvForClosedOperations(content)

        let operationList: ParsedOperation[][] = []
        for (let ops of closedOperationsByConcept.values()) {
            operationList.push(ops)
        }
        const operations = operationList[12]
        const operationsWithTypes = MyInvestorParser.setOperationType(operations)
        const expectedTypes: OperationType[] = [OperationType.BUY, OperationType.SELL, OperationType.DIVIDEND]
        const types = operationsWithTypes.map((op) => op.type)
        expect(expectedTypes).toStrictEqual(types)
    })
});