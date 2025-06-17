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
  emitSync(req) {
    req.res.cookie("user_syncCode", Date.now().toString(16), { httpOnly: false })
  },

  async refreshWhoami(req) {
    const user = (await ctx.call("User", "getOne", { id: req.session.whoami.user.id })).result
    if (!user) return undefined

    req.session.whoami = {
      user: {
        id: user?.id,
        name: user?.name,
        fullname: user?.fullname,
        roles: ["quan_tri", "chuyen_gia"],
        gourps: ((await ctx.call("User", "getAllGroupsOfUserId", user.id)).result || []).map(g => g?.code),
        avatarUrl: user?.avatarUrl
      }
    }
    auth.emitSync(req)
  },

  async loginByEmailPassword(req, email, password) {
    const user = (await ctx.call("User", "loginByEmailPassword", email, password)).result
    if (!user) return undefined

    req.session.whoami = {
      user: {
        id: user?.id
      }
    }

    await this.refreshWhoami(req, user)
    return 'login-success'
  },

  whoami(req) {
    return req.session.whoami
  },

  getUser(req) {
    return req.session?.whoami?.user
  },

  async logout(req) {
    await req.session.destroy()
    auth.emitSync(req)
  }

}