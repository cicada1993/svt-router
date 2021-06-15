import Detail from "@/pages/Detail"
import List from "@/pages/List"
import Special from "@/pages/Special"
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
    {
        path: ["/special/:tag", "/special/café/:tag"],
        component: Special
    }
]