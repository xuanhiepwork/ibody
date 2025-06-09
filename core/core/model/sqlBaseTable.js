import query from "core/connector/mysql.js"
import { insertOrUpdate, listWithOpt, getOne, replaceInto } from "../helper/sqlBuilder.js"

const basetable = {
    tableName: "",

    async insertOrUpdate (ctx, obj) {
        return query(insertOrUpdate(this.tableName, obj))
    },

    async listWithOpt (ctx, opt) {
        return query(listWithOpt(this.tableName, opt))
    },

    async getOne (ctx, where) {
        return (await query(getOne(this.tableName, where)))[0]
    },

    async replaceInto(ctx, obj) {
        return query(replaceInto(this.tableName, obj))
    },
}

export default (rawModel) => Object.assign(Object.create(basetable), rawModel)
