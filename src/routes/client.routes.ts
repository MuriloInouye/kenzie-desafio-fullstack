import {Router} from "express"
import clientControllers from "../controllers/client.controllers"
import useSchemaMiddleware from "../middlewares/useSchema.middleware"
import { registerClient, updateClient } from "../schemas/client.schemas"
import verifyEmailMiddleware from "../middlewares/verifyEmail.middleware"
import verifyIdMiddleware from "../middlewares/verifyId.middleware"


const clientRoute = Router()

clientRoute.post("", useSchemaMiddleware(registerClient), verifyEmailMiddleware, clientControllers.registerClient)
clientRoute.get("", clientControllers.getAllClientsAndContacts)
clientRoute.patch("/:id", useSchemaMiddleware(updateClient), verifyIdMiddleware, verifyEmailMiddleware, clientControllers.updateClient)
clientRoute.delete("/:id", verifyIdMiddleware, clientControllers.deleteClient)

export default clientRoute