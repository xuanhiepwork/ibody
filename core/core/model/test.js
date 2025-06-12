import query from "core/connector/mysql.js"


export default {
    sql() {
        return query(`show databases;`)
    },

    perm(ctx, name) {
        return query(`INSERT INTO userPermission(id, name) VALUES (NULL, '${name}');`)
    },

    async initUser(ctx) {
        await ctx.call("UserGroup", "insertOrUpdate", { code: "baseuser", name: "Người dùng" })
        const groupBaseuser = await ctx.call("UserGroup", "getOne", { code: "baseuser" })
        await ctx.call("UserGroup", "insertOrUpdate", { code: "admin", name: "Quản trị viên", parentId: groupBaseuser.id })
        const groupAdmin = await ctx.call("UserGroup", "getOne", { code: "admin" })
        await ctx.call("UserGroup", "insertOrUpdate", { code: "experd", name: "Chuyên gia", parentId: groupBaseuser.id })
        const groupExperd = await ctx.call("UserGroup", "getOne", { code: "experd" })

        await ctx.call("User", "insertOrUpdate", {
            name: "admin",
            email: "admin@ibody.com",
            fullname: "Administrator",
            roleId: groupAdmin.id,
        })
        const admin = await ctx.call("User", "getOne", { name: "admin" })
        await ctx.call("UserAuthPassword", "setPassword", admin.id, "abc")

        await ctx.call("UserGroup", "addUser", groupAdmin.name, admin.name)
        await ctx.call("UserGroup", "addUser", groupExperd.name, admin.name)

        
        return await ctx.call("User", "getAllGroupsOfUserId", admin.id)
    },

    async userGetById(ctx, id) {
        return await ctx.call("User", "getById", id)
    }
}