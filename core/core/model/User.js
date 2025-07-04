import query from "core/connector/mysql.js"
import UserGroup from './UserGroup.js'
import UserAuthPassword from './UserAuthPassword.js'
import Chatbox from './Chatbox.js'
import ChatboxMember from './ChatboxMember.js'


import instantSqlTable from './_sqlBaseTable.js'
export default instantSqlTable({
    tableName: "User",


    async register(ctx, data) {
        const baseuserGroup = await UserGroup.getOne(ctx, { code: "baseuser" })

        await this.insert(ctx, {
            email: data.email,
            roleId: baseuserGroup.id,
            fullName: data.fullName,
        })

        const user = await this.getOne(ctx, { email: data.email })
        UserAuthPassword.setPassword(ctx, user.id, data.password)

        return user
    },

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
    },

    async getData(ctx, userId) {
        return this.getOne(ctx, { id: userId })
    },

    async setData(ctx, userId, data = {}) {
        return this.update(ctx, data, { id: userId })
    },

    async getCheckboxes(ctx) {
        return query(`SELECT * FROM Chatbox
WHERE id IN (
    SELECT DISTINCT chatboxId FROM ChatboxMember WHERE userId=${ctx.userId}
)
ORDER BY lastMessageAt DESC;`)
    },

})
