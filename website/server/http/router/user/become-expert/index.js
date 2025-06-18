import express from 'express'
import session, { auth } from 'server/http/middleware/session.js'

const router = express.Router()

import Template from 'server/lib/template-engine.js'
import landingPage from 'server/http/www-template/landing.js'

const headTitle = Template.contentOfFile(import.meta.dirname, "headTitle.html"),
    head = Template.contentOfFile(import.meta.dirname, "head.html"),
    content = Template.contentOfFile(import.meta.dirname, "content.html"),
    footer = ""
router.use("/", (req, res, next) => {
    if (req.path !== "/" || (req.method !== 'GET' && req.method !== 'HEAD')) return next()

    const sessionUser = auth.getUser(req)
    if ((sessionUser.gourps || []).includes("experd")) return res.redirect("/user/profile")

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(landingPage({
        headTitle,
        head,
        content,
        footer,
    }))
})

export default router

