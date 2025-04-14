import { writable } from 'svelte/store';
import type { Summary } from './summarizer';
import type { OpenOperation } from './parsers/openOperations.parser';

export const startDate = writable<Date | null>(null);
export const endDate = writable<Date | null>(null);
export const parsedData = writable<string>("");
export const parsedDataForOpenOperations = writable<string>("");
export const openOperations = writable<OpenOperation[]>([]);
export const summary = writable<Summary | null>(null);