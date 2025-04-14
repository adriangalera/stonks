<script lang="ts">
    import { parsedData } from "../stores";
    let dragging = false;
    let input: HTMLElement;

    const handleFile = async (file: any) => {
        if (file && isCSV(file)) {
            const text = await file.text();
            parsedData.set(text);
        }
    };

    function handleDrop(event: any) {
        event.preventDefault();
        dragging = false;
        const file = event.dataTransfer?.files?.[0];
        handleFile(file);
    }

    function handleDragOver(event: any) {
        event.preventDefault();
        dragging = true;
    }

    function handleDragLeave(event: any) {
        event.preventDefault();
        dragging = false;
    }

    function handleChange(event: any) {
        const file = event.target.files?.[0];
        handleFile(file);
    }

    function triggerInput() {
        input.click();
    }

    function isCSV(file: any) {
        return (
            file.name.toLowerCase().endsWith(".csv") || file.type === "text/csv"
        );
    }
</script>

<button
    type="button"
    class="border-1 border-dashed border-gray-200 rounded-xl p-3 text-center transition-colors duration-300 cursor-pointer hover:bg-gray-100"
    class:bg-blue-50={dragging}
    on:click={triggerInput}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
>
    <p class="text-gray-500 text-sm">
        {dragging
            ? "Drop files here..."
            : "Drag and drop files here or click to upload"}
    </p>
    <input
        type="file"
        multiple
        accept=".csv,text/csv"
        class="hidden"
        bind:this={input}
        on:change={handleChange}
    />
</button>
