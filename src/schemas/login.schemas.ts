import { z } from "zod";

const loginSchema = z.object({
    user: z.string().max(45),
    password: z.string().max(120)
})

export default loginSchema