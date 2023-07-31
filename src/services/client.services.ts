import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Client } from "../entities"
import { IRegisterClient, IUpdateClient } from "../interface/client.interfaces"


class ClientServices {
    registerClient = async (clientData: IRegisterClient) => {
        const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

        const {user, complete_name, email, admin, password, telefone} = clientData
    
        const client = clientRepository.create({user, complete_name, email, admin, password, telefone})
        await clientRepository.save(client)

        const newClient = {
            id: client.id,
            user: client.user,
            complete_name: client.complete_name,
            email: client.email,
            admin: client.admin,
            telefone: client.telefone,
            created_at: client.created_at
        }

        return {status: 201, message: newClient}
    }

    getAllClientsAndContacts = async () => {
        const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
        const clients = await clientRepository.find({
            relations: ["contacts"],
            select: ["id", "user", "complete_name", "email", "admin", "telefone", "created_at"]
        });

        return {status: 200, message: clients}
    }

    updateClient = async (updateData: IUpdateClient, clientId: number) => {
        const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
        const client: Client | null = await clientRepository.findOne({
            where: {
                id: clientId
            }
        });

        await clientRepository.update(client!.id, {...updateData as Client})

        const updatedUser = await clientRepository.createQueryBuilder("client")
                                                .select(["client.id", "client.user", "client.complete_name", "client.email", "client.admin", "client.created_at"])
                                                .where("id = :id", {
                                                    id: client!.id
                                                })
                                                .getOne()

        return {status: 200, message: updatedUser}  
    }

    deleteClient = async (clientId: number) => {
        const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
        const client: Client | null = await clientRepository.findOne({
            where: {
                id: clientId
            }
        });

        await clientRepository.delete(client!.id)

        return {status: 204}
    }
}

export default new ClientServices