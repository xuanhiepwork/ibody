import express from 'express'
import bodyParser from 'body-parser'
import session, { auth } from 'server/http/middleware/session.js'
import ctx from "core"

const router = express.Router()
router.post(
    "/",
    session,
    bodyParser.json(),
    async (req, res) => res.json(await ctx.asUserId(auth.getUser(req).id).call(...req.body)))

export default router
