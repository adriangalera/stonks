<script lang="ts">
    import { parseCsvForClosedOperations } from "../parsers/parser";
    import { parsedData, summary, startDate, endDate } from "../stores";
    import { summarize } from "../summarizer";

    $: {
        if ($parsedData) {
            const closedOperations = parseCsvForClosedOperations(
                $parsedData,
                $startDate,
                $endDate,
            );
            const summarizedData = summarize(closedOperations);
            summary.set(summarizedData);
        }
    }
</script>
