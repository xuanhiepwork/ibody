import express from 'express'
import bodyParser from 'body-parser'
import session from 'server/http/middleware/session.js'
import ctx from "core"

const router = express.Router()
router.post(
    "/",
    session,
    bodyParser.json(),
    async (req, res) => res.json(await ctx.asUserId(req.session.userId).call(...req.body)))

export default router
