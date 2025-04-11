<script>
    import DatePicker from "./components/DatePicker.svelte";
    import OperationsTable from "./components/OperationsTable.svelte";
    import HorizontalBarChart from "./components/HorizontalBarChart.svelte";
    import ProfitLineChart from "./components/ProfitLineChart.svelte";
    import UploadCsv from "./components/UploadCsv.svelte";
    import Summarizer from "./components/Summarizer.svelte";
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">
        Stock Operations Summary
    </h1>

    <div class="mb-6 flex flex-col sm:flex-row sm:items-end gap-4">
        <DatePicker></DatePicker>
        <UploadCsv></UploadCsv>
    </div>

    <div class="space-y-8">
        <OperationsTable></OperationsTable>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white shadow rounded p-4">
            <ProfitLineChart></ProfitLineChart>
        </div>
        <div class="bg-white shadow rounded p-4">
            <HorizontalBarChart></HorizontalBarChart>
        </div>
    </div>

    <Summarizer></Summarizer>
</main>
