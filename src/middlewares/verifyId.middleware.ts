import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";

const verifyIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id)

    const userRepository = AppDataSource.getRepository(Client)
    const existingId = await userRepository.findOne({
        where: {
            id: id
        }
    })

    if (!existingId) {
        return res.status(400).json({error: "Id not found"})
    }

    next()
}

export default verifyIdMiddleware