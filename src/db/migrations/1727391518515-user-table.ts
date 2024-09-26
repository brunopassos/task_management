import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1727391518515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE User (
                id VARCHAR(36) PRIMARY KEY UNIQUE,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                companyId VARCHAR(36),
                roles ENUM('admin', 'user') NOT NULL,
                FOREIGN KEY (companyId) REFERENCES Company(id) ON DELETE CASCADE
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS User`);
  }
}
