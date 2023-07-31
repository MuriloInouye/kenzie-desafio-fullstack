import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./client.entity";

@Entity("contacts")
class Contact {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type:"varchar", length:45})
    complete_name: string
    
    @Column({type:"varchar", length:45, unique:true})
    email: string

    @Column({type:"varchar", length: 11})
    telefone: string

    @CreateDateColumn({type:"date"})
    created_at: string

    @ManyToOne(() => Client, (client) => client.contacts)
    client: Client
}

export default Contact