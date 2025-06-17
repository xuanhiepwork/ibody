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

export const escapeField = (raw) => raw
export const escapeValue = (raw) => raw

const processWhere = (where) => {
    if (Array.isArray(where)) return where
    if (typeof where === "object") return Object.entries(where).map(([field, value]) => [field, "=", value === "" ? '""' : isNaN(value) ? `"${value}"` : String(value)])
}

export const insertOrUpdate = (tableName, data) => {
    const payload = Object.entries(data)
        .filter(([field, value]) => value !== null && value !== undefined)
        .map(([field, value]) => [field, value === "" ? '""' : isNaN(value) ? `"${value}"` : String(value)])
    return `INSERT ${tableName} (${payload.map(([key]) => key).join(", ")}) VALUES(${payload.map(([key, value]) => value).join(", ")}) ON DUPLICATE KEY UPDATE ${payload.map(([key, value]) => `\`${key}\`=${value}`).join(", ")};`
}

export const listWithOpt = (tableName, { fields, where, order, limit, offset }) => [
    "SELECT ", Array.isArray(fields) && fields.length > 0 ? fields.map((f, i) => i > 0 ? [", `", f, "`"] : ["`", f, "`"]) : "*",
    "FROM ", tableName,
    where ? [" WHERE ", where] : [],
    order ? [" ORDER BY ", order] : [],
    limit > 0 ? [" LIMIT ", limit, offset > 0 ? [" OFFSET ", offset] : []] : [],
    ";"
].flat(Infinity).join("")


export const getOne = (tableName, where) => [
    "SELECT *",
    " FROM ", tableName,
    where ? [" WHERE ", processWhere(where)] : [],
    " LIMIT 1 ;"
].flat(Infinity).join("")

export const replaceInto = (tableName, data) => {
    const payload = Object.entries(data)
        .filter(([field, value]) => value !== null && value !== undefined)
        .map(([field, value]) => [field, value === "" ? '""' : isNaN(value) ? `"${value}"` : String(value)])
    return `REPLACE INTO ${tableName} (${payload.map(([key]) => key).join(", ")}) VALUES(${payload.map(([key, value]) => value).join(", ")});`
}

export const update = (tableName, data, where) => [
    "UPDATE ", tableName,
    " SET ", Object.entries(data)
        .filter(([field, value]) => value !== null && value !== undefined)
        .map(([field, value], i) => [i > 0 ? ", " : "", field, "=", value === "" ? '""' : isNaN(value) ? `"${value}"` : String(value)]),
    " WHERE ", processWhere(where),
    ";"
].flat(Infinity).join("")


export const insert = (tableName, data) => {
    const payload = Object.entries(data)
        .filter(([field, value]) => value !== null && value !== undefined)
        .map(([field, value]) => [field, value === "" ? '""' : isNaN(value) ? `"${value}"` : String(value)])
    return `INSERT INTO ${tableName} (${payload.map(([key]) => key).join(", ")}) VALUES(${payload.map(([key, value]) => value).join(", ")});`
}
