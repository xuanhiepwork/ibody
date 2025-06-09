import query from 'app/connections/mysql.js'
import { randomBytes, scryptSync } from 'node:crypto'
import env from 'core/env.js'


// The length of hex form is twice times the buffer form of corresponding value.
// Mysql stores the hex value.
// `>> 1` mean round-down(len/2)
const saltLen = (await query(`SELECT CHARACTER_MAXIMUM_LENGTH FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='${env.dal.db.database}' AND TABLE_NAME='user_login_password' AND COLUMN_NAME='salt';`))[0].CHARACTER_MAXIMUM_LENGTH >> 1
const hashLen = (await query(`SELECT CHARACTER_MAXIMUM_LENGTH FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='${env.dal.db.database}' AND TABLE_NAME='user_login_password' AND COLUMN_NAME='hash';`))[0].CHARACTER_MAXIMUM_LENGTH >> 1
const sqlEncode = 'hex'
const genHash = (password, salt) => scryptSync(password, salt, hashLen)

const charactersSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersSetLen = charactersSet.length
export const randomText = length => {
    const out = new Array(length)
    var i = length - 1
    if (i >= 0) do {
        out[i] = characters.charAt(Math.floor(Math.random() * charactersSetLen))
    } while (i--)
    return out.join("")
}


export const setPassword = async (cur, userId, password) => {
    await cur.assertPermisions("pem-testa")
    const salt = randomBytes(saltLen)

    return await query(`REPLACE INTO user_login_password (userId, salt, hash) VALUES ('${userId}', '${salt.toString(sqlEncode)}', '${genHash(password, salt).toString(sqlEncode)}');`)
}

export const validatePassword = async (cur, userId, password) => {
    const { salt, hash } = (await query(`SELECT salt, hash FROM user_login_password WHERE userId='${userId}' LIMIT 1;`))[0]
    return Buffer.compare(genHash(password, Buffer.from(salt, sqlEncode)), Buffer.from(hash, sqlEncode)) === 0
}
