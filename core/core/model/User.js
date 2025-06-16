import query from "core/connector/mysql.js"
import UserGroup from './UserGroup.js'
import UserAuthPassword from './UserAuthPassword.js'


import instantSqlTable from './sqlBaseTable.js'
export default instantSqlTable({
    tableName: "User",

    async setRole(ctx, userName, groupName) {
        const group = await UserGroup.getOne(ctx, { name: groupName })

        return this.insertOrUpdate(ctx, {
            name: userName,
            roleId: group.id,
        })
    },

    async loginByEmailPassword(ctx, email, password) {
        const user = await this.getOne(ctx, { email })
        if (!user || !(await UserAuthPassword.validatePassword(ctx, user.id, password))) return undefined
        return user
    },

    async getAllGroupsOfUserId(ctx, userId) {
        userId = parseInt(userId)
        return query(`
WITH RECURSIVE cte_table AS (
    SELECT id, parentId FROM UserGroup WHERE id IN (
		(SELECT groupId as id  FROM User_group WHERE userId = ${userId})
		UNION (SELECT roleId as id FROM User WHERE id = ${userId})
	)
    
    UNION ALL
    
    SELECT t.id, t.parentId FROM UserGroup t INNER JOIN cte_table ON t.id = cte_table.parentId
)

SELECT * FROM UserGroup WHERE id IN (SELECT id FROM cte_table);`)
    }

})
