import { z } from "zod";

const registerClient = z.object({
    user: z.string().max(45),
    complete_name: z.string().max(45),
    email: z.string().email(),
    admin: z.boolean().optional().default(false),
    password: z.string().max(120),
    telefone: z.string().max(11),
})

const updateClient = z.object({
    user: z.string().max(45).optional(),
    complete_name: z.string().max(45).optional(),
    email: z.string().email().max(45).optional(),
    password: z.string().max(120).optional(),
    telefone: z.string().max(11).optional()
})

export {registerClient, updateClient}