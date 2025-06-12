import express from 'express'
import session, { auth } from 'server/http/middleware/session.js'
import bodyParser from 'body-parser'

const router = express.Router()
router.use(session)

router.get("/whoami", async (req, res) => {
    res.json({
        code: 'ok',
        whoami: req.session?.whoami
    })
})

router.post("/login", bodyParser.json(), async (req, res) => {
    const rs = await auth.loginByEmailPassword(
        req.session,
        req.body?.email,
        req.body?.password,
    )

    if (rs === 'login-success') return res.json({
        code: 'login-success',
        user: req.session?.whoami?.user,
    })

    res.json({
        code: 'login-failed',
    })
})

export default router