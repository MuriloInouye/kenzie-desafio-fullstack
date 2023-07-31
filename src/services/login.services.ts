import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Client } from "../entities"
import { ILoginData } from "../interface/login.interfaces"

import {compare} from "bcryptjs"
import jwt from "jsonwebtoken";


class LoginServices {
    login = async (loginData: ILoginData) => {
        const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
        const client: Client | null = await clientRepository.createQueryBuilder("client")
                                         .select(["client.id", "client.admin", "client.password"])
                                         .where("client.user = :user", {
                                            user: loginData.user
                                         })
                                         .getOne()

        if (!client) {
            return {status: 400, message: {error: "Wrong user or Password"}}
        }    
                                     
        const passwordMatch: boolean = await compare(loginData.password, client.password);

        if (!passwordMatch) {
            return {status: 400, message: {error: "Wrong user or Password"}}
        }

        const token: string = jwt.sign(
            {
                admin: client.admin,
            },
            process.env.SECRET_KEY!,
            {
                expiresIn: "24h",
                subject: String(client.id),
            }
        )

        return {status: 201, message: token}
    }
}

export default new LoginServices