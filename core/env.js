switch (process.env.ENV) {
    case "dev":

        break;

    case "stage":

        break;

    case "prod":

        break;
}



export default {
    dal: {
        databse: {
            host: 'localhost',
            user: 'ibodydbuser',
            password: '@bc!@#123',
            database: 'ibody',
        },
        workdir: './dal/runtime',
    }

}