<script lang="ts">
    import { onMount } from "svelte";
    import { summary } from "../stores";
    import Chart, { type ChartOptions, type ChartType } from "chart.js/auto";
    import type { ClosedOperationSummary } from "../summarizer";

    let canvas: any;
    let chart: any;

    type ChartData = {
        values: string[];
        dates: string[];
        colors: string[];
    };

    const toChartData = (ops: ClosedOperationSummary[]): ChartData => {
        const labels = ops.map((op) => op.concept) || [];
        const profits = ops.map((op) => op.profit) || [];
        const colors = profits.map((p) =>
            parseFloat(p) >= 0
                ? "rgba(75, 192, 192, 0.6)"
                : "rgba(255, 99, 132, 0.6)",
        );

        return {
            values: profits,
            dates: labels,
            colors: colors,
        };
    };

    const newData = toChartData($summary?.closedOperations || []);

    const data = {
        labels: newData.dates,
        datasets: [
            {
                label: "Profit (€)",
                data: newData.values,
                backgroundColor: newData.colors,
            },
        ],
    };
    const options: ChartOptions = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        /*
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: { beginAtZero: true },
        },
        */
    };
    const type: ChartType = "bar";

    onMount(() => {
        chart = new Chart(canvas, {
            type,
            data,
            options,
        });

        return () => {
            chart.destroy();
        };
    });

    $: {
        const newData = toChartData($summary?.closedOperations || []);
        if (chart) {
            chart.data.labels = newData.dates;
            chart.data.datasets[0].data = newData.values;
            chart.data.datasets[0].backgroundColor = newData.colors;
            chart.update();
        }
    }
</script>

<canvas class="w-full h-auto" bind:this={canvas}></canvas>
