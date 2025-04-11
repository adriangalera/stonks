import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import SummaryTable from '../../src/components/OperationsTable.svelte';
import type { Summary } from '../../src/summarizer';

vi.mock('../../src/stores', async () => {
  // placeholder store — override it in each test
  return {
    summary: writable<Summary | null>(null)
  };
});

describe('SummaryTable', () => {
  it('shows fallback message when summary is null', () => {
    const { getByText } = render(SummaryTable);
    expect(getByText('No data yet')).toBeInTheDocument();
  });

  it('renders the summary table with data', async () => {
    const { summary } = await import('../../src/stores');
    summary.set({
      closedOperations: [
        { concept: 'Apple', buyPrice: "100.00", sellPrice: "150.00", profit: "50.00", sellDate: new Date() },
        { concept: 'Tesla', buyPrice: "200.00", sellPrice: "180.00", profit: "-20.00", sellDate: new Date() }
      ],
      totalProfit: "30.00"
    });

    const { getByText } = render(SummaryTable);

    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Tesla')).toBeInTheDocument();
    expect(getByText('100.00')).toBeInTheDocument(); // Buy price
    expect(getByText('150.00')).toBeInTheDocument(); // Sell price
    expect(getByText('50.00')).toBeInTheDocument();  // Profit
    expect(getByText('30.00')).toBeInTheDocument();  // Total profit
  });
});
