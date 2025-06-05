import query from "app/connector/mysql.js"



export function test() {
    return query(`show databases;`)
}