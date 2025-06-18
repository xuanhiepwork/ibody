import express from 'express'
import ctx from "core"
import session, { auth } from 'server/http/middleware/session.js'

const router = express.Router()

import Template from 'server/lib/template-engine.js'
import landingPage from 'server/http/www-template/landing.js'


const headTitle = Template.contentOfFile(import.meta.dirname, "headTitle.html"),
    head = Template.contentOfFile(import.meta.dirname, "head.html"),
    content = Template.fromFile(import.meta.dirname, "content.html"),
    footer = ""

router.use("/", session, async (req, res, next) => {
    if (req.path !== "/" || (req.method !== 'GET' && req.method !== 'HEAD')) return next()

    const sessionUser = auth.getUser(req)
    if (!sessionUser) return res.redirect("/")

    const userId = sessionUser.id
    const user = (await ctx.asUserId(userId).call("User", "getData", userId)).result

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(landingPage({
        headTitle,
        head,
        content: content.render({
            user_avatarUrl: user.avatarUrl || "/static/img/default-avatar.jpg",
            user_fullname: user.fullname,
        }),
        footer,
    }))
})

export default router
