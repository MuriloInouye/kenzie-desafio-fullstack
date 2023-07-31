import {Request, Response} from "express"
import { IRegisterClient, IUpdateClient } from "../interface/client.interfaces"
import clientServices from "../services/client.services"
import { number } from "yup"


class ClientController {
    registerClient = async (req: Request, res: Response) => {
        try {
            const clientData: IRegisterClient = req.body

            const registerClient = await clientServices.registerClient(clientData)

            return res.status(registerClient.status).json(registerClient.message)

        } catch (_) {
            return res.status(500).json({error: "Erro no servidor"})

        }
    }

    getAllClientsAndContacts = async (req: Request, res: Response) => {
        try {
            const clientsAndContacts = await clientServices.getAllClientsAndContacts()

            return res.status(clientsAndContacts.status).json(clientsAndContacts.message)
        } catch (_) {
            return res.status(500).json({error: "Erro no servidor"})
        }
    }

    updateClient = async (req: Request, res: Response) => {
        try {
            const updateData: IUpdateClient = req.body
            const clientId: number = Number(req.params.id)

            const updateClient = await clientServices.updateClient(updateData, clientId)

            return res.status(updateClient.status).json(updateClient.message)
            
        } catch (_) {
            return res.status(500).json({error: "Erro no servidor"})

        }
    }

    deleteClient = async (req: Request, res: Response) => {
        try {
            const clientId = Number(req.params.id)
            const deleteClient = await clientServices.deleteClient(clientId)

            return res.status(deleteClient.status).send()

        } catch(_) {
            return res.status(500).json({error: "Erro no servidor"})
        }
    }
}

export default new ClientController