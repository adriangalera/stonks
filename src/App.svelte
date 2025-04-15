<script>
    import DatePicker from "./components/DatePicker.svelte";
    import OperationsTable from "./components/OperationsTable.svelte";
    import HorizontalBarChart from "./components/HorizontalBarChart.svelte";
    import ProfitLineChart from "./components/ProfitLineChart.svelte";
    import Summarizer from "./components/Summarizer.svelte";
    import ClosedOperationsCsvUpload from "./components/ClosedOperationsCsvUpload.svelte";
</script>

<!-- Header -->
<header class="p-4 bg-white shadow flex-none">
    <div
        class="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end gap-4"
    >
        <h1 class="text-5xl font-extrabold">Stonks</h1>
        <DatePicker></DatePicker>
    </div>
</header>

<main class="flex-grow p-4 overflow-hidden">
    <div
        class="h-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 grid-rows-[1fr_1fr] gap-6"
    >
        <!-- Operations table -->
        <div
            class="bg-white shadow rounded p-4 h-full flex flex-col min-h-0 lg:col-span-2"
        >
            <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-semibold">Closed operations</h2>
                <div class="flex items-center gap-2">
                    <!-- Info button with popup -->
                    <details class="relative z-100">
                        <summary
                            class="list-none cursor-pointer text-gray-400 hover:text-gray-600 flex items-center justify-center w-5 h-5 rounded-full border border-gray-400 text-xs"
                        >
                            i
                        </summary>
                        <div
                            class="absolute left-0 mt-2 w-64 text-sm text-gray-700 bg-white border border-gray-200 rounded shadow-md p-3 z-10"
                        >
                            Upload a CSV file with closed operations.<br />
                            Supported brokers: <br />
                            <ul>
                                <li>
                                    <a
                                        target="_blank"
                                        class="text-blue-600 underline"
                                        href="https://myinvestor.es/"
                                        >myinvestor.es</a
                                    >
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        class="text-blue-600 underline"
                                        href="https://www.degiro.es"
                                        >degiro.es</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </details>
                    <ClosedOperationsCsvUpload></ClosedOperationsCsvUpload>
                </div>
            </div>
            <OperationsTable></OperationsTable>
        </div>

        <!-- (3) Bottom-left: Chart -->
        <div class="bg-white shadow rounded p-4 h-full flex flex-col min-h-0">
            <h2 class="text-lg font-semibold mb-2">Profit over time</h2>
            <div class="flex-grow overflow-hidden">
                <ProfitLineChart></ProfitLineChart>
            </div>
        </div>

        <!-- (4) Bottom-right: Chart -->
        <div class="bg-white shadow rounded p-4 h-full flex flex-col min-h-0">
            <h2 class="text-lg font-semibold mb-2">Profit by operation</h2>
            <div class="flex-grow overflow-hidden">
                <HorizontalBarChart></HorizontalBarChart>
            </div>
        </div>

        <!-- 
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
    </div> -->

        <Summarizer></Summarizer>
    </div>
</main>
