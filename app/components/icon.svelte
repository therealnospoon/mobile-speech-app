<image
    class="icon {customClass}"
    data-size="{size}"
    data-scale="{scale}"
    src="{path}"
/>

<script>
    export let path;
    export let customClass = "";
    export let size = "";
    export let scale = ""; // Using this property scales up or scales down icon size by 5% depending on which value used ('up' or 'down');
</script>