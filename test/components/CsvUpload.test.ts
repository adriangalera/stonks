import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FileUploader from '../../src/components/CsvUpload.svelte';
import { parsedData, parsedDataForOpenOperations } from '../../src/stores';
import { ParseOperationType } from '../../src/parsers/openOperations.parser';

vi.mock('../../src/stores', () => {
    return {
        parsedData: {
            set: vi.fn()
        },
        parsedDataForOpenOperations: {
            set: vi.fn()
        }
    };
});

if (!File.prototype.text) {
    File.prototype.text = function () {
        // @ts-ignore
        return Promise.resolve(this._mockText || '');
    };
}

describe('FileUploader component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });


    it('handles file input change with a CSV file', async () => {
        const { container } = render(FileUploader, { props: { parseOperationType: ParseOperationType.CLOSED } })

        const fileContent = 'a,b,c\n1,2,3'
        const file = new File([fileContent], 'data.csv', { type: 'text/csv' });
        (file as any)._mockText = fileContent;
        const input = container.querySelector('input[type="file"]') as HTMLInputElement;

        // Manually fire the change event
        await fireEvent.change(input, {
            target: { files: [file] }
        });

        await waitFor(() => {
            expect(parsedData.set).toHaveBeenCalledWith('a,b,c\n1,2,3');
        });
    });

    it('handles drag and drop with a CSV file', async () => {
        const { getByRole } = render(FileUploader, { props: { parseOperationType: ParseOperationType.CLOSED } })

        const fileContent = 'x,y\n4,5'
        const file = new File([fileContent], 'data.csv', { type: 'text/csv' });
        (file as any)._mockText = fileContent;
        const dropzone = getByRole('button');

        await fireEvent.dragOver(dropzone);
        await fireEvent.drop(dropzone, {
            dataTransfer: {
                files: [file],
                types: ['Files']
            }
        });

        await waitFor(() => {
            expect(parsedData.set).toHaveBeenCalledWith('x,y\n4,5');
        });
    });

    it('handles drag and drop with a CSV file and set it on parsedDataForOpenOperations', async () => {
        const { getByRole } = render(FileUploader, { props: { parseOperationType: ParseOperationType.OPEN } })

        const fileContent = 'x,y\n4,5'
        const file = new File([fileContent], 'data.csv', { type: 'text/csv' });
        (file as any)._mockText = fileContent;
        const dropzone = getByRole('button');

        await fireEvent.dragOver(dropzone);
        await fireEvent.drop(dropzone, {
            dataTransfer: {
                files: [file],
                types: ['Files']
            }
        });

        await waitFor(() => {
            expect(parsedDataForOpenOperations.set).toHaveBeenCalledWith('x,y\n4,5');
        });
    });

    it('ignores non-CSV files', async () => {
        const { container } = render(FileUploader);

        const fileContent = 'no csv content'
        const file = new File([fileContent], 'data.png', { type: 'image/png' });
        (file as any)._mockText = fileContent;
        (file as any)._name = "data.png"
        const input = container.querySelector('input[type="file"]') as HTMLInputElement;

        await fireEvent.change(input, {
            target: { files: [file] }
        });

        await waitFor(() => {
            expect(parsedData.set).not.toHaveBeenCalled();
        });
    });
});
