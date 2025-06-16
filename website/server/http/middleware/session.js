import session from "express-session"
import { RedisStore } from "connect-redis"
import { createClient } from "redis"
import ctx from "core"

// session store
const redisClient = createClient()
redisClient.connect().catch(console.error)
const redisStore = new RedisStore({ client: redisClient, prefix: "ibody:" })

export default session({
  store: redisStore,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: process.env.APP_AUTH_SESSION_SECRET,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  }
})

export const auth = {
  async loginByEmailPassword(sess, email, password) {
    const user = await ctx.call("User", "loginByEmailPassword", email, password)
    if (!user) return undefined

    sess.whoami = {
      user: {
        id: user?.id,
        name: user?.name,
        fullname: user?.fullname,
        roles: ["quan_tri", "chuyen_gia"],
        gourps: (await ctx.call("User", "getAllGroupsOfUserId", user.id)).map(g => g?.code),
        avatarUrl: user?.avataUrl
      },
      syncCode: Date.now().toString(16)
    }

    return 'login-success'
  },

  async whoami(sess) {
    return sess.whoami
  },

  async logout(sess) {
    return sess.destroy()
  }

}