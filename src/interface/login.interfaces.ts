import { z } from "zod";
import loginSchema from "../schemas/login.schemas";

export type ILoginData = z.infer<typeof loginSchema>