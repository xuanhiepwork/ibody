const escapeStringMap = {
    '\0': '\\0',
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\r': '\\r',
    '\x1a': '\\Z',
    '"': '\\"',
    '\'': '\\\'',
    '\\': '\\\\'
}
export const escapeString = str => Array.from(String(str)).map(e => escapeStringMap[e] ? escapeStringMap[e] : e).join("")

export const insertOrUpdate = (tableName, data) => {
    const payload = Object.entries(data)
        .filter(([field, value]) => value !== null && value !== undefined)
        .map(([field, value]) => [field, value === "" ? '""' : isNaN(value) ? `"${value}"` : String(value)])
    return `INSERT ${tableName} (${payload.map(([key]) => key).join(", ")}) VALUES(${payload.map(([key, value]) => value).join(", ")}) ON DUPLICATE KEY UPDATE ${payload.map(([key, value]) => `\`${key}\`=${value}`).join(", ")};`
}

export const whereClauseMap = w => {
    if (w[1] === "=") {
        if (isNaN(w[2])) {
            w = [...w]
            w[2] = '"' + String(w[2]) + '"'
        }
    }
    return w.join("")
}

export const whereClause = record => [
    "WHERE ",
    Object.entries(record).map(([field, value]) => [field, "=", value])
        .map(whereClauseMap)
        .join(" AND "),
    ";"
].flat(Infinity).join("")


export const escapeField = (raw) => raw
export const escapeValue = (raw) => raw

export const genWhereClauseArr = (data) => {
    if (typeof data === 'object') return ["(", , ")"]
    if (Array.isArray(data)) return ["(", data.map(), ")"]
}

const whereObj = obj => Object.entries(data).map(([field, value], i) => [i > 0 ? " AND " : "", escapeField(field), "=", escapeValue(value)])
const whereArr = obj => 

export const listWithOpt = ({ tableName, fields, where, order, limit, offset }) => [
    "SELECT", Array.isArray(fields) && fields.length > 0 ? fields.join(", ") : "*",
    "FROM", tableName,
    Array.isArray(where) && where.length > 0 ? ["WHERE", where.map(whereClauseMap).join(" AND ")] : [],
    Array.isArray(order) && order.length > 0 ? ["ORDER BY", order.map(o => o.join(" ")).join(", ")] : [],
    limit > 0 ? ["LIMIT", limit, offset > 0 ? [" OFFSET", offset] : []] : [],
    ";"
].flat(Infinity).join(" ")

export const getOne  = ({ tableName, where }) => [
    "SELECT *",
    "FROM", tableName,
    Array.isArray(where) && where.length > 0 ? ["WHERE", where.map(whereClauseMap).join(" AND ")] : whereClause(where),
    "LIMIT 1 ;"
].flat(Infinity).join(" ")