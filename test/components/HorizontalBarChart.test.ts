import { render } from '@testing-library/svelte';
import HorizontalBarChart from '../../src/components/HorizontalBarChart.svelte';
import { summary } from '../../src/stores';
import { vi, describe, it, expect } from 'vitest';
import Chart from 'chart.js/auto';

vi.mock('chart.js/auto', async () => {
    const actual: any = await vi.importActual('chart.js/auto');
    return {
        ...actual,
        default: vi.fn().mockImplementation(() => ({
            destroy: vi.fn(),
            update: vi.fn(),
            data: {
                labels: [],
                datasets: [
                    { data: [], backgroundColor: [] }
                ]
            },
            options: {},
        })),
    };
});

describe('HorizontalBarChart', () => {
    it('renders the chart and passes data', async () => {
        // Arrange: mock summary store
        summary.set({
            closedOperations: [
                { concept: 'AAPL', profit: "100", buyPrice: "0", sellPrice: "0", sellDate: new Date() },
                { concept: 'TSLA', profit: "-50", buyPrice: "0", sellPrice: "0", sellDate: new Date() },
            ],
            totalProfit: "0"
        });

        // Act
        const { container } = render(HorizontalBarChart);

        // Assert: chart was created and canvas is rendered
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeTruthy();

        // Optionally assert Chart was called with expected data
        expect(Chart).toHaveBeenCalledWith(expect.anything(), {
            type: 'bar',
            data: expect.objectContaining({
                labels: ['AAPL', 'TSLA'],
                datasets: [
                    expect.objectContaining({
                        data: ["100", "-50"],
                    }),
                ],
            }),
            options: expect.anything()
        });
    });
});
