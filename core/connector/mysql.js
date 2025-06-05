import mysql from 'mysql2/promise'
import app from 'app'
import env from '../env.js'


const connectInfos = env.dal.databse

export const pool = mysql.createPool(Object.assign({
    host: connectInfos.host,
    user: connectInfos.user,
    database: connectInfos.database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
}, env.connection.mysqlPool))


export const queryRaw = async query => (await pool.query(query))[0]

export const queryLog = query => {
    app.logger.log(`\n> sql:------------------\n${query}\n------------------------`)
    return queryRaw(query)
}

var query = queryRaw
if (env.connection.mysqlLog) query = queryLog

export default query
