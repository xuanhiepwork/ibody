import instantSqlTable from './_sqlBaseTable.js'
import User from './User.js'

export default instantSqlTable({
    tableName: "Chatbox",

    async getUserInfo(ctx, userId) {
        const user = await User.getOne(ctx, {id: userId})
        return {
            fullname: user.fullname,
            avataUrl: user.avataUrl,
        }
    },


})
