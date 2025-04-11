<script>
    import { startDate, endDate } from "../stores";
</script>

<label class="flex flex-col text-sm font-medium">
    Start Date:
    <input
        type="date"
        bind:value={$startDate}
        data-testid="start-date"
        class="mt-1 border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</label>

<label class="flex flex-col text-sm font-medium">
    End Date:
    <input
        type="date"
        bind:value={$endDate}
        data-testid="end-date"
        class="mt-1 border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</label>
