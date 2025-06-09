import query from "core/connector/mysql.js"
import { getOne } from 'core/helper/sqlBuilder.js'


const tableName = "userGroup"
export async function create(ctx, name) {
    const rs = await query(`INSERT INTO ${tableName}(id, name) VALUES (NULL, '${name}');`)
    return rs.insertId
}

export async function get(ctx, where) {
    return query(getOne(tableName, where))
}
