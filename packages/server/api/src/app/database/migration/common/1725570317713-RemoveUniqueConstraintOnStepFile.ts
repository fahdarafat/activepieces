import { logger } from '@activepieces/server-shared'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveUniqueConstraintOnStepFile1725570317713 implements MigrationInterface {
    name = 'RemoveUniqueConstraintOnStepFile1725570317713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "step_file_project_id_flow_id_step_name_name"
        `)
        await queryRunner.query(`
            CREATE INDEX "step_file_project_id_flow_id_step_name_name" ON "step_file" ("projectId", "flowId", "stepName", "name")
        `)
        logger.info({ name: 'RemoveUniqueConstraintOnStepFile1725570317713' }, 'up')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "step_file_project_id_flow_id_step_name_name"
        `)
        await queryRunner.query(`
            CREATE UNIQUE INDEX "step_file_project_id_flow_id_step_name_name" ON "step_file" ("projectId", "flowId", "stepName", "name")
        `)
        logger.info({ name: 'RemoveUniqueConstraintOnStepFile1725570317713' }, 'down')
    }

}
