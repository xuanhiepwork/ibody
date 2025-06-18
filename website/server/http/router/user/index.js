import express from 'express'

const router = express.Router()

// request user logged in
import session, { auth } from 'server/http/middleware/session.js'
router.use(session, async (req, res, next) => {
    const sessionUser = auth.getUser(req)
    if (!sessionUser) return res.redirect("/")
    return next()
})

router.use("/profile", (await import('./profile/index.js')).default)
router.use("/message", (await import('./message/index.js')).default)
router.use("/lich-hen", (await import('./lich-hen/index.js')).default)
router.use("/lich-su-goi", (await import('./lich-su-goi/index.js')).default)
router.use("/become-expert", (await import('./become-expert/index.js')).default)
router.use("/ho-tro-user", (await import('./ho-tro-user/index.js')).default)


export default router