import {Express} from "express"
import loginRoute from "./login.routes"
import clientRoute from "./client.routes"
import contactRoute from "./contacts.routes"


const indexRoutes = (app: Express) => {
    app.use("/login", loginRoute)
    app.use("/client", clientRoute)
    app.use("/contact", contactRoute)
}


export default indexRoutes