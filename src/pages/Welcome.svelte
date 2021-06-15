<script>
    import { push } from "@/SvtRouter";
    let words = "hello,svelte!";
    let fontSize = 18;
    let jump = (evt) => {
        //push({ title: "", path: "/home", data: { from: "/welcome" } });
        //push({ path: "#/home"});
        push({path:"#/home?name=aaa"})
    };
</script>

<p class="welcome-page" style="font-size:{fontSize}px">
    {words}
</p>
<p on:click={jump}>go to home page</p>

<style>
    .welcome-page {
        color: red;
    }
</style>
