import query from "core/connector/mysql.js"


const tableName = "user"

export async function get(ctx, where) {
    return query(getOne(tableName, where))
}

export const insertOrUpdate = async (ctx, obj) => query(
    `INSERT ${tableName} (${obj.map(([key]) => key).join(", ")}) VALUES(${obj.map(([key, value]) => value).join(", ")}) ON DUPLICATE KEY UPDATE ${obj.map(([key, value]) => `\`${key}\`=${value}`).join(", ")};`
)

export const getById = async (ctx, id) => query(
    `SELECT * FROM ${tableName} WHERE id=${id} LIMIT 1 ;`
)

export const getByName = async (ctx, name) => query(
    `SELECT * FROM ${tableName} WHERE name=${name} LIMIT 1 ;`
)
