const { env } = process
export default {
    dal: {
        db: {
            host: env['DB_HOST'],
            user: env['DB_USER'],
            password: env['DB_PASSWORD'],
            database: env['DB_DATABASE'],
            logquery: false,
        },
        workdir: env['WORKDIR_PATH'],
    }
}   