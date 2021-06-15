<script>
    import { back } from "@/SvtRouter";
    let goBack = (evt) => {
        back();
    };
</script>

<p>this is list page</p>
<p on:click={goBack}>press to back</p>
