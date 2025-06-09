import UserGroup from './UserGroup.js'


import instantSqlTable from './sqlBaseTable.js'
export default instantSqlTable({
    tableName: "User",

    async setRole(ctx, userName, groupName) {
        const group = await UserGroup.getOne(ctx, { name: groupName })

        return this.insertOrUpdate(ctx, {
            name: userName,
            roleId: group.id,
        })
    }

})
