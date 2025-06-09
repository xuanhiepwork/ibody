import query from "core/connector/mysql.js"
// import sqlBuilder from 'core/helper/sqlBuilder.js'


const tableName = "userPermission"
export async function create(ctx, name) {
    const rs = await query(`INSERT INTO ${tableName}(id, name) VALUES (NULL, '${name}');`)
    return rs.insertId
}

export async function getOrCreate(ctx, name) {
    const rs = await query(`INSERT INTO ${tableName}(id, name) VALUES (NULL, '${name}');`)
    return rs.insertId
}

export async function userHasPerm(ctx, perm) {
    // return query(`INSERT INTO userPermission(id, name) VALUES (NULL, '${name}');`)

    const userId = ctx.userId
    // #TODO:
    // await query(userId, perm)
    return true
}