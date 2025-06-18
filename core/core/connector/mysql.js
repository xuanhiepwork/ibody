import mysql from 'mysql2/promise'
import env from '../env.js'


const connectInfos = env.dal.db

export const pool = mysql.createPool({
    host: connectInfos.host,
    user: connectInfos.user,
    database: connectInfos.database,
    password: connectInfos.password,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})


export const queryRaw = async query => (await pool.query(query))[0]

export const queryLog = query => {
    console.log(`\n> sql:------------------\n${query}\n------------------------`)
    return queryRaw(query)
}

var query = queryRaw
if (connectInfos.logquery) query = queryLog

export default query
