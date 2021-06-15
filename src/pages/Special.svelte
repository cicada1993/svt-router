<script>
    import { push } from "@/SvtRouter";
    let jump = (evt) => {
        push({ title: "", path: "/home", data: { from: "/special" } });
    };
</script>

<p>this is a page with special route path</p>
<p on:click={jump}>go to home page</p>
