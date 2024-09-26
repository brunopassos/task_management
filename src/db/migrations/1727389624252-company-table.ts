import { MigrationInterface, QueryRunner } from 'typeorm';

export class CompanyTable1727389624252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE Company (
                id VARCHAR(36) PRIMARY KEY UNIQUE,
                name VARCHAR(255) NOT NULL
            );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Company`);
  }
}
