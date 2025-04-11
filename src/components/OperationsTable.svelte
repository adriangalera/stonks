<script lang="ts">
    import { summary } from "../stores";
    import type { ClosedOperationSummary } from "../summarizer";
    let sortedOperations: ClosedOperationSummary[];
    $: {
        sortedOperations = $summary?.closedOperations || [];
        sortedOperations.sort(
            (a, b) => a.sellDate.getTime() - b.sellDate.getTime(),
        );
    }
</script>

{#if $summary != null}
    <div class="overflow-auto max-h-80 lg:max-h-[40vh]">
        <table class="w-full border-collapse table-auto text-sm min-w-[600px]">
            <thead class="bg-gray-100 sticky top-0 z-10">
                <tr>
                    <th class="p-2 font-semibold">Concept</th>
                    <th class="p-2 font-semibold">Buy Price (€)</th>
                    <th class="p-2 font-semibold">Sell Price (€)</th>
                    <th class="p-2 font-semibold">Profit (€)</th>
                </tr>
            </thead>
            <tbody>
                {#each sortedOperations as op}
                    <tr class="border-t">
                        <td class="p-2">{op.concept}</td>
                        <td class="p-2">{op.buyPrice}</td>
                        <td class="p-2">{op.sellPrice}</td>
                        <td
                            class="p2 {parseFloat(op.profit) >= 0
                                ? 'text-green-600'
                                : 'text-red-600'}"
                        >
                            {op.profit}
                        </td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr class="border-t font-semibold">
                    <td class="p-2" colspan="3">Total Profit</td>
                    <td
                        class="p2 {parseFloat($summary.totalProfit) >= 0
                            ? 'text-green-600'
                            : 'text-red-600'}"
                    >
                        {$summary.totalProfit}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
{:else}
    <p>No data yet</p>
{/if}
