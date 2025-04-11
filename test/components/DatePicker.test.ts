import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, beforeEach } from 'vitest';
import DatePicker from '../../src/components/DatePicker.svelte';
import { startDate, endDate } from '../../src/stores';

describe('DateFilter', () => {
  beforeEach(() => {
    startDate.set(null);
    endDate.set(null);
  });

  it('should update the startDate store when the input changes', async () => {
    const { getByTestId } = render(DatePicker);

    const startInput = getByTestId('start-date');
    await fireEvent.input(startInput, { target: { value: '2023-01-01' } });

    let value;
    startDate.subscribe(v => value = v)();
    expect(value).toBe('2023-01-01');
  });

  it('should update the endDate store when the input changes', async () => {
    const { getByTestId } = render(DatePicker);

    const endInput = getByTestId('end-date');
    await fireEvent.input(endInput, { target: { value: '2023-12-31' } });

    let value;
    endDate.subscribe(v => value = v)();
    expect(value).toBe('2023-12-31');
  });
});
