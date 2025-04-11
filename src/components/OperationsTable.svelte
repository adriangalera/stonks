<script lang="ts">
    import { summary } from "../stores";
    import type { ClosedOperationSummary } from "../summarizer";
    let sortedOperations : ClosedOperationSummary[];
    $: {
        sortedOperations = $summary?.closedOperations || [];
        sortedOperations.sort(
            (a, b) => a.sellDate.getTime() - b.sellDate.getTime(),
        );
    }
</script>

{#if $summary != null}
    <table>
        <thead>
            <tr>
                <th>Concept</th>
                <th>Buy Price (€)</th>
                <th>Sell Price (€)</th>
                <th>Profit (€)</th>
            </tr>
        </thead>
        <tbody>
            {#each sortedOperations as op}
                <tr>
                    <td>{op.concept}</td>
                    <td>{op.buyPrice}</td>
                    <td>{op.sellPrice}</td>
                    <td
                        style="color: ${parseFloat(op.profit) >= 0
                            ? 'green'
                            : 'red'}"
                    >
                        {op.profit}
                    </td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Total Profit</td>
                <td
                    style="color: {parseFloat($summary.totalProfit) >= 0
                        ? 'green'
                        : 'red'}"
                >
                    {$summary.totalProfit}
                </td>
            </tr>
        </tfoot>
    </table>
{:else}
    <p>No data yet</p>
{/if}
