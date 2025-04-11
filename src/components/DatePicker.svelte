<script>
    import { startDate, endDate } from "../stores";
</script>

<div>
    <label>
        Start Date:
        <input type="date" bind:value={$startDate} data-testid="start-date"/>
    </label>

    <label>
        End Date:
        <input type="date" bind:value={$endDate} data-testid="end-date"/>
    </label>
</div>
