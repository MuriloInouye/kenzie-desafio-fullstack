import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import bcrypt from "bcryptjs";
import Contact from "./contacts.entity";


@Entity("clients")
class Client {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({type:"varchar", length: 45})
    user: string

    @Column({type:"varchar", length:45})
    complete_name: string
    
    @Column({type:"varchar", length:45, unique:true})
    email: string

    @Column({ type: "boolean", nullable: true, default: false })
    admin: boolean | undefined | null

    @Column({ type: "varchar", length: 120 })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({type:"varchar", length: 11})
    telefone: string

    @CreateDateColumn({type:"date"})
    created_at: string

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact
}

export default Client