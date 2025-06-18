import { insertOrUpdate } from "../helper/sqlBuilder.js"
import query from "core/connector/mysql.js"
import User from './User.js'
import UserPermission from './UserPermission.js'


import instantSqlTable from './_sqlBaseTable.js'
export default instantSqlTable({
    tableName: "UserGroup",

    async addPermission(ctx, groupName, permissionName) {
        const group = await this.getOne(ctx, { name: groupName })
        const perm = await UserPermission.getOne({ name: permissionName })
        return query(insertOrUpdate("UserGroup_permission", {
            permId: perm.id,
            groupId: group.id,
        }))
    },

    async addUser(ctx, groupName, userName) {
        const group = await this.getOne(ctx, { name: groupName })
        const user = await User.getOne(ctx, { name: userName })
        return query(insertOrUpdate("User_group", {
            groupId: group.id,
            userId: user.id,
        }))
    }

})
