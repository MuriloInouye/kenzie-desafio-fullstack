import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatrTables1690709682672 implements MigrationInterface {
    name = 'CreatrTables1690709682672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "user" character varying(45) NOT NULL, "complete_name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean DEFAULT false, "password" character varying(120) NOT NULL, "telefone" character varying(11) NOT NULL, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "complete_name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "telefone" character varying(11) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
