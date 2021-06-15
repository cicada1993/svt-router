<script>
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
    import { back, replace } from "@/SvtRouter";
    let goBack = (evt) => {
        back();
    };
    let rpPage = (evt) => {
        replace({ data: { from: "/home" }, title: "", path: "/detail" });
    };
    onMount(() => {
        console.log("home page", "onMount");
    });

    beforeUpdate(() => {
        console.log("home page", "beforeUpdate");
    });

    afterUpdate(() => {
        console.log("home page", "afterUpdate");
    });

    onDestroy(() => {
        console.log("home page", "onDestroy");
    });
</script>

<p>
    this is home page,current route params is:{JSON.stringify(
        $$props.params || {}
    )}
</p>
<p on:click={goBack}>back to pre page</p>
<p on:click={rpPage}>replace to detail page</p>
