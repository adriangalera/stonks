<script>
    import DatePicker from "./components/DatePicker.svelte";
    import OperationsTable from "./components/OperationsTable.svelte";
    import HorizontalBarChart from "./components/HorizontalBarChart.svelte";
    import ProfitLineChart from "./components/ProfitLineChart.svelte";
    import UploadCsv from "./components/UploadCsv.svelte";
    import Summarizer from "./components/Summarizer.svelte";
</script>

<main>
    <h1>Stock Operations Summary</h1>
    <div id="filters"><DatePicker></DatePicker></div>
    <UploadCsv></UploadCsv>
    <div class="grid-layout">
        <div class="grid-item top-left"></div>
        <div class="grid-item top-right">
            <OperationsTable></OperationsTable>
        </div>
        <div class="grid-item bottom-left">
            <ProfitLineChart></ProfitLineChart>
        </div>
        <div class="grid-item bottom-right">
            <HorizontalBarChart></HorizontalBarChart>
        </div>
    </div>
    <Summarizer></Summarizer>
</main>
