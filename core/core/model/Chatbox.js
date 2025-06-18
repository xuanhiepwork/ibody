import instantSqlTable from './_sqlBaseTable.js'
import User from './User.js'
import ChatboxMessage from './ChatboxMessage.js'

export default instantSqlTable({
    tableName: "Chatbox",

    async getUserInfo(ctx, userId) {
        const user = await User.getOne(ctx, { id: userId })
        return {
            fullname: user.fullname,
            avataUrl: user.avataUrl,
        }
    },

    async getMessages(ctx, chatboxId) {
        return ChatboxMessage.list(ctx, { where: { chatboxId } })
    },

    async sendMessage(ctx, chatboxId, { typeId = 1, content = "" }) {
        return ChatboxMessage.insert(ctx, {
            chatboxId,
            senderId: ctx.userId,
            typeId,
            content
        })
    },

})
