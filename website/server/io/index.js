import ctx from "core"
import { io } from "../server.js"


io.on('connection', (socket) => {
  console.log('a user connected');

  let userId

  socket.on('disconnect', () => {
    console.log('user disconnected', userId);
  })

  socket.on('join-room-user', (uId) => {
    userId = uId
    socket.join(uId)
    console.log('userid', userId);
  })

  socket.on('message-to-chatbox', async (chatboxId, content) => {
    if (!userId) return

    const sendRs = (await ctx.asUserId(userId).call("Chatbox", "sendMessage", chatboxId, { content })).result || {}
    const msgRecord = (await ctx.asUserId(userId).call("ChatboxMessage", "getOne", {
      id: sendRs.insertId
    })).result || {}

    const userIds = new Set(
      ((await ctx.asUserId(userId).call("Chatbox", "getMemberIds", chatboxId)).result || []).map(m => m.userId)
    )
    userIds.forEach(id => io.to(id).emit("message-chatbox-to-user", msgRecord))

  });


});