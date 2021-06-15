# svt-router
- a tiny and strong hash router for svelte but idea can be for any front-end project
- you can handle your web page as you want

## requirements
- svelte with webpack
## install
```
npm install svt-router --save-dev
```
## how to use
very simple：
- declare your page routes in routes.js
```
import Detail from "@/pages/Detail"
import List from "@/pages/List"
export default [
    {
        path: "/",
        component: async () => await import('@/pages/Welcome'),
    },
    {
        path: "/welcome",
        component: () => import('@/pages/Welcome')
    },
    {
        path: "/home",
        component: import('@/pages/Home')
    },
    {
        path: "/detail",
        component: () => Detail
    },
    {
        path: "/list/:id",
        component: List
    },
]
```
- init routes by svt-router in main.js
```
import routes from "./routes"
import SvtRouter, { init } from "./SvtRouter"
init(routes)
```
- mount SvtRouter into dom in main.js
```
let app = new SvtRouter({
    target: document.getElementById("app"),
})
```
## api
- init(cfgs)
    - cfgs must be an array you see in example
    - used for initializing routes and create first route
    - must be called before create app 
- push({ data, title, path })
    - inner call window.history.pushState
    - push a route info routeStack
    - match route by path and update curRoute
    - refresh page by curRoute
- replace({ data, title, path })
    - inner call window.history.replaceState
    - pop a route from routeStack
    - match route by path and update curRoute
    - refresh page by curRoute
- back()
    - just call window.history.back()

## directions
- temporarily, not supported neested route、 keepalive feature like in vue-router
- component in route supports some types as you see above
- path can support params
```
{
    path: "/list/:id",
    component: List
}
```
- one component can be matched by path's array
```
{
    path: ["/special/:tag", "/special/café/:tag"],
    component: Special
}
```
- arguments for function push、replace,data、title just can be ignored
- you can pass a path like
```
push({path:'/home'})
push({path:'#/home'})
push({path:'/home?name=aaa'})
push({path:'/list/666?name=bbb'})
```
- you can read route params like
```
$$props.params
```
## example
```
npm run dev
```
