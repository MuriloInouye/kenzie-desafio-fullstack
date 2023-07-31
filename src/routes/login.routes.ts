import {Router} from "express"
import loginControllers from "../controllers/login.controllers"


const loginRoute = Router()

loginRoute.post("", loginControllers.login)

export default loginRoute