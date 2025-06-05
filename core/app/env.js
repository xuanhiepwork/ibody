const { env } = process
export default {
    dal: {
        databse: {
            host: env['DB_HOST'],
            user: env['DB_USER'],
            password: env['DB_PASSWORD'],
            database: env['DB_DATABASE'],
        },
        workdir: env['WORKDIR_PATH'],
    }
}