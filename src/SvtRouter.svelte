<script context="module">
    console.log("svt router init");
    import { writable } from "svelte/store";
    import { match } from "path-to-regexp";
    import { SvelteComponent, tick } from "svelte/internal";
    import qs from "qs";
    let routes = [];
    let routeStack = [];

    let curRoute = null;

    export function init(cfgs) {
        routes = cfgs;
        let curHash = window.location.hash;
        // params from location.search
        let searchQuery = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });
        dealHash(curHash, searchQuery);
    }

    export function push({ data, title, path }) {
        console.log("push route");
        let targetHash = path.indexOf("#") == 0 ? path : `#${path}`;

        // call pushState ——will not trigger popstate or hashChange event
        window.history.pushState(data, title, targetHash);
        // params from location.search
        let searchQuery = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });
        dealHash(targetHash, searchQuery);
    }

    export function replace({ data, title, path }) {
        console.log("replace route");
        routeStack.pop();
        let targetHash = path.indexOf("#") == 0 ? path : `#${path}`;
        // call replaceState ——will not trigger popstate or hashChange event
        window.history.replaceState(data, title, targetHash);
        // params from location.search
        let searchQuery = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });
        dealHash(targetHash, searchQuery);
    }

    export function back() {
        // call back ——will trigger popstate or hashChange event
        window.history.back();
    }

    function dealHash(hash, extParams = {}) {
        let routeCrop = matchRoute(hash, extParams);
        if (routeCrop) {
            console.log("route match success", routeCrop);
            routeStack.push(routeCrop);
            if (!curRoute) {
                curRoute = writable(routeCrop);
            } else {
                curRoute.update((r) => null);
                tick().then(() => {
                    curRoute.update((r) => routeCrop);
                });
            }
        } else {
            console.log("route match failed");
        }
    }

    function matchRoute(hash, extParams = {}) {
        console.log("hash to match", hash);
        let hashArr = hash.split("?");
        let purePath = hashArr[0].replace("#", "") || "/";
        // params from hash after character ?
        let hashQuery = qs.parse(hashArr[1]);
        for (let cfg of routes) {
            let mfn = match(cfg.path, {
                encode: encodeURI,
                decode: decodeURIComponent,
            });
            let res = mfn(purePath);
            if (res) {
                // params from hash path
                let pathParams = res.params;
                return {
                    hash,
                    ...cfg,
                    params: {
                        ...extParams,
                        ...hashQuery,
                        ...pathParams,
                    },
                };
            }
        }
    }

    function dealComp(c) {
        if (typeof c == "function") {
            if (c.prototype instanceof SvelteComponent) {
                // eg   component: Detail
                return Promise.resolve(c);
            } else {
                // eg  component: () => import('@/pages/Welcome')
                return dealComp(c());
            }
        } else if (typeof c == "object") {
            if (c instanceof Promise) {
                // eg  component: import('@/pages/Home')
                return c;
            } else {
                return Promise.reject(Error(`unrecognized component`));
            }
        } else {
            return Promise.reject(Error(`unrecognized component`));
        }
    }

    window.addEventListener("popstate", (evt) => {
        console.log("popstate", evt);
    });
    window.addEventListener("hashchange", (evt) => {
        console.log("hashChange", evt);

        let oldLocation = document.createElement("a");
        oldLocation.href = evt.oldURL;

        let newLocation = document.createElement("a");
        newLocation.href = evt.newURL;

        console.log("current route stack", routeStack);
        let len = routeStack.length;
        // params from location.search
        let searchQuery = qs.parse(newLocation.search, {
            ignoreQueryPrefix: true,
        });
        if (len >= 2) {
            let firstRoute = routeStack[len - 1];
            let secondRoute = routeStack[len - 2];
            if (
                oldLocation.hash == firstRoute.hash &&
                newLocation.hash == secondRoute.hash
            ) {
                console.log("router back");
                routeStack.pop();
                routeStack.pop();
            }
        }
        dealHash(newLocation.hash, searchQuery);
    });
</script>

<script>
    /**
     * native api location、history、event(popstate、hashChange)
     */
    // full url constructure  {protocal}//{host}{:port}{pathname}{?search}{hash}
    // refer https://developer.mozilla.org/zh-CN/docs/Web/API/Location

    // temporarily, not supported neested route、 keepalive feature like in vue-router
</script>

{#if curRoute && $curRoute}
    {#await dealComp($curRoute.component)}
        <p style="color: gray">...waiting</p>
    {:then res}
        <svelte:component this={res.default || res} params={$curRoute.params} />
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
{:else}
    <p style="color: orange">no route matched</p>
{/if}
