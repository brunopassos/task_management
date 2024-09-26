import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1727391532397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE Task (
                id VARCHAR(36) PRIMARY KEY UNIQUE,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status ENUM('pendente', 'em_progresso', 'concluida') NOT NULL,
                expirationDate DATETIME,
                companyId VARCHAR(36),
                FOREIGN KEY (companyId) REFERENCES Company(id) ON DELETE CASCADE,
                userId VARCHAR(36),
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Task`);
  }
}
