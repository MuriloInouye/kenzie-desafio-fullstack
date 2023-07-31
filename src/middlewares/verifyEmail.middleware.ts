import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";

const verifyEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const clientRepository = AppDataSource.getRepository(Client)
    const existingEmail = await clientRepository.findOne({
        where: 
            {email: email}
    })

    if (!email) {
        return next()
    }

    if (existingEmail) {
        return res.status(400).json({error: "Email allready registered"})
    }

    next()
}

export default verifyEmailMiddleware