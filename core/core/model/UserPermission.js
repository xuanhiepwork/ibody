import query from "core/connector/mysql.js"
import userGroup from './UserGroup.js'


import instantSqlTable from './_sqlBaseTable.js'
export default instantSqlTable({
    tableName: "UserPermission",
    userHasPerm: function (ctx, perm) {
        // #TODO:
        // return query(`INSERT INTO userPermission(id, name) VALUES (NULL, '${name}');`)

        const userId = ctx.userId
        // await query(userId, perm)
        return true
    }
})
