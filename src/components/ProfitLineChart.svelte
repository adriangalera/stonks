<script lang="ts">
    import { onMount } from "svelte";
    import { summary } from "../stores";
    import Chart, { type ChartOptions, type ChartType } from "chart.js/auto";
    import type { ClosedOperationSummary } from "../summarizer";

    let canvas: any;
    let chart: any;

    type ChartData = {
        values: number[];
        dates: string[];
    };

    const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: "Date" } },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Accumulated Profit (€)" },
            },
        },
    };
    const type: ChartType = "line";

    const chartData = (
        closedOperations: ClosedOperationSummary[],
    ): ChartData => {
        closedOperations.sort(
            (a, b) => a.sellDate.getTime() - b.sellDate.getTime(),
        );

        const dates: string[] = closedOperations.map(
            (op) => new Date(op.sellDate).toISOString().split("T")[0],
        );

        const cumValues: number[] = [];
        let runningProfit = 0;
        closedOperations.forEach((op) => {
            runningProfit += parseFloat(op.profit);
            cumValues.push(runningProfit);
        });

        return {
            values: cumValues,
            dates: dates,
        };
    };

    const newData = chartData($summary?.closedOperations || []);

    let data = {
        labels: newData.dates,
        datasets: [
            {
                label: "Accumulated Profit (€)",
                data: newData.values,
                fill: true,
                borderColor: "rgba(54, 162, 235, 1)",
                tension: 0.1,
            },
        ],
    };

    $: {
        const newData = chartData($summary?.closedOperations || []);
        if (chart) {
            chart.data.labels = newData.dates;
            chart.data.datasets[0].data = newData.values;
            chart.update();
        }
    }

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
</script>

<canvas class="w-full h-auto" bind:this={canvas}></canvas>
