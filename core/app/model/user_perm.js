import query from "app/connector/mysql.js"

export async function userHasPerm(ctx, perm) {
    const userId = ctx.userId
    // #TODO:
    // await query(userId, perm)
    return true
}