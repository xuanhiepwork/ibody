import express from 'express'
import ctx from "core"
import session, { auth } from 'server/http/middleware/session.js'
import bodyParser from 'body-parser'

const router = express.Router()
router.use(session)

router.get("/whoami", async (req, res) => res.json(auth.whoami(req) || {}))

router.post("/login", bodyParser.json(), async (req, res) => {
    const rs = await auth.loginByEmailPassword(
        req,
        req.body?.email,
        req.body?.password,
    )

    if (rs === 'login-success') {
        return res.json({ code: 'login-success' })
    }

    res.json({
        code: 'login-failed',
    })
})

router.post("/logout", async (req, res) => {
    await auth.logout(req)
    res.clearCookie('cookieName');

    res.json({
        code: 'ok',
    })
})


export default router