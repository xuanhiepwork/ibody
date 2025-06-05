import query from "../connector/mysql.js";

console.log(await query(`show databases;`))