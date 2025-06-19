import instantSqlTable from './_sqlBaseTable.js'
import User from './User.js'
import ChatboxMessage from './ChatboxMessage.js'
import ChatboxMember from './ChatboxMember.js'


export default instantSqlTable({
    tableName: "Chatbox",

    async create(ctx, { name }) {
        const rs = await this.insert(ctx, { name })
        const id = rs.insertId
        return ChatboxMember.insertOrUpdate(ctx, {
            chatboxId: id,
            userId: ctx.userId,
            roleId: 1, // creator
        })
    },

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

    async getMemberIds(ctx, chatboxId) {
        return ChatboxMember.list(ctx, {
            fields: ["userId"],
            where: { chatboxId }
        })
    },

    async addMember(ctx, chatboxId, userId) {
        return ChatboxMember.insert(ctx, {
            chatboxId,
            userId,
            roleId: 2, // member
        })
    },

})
