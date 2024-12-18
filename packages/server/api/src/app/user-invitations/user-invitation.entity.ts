import { UserInvitation } from '@activepieces/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export const UserInvitationEntity = new EntitySchema<UserInvitation>({
    name: 'user_invitation',
    columns: {
        ...BaseColumnSchemaPart,
        platformId: {
            type: String,
            nullable: false,
        },
        type: {
            type: String,
            nullable: false,
        },
        platformRole: {
            type: String,
            nullable: true,
        },
        email: {
            type: String,
        },
        projectId: {
            type: String,
            nullable: true,
        },
        status: {
            type: String,
            nullable: false,
        },
        projectRoleId: {
            type: String,
            nullable: true,
        },
    },
    indices: [
        {
            name: 'idx_user_invitation_email_platform_project',
            columns: ['email', 'platformId', 'projectId'],
            unique: true,
        },
    ],
    relations: {
        projectRole: {
            type: 'many-to-one',
            target: 'project_role',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'projectRoleId',
                referencedColumnName: 'id',
            },
        },
    },
})
