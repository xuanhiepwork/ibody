import { randomBytes, scryptSync } from 'node:crypto'
import env from 'core/env.js'
import query from "core/connector/mysql.js"


// The length of hex form is twice times the buffer form of corresponding value.
// Mysql stores the hex value.
// `>> 1` mean round-down(len/2)
const saltLen = (await query(`SELECT CHARACTER_MAXIMUM_LENGTH FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='${env.dal.db.database}' AND TABLE_NAME='UserAuthPassword' AND COLUMN_NAME='salt';`))[0].CHARACTER_MAXIMUM_LENGTH >> 1
const hashLen = (await query(`SELECT CHARACTER_MAXIMUM_LENGTH FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='${env.dal.db.database}' AND TABLE_NAME='UserAuthPassword' AND COLUMN_NAME='hash';`))[0].CHARACTER_MAXIMUM_LENGTH >> 1
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


import instantSqlTable from './_sqlBaseTable.js'
export default instantSqlTable({
    tableName: "UserAuthPassword",

    async setPassword(ctx, userId, password) {
        await ctx.hasPerm("pem-testa")
        const salt = randomBytes(saltLen)

        return this.replaceInto(ctx, {
            userId,
            salt: salt.toString(sqlEncode),
            hash: genHash(password, salt).toString(sqlEncode)
        })
    },

    async validatePassword(ctx, userId, password) {
        const { salt, hash } = await this.getOne(ctx, { userId })
        return Buffer.compare(genHash(password, Buffer.from(salt, sqlEncode)), Buffer.from(hash, sqlEncode)) === 0
    }

})
