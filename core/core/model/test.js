import query from "core/connector/mysql.js"



export function sql() {
    return query(`show databases;`)
}

export function perm(ctx, name) {
    return query(`INSERT INTO userPermission(id, name) VALUES (NULL, '${name}');`)
}

export async function initUser(ctx) {
    const adminObj = {
        name: "admin",
        email: "admin@ibody.com",
        fullname: "Administrator",
    }
    await ctx.rpc("user", "insertOrUpdate", adminObj)

    const admin = await ctx.rpc("user", "userGetById", adminObj.name)

    return admin
}

export async function userGetById(ctx, id) {
    return await ctx.rpc("user", "getById", id)
}
