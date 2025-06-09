import { RedisStore } from "connect-redis"
import session from "express-session"
import { createClient } from "redis"

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
})
