import { render } from '@testing-library/svelte';
import { vi, describe, it, expect } from 'vitest';
import { summary } from '../../src/stores';
import ProfitLineChart from '../../src/components/ProfitLineChart.svelte';
import Chart from 'chart.js/auto';

vi.mock('chart.js/auto', async () => {
    const actual: any = await vi.importActual('chart.js/auto');
    return {
        ...actual,
        default: vi.fn().mockImplementation(() => ({
            destroy: vi.fn(),
            update: vi.fn(),
            data: {
                datasets: [
                    { data: [] }
                ]
            },
            options: {},
        })),
    };
});

describe('AccumulatedProfitChart', () => {
    it('renders a line chart with accumulated profit', () => {
        // Arrange: set up mock data in the store
        summary.set({
            closedOperations: [
                {
                    concept: 'AAPL',
                    sellDate: new Date('2024-01-01'),
                    profit: "100",
                    buyPrice: "0",
                    sellPrice: "0"
                },
                {
                    concept: 'TSLA',
                    sellDate: new Date('2024-02-01'),
                    profit: "-50",
                    buyPrice: "0",
                    sellPrice: "0"
                },
                {
                    concept: 'MSFT',
                    sellDate: new Date('2024-03-01'),
                    profit: "200",
                    buyPrice: "0",
                    sellPrice: "0"
                },
            ],
            totalProfit: "0"
        });

        // Act: render the component
        const { container } = render(ProfitLineChart);

        // Assert: canvas is in the document
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeTruthy();

        // Assert: Chart was created with accumulated values
        expect(Chart).toHaveBeenCalledWith(expect.anything(), {
            type: 'line',
            data: expect.objectContaining({
                labels: ['2024-01-01', '2024-02-01', '2024-03-01'],
                datasets: [
                    expect.objectContaining({
                        label: 'Accumulated Profit (€)',
                        data: [100, 50, 250],
                    }),
                ],
            }),
            options: expect.anything(),
        });
    });
});
