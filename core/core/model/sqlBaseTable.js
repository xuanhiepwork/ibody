import query from "core/connector/mysql.js"
import { insertOrUpdate, listWithOpt, getOne } from "../helper/sqlBuilder.js"

const basetable = {
    tableName: "",

    insertOrUpdate: async function (ctx, obj) {
        return query(insertOrUpdate(this.tableName, obj))
    },

    listWithOpt: async function (ctx, opt) {
        return query(listWithOpt(this.tableName, opt))
    },

    getOne: async function (ctx, where) {
        return (await query(getOne(this.tableName, where)))[0]
    }
}

export default (rawModel) => Object.assign(Object.create(basetable), rawModel)
