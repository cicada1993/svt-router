<script>
    import { back, push } from "@/SvtRouter";
    let goBack = (evt) => {
        back();
    };
    let jump = (evt) => {
        push({ data: { from: "/detail" }, title: "", path: "/list/2" });
    };
</script>

<p>this is detail page</p>
<p on:click={goBack}>back to pre page!</p>
<p on:click={jump}>go to list page</p>
