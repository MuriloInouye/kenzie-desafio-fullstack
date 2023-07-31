import {Request, Response} from "express"
import loginServices from "../services/login.services"
import { ILoginData } from "../interface/login.interfaces"


class LoginController {
    login = async (req: Request, res: Response) => {
        try {
            const loginData: ILoginData = req.body

            const login = await loginServices.login(loginData)
            
            return res.status(login.status).json(login.message)

        } catch (_) {
            return res.status(500).json({error: "Erro no servidor"})

        }
    }
}

export default new LoginController