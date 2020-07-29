import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateVehicleTable1596026353899 implements MigrationInterface {
    name = 'CreateVehicleTable1596026353899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "vehicle_status_enum" AS ENUM('PENDING', 'REGISTERED', 'EXPIRED', 'COMPLETED', 'SOLD')`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "version" integer NOT NULL, "year" integer NOT NULL, "yearManufactory" integer NOT NULL, "status" "vehicle_status_enum" NOT NULL DEFAULT 'PENDING', "gallery" text NOT NULL, "buyNowPrice" integer NOT NULL, "bidPrice" integer NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2020-07-29T12:39:18.925Z"', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2020-07-29T12:39:18.925Z"', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2020-07-29T12:39:18.925Z"', "userId" integer, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TYPE "vehicle_status_enum"`);
    }

}
