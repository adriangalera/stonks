<script lang="ts">
    import { parsedData } from "../stores";
    let fileInput: HTMLInputElement;

    function handleClick() {
        fileInput.click();
    }

    function handleFileChange(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const csvText = reader.result as string;
                parsedData.set(csvText);
            };

            reader.readAsText(file);
        }
    }
</script>

<div class="flex flex-col sm:flex-row sm:items-end">
    <button
        on:click={handleClick}
        class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >Upload CSV</button
    >
    <input
        type="file"
        accept=".csv"
        bind:this={fileInput}
        on:change={handleFileChange}
        style="display: none;"
    />
</div>
