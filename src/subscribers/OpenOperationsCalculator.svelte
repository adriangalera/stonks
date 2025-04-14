<script lang="ts">
    import { parsedDataForOpenOperations, openOperations } from "../stores";

    $: {
        if ($parsedDataForOpenOperations) {
            console.log(`Parsed open operations ...`);
            //TODO: Parse the CSV text into an array of OpenOperations type
            //TODO: Retrieve all tickers to later call yahoo finance API
            //TODO: Rettrieve all currencies to later call the money exchange rates service
            
            openOperations.set([])
        }
    }
</script>
