import {z} from "zod"
import { registerClient, updateClient } from "../schemas/client.schemas"

export type IRegisterClient = z.infer<typeof registerClient>

export type IUpdateClient = z.infer<typeof updateClient>