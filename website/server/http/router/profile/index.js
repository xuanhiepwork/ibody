import express from 'express'
import ctx from "core"
import session, { auth } from 'server/http/middleware/session.js'

const router = express.Router()

import Template from 'server/http/www-template/template-engine.js'
import landingPage from 'server/http/www-template/landing.js'


const content = Template.fromFile(import.meta.dirname, "content.html")

router.use("/", session, async (req, res, next) => {
    if (req.path !== "/" || (req.method !== 'GET' && req.method !== 'HEAD')) return next()

    const userId = auth.getUser(req).id
    const user = await ctx.asUserId(userId).call("User", "getData", userId)

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(landingPage({
        headTitle: Template.contentOfFile(import.meta.dirname, "headTitle.html"),
        head: Template.contentOfFile(import.meta.dirname, "head.html"),
        content: content.render({
            user_avatarUrl: user.avatarUrl || "/static/img/default-avatar.jpg",
            user_fullname: user.fullname,
        }),
        footer: "",
    }))
})

export default router

