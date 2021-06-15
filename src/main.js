import routes from "./routes"
import SvtRouter, { init } from "./SvtRouter"
init(routes)
let app = new SvtRouter({
    target: document.getElementById("app"),
})