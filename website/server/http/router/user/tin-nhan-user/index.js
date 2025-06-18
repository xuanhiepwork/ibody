import express from 'express'

const router = express.Router()

import Template from 'server/lib/template-engine.js'
import landingPage from 'server/http/www-template/landing.js'
router.use("/", (req, res, next) => {
    if (req.path !== "/" || (req.method !== 'GET' && req.method !== 'HEAD')) return next()

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(landingPage({
        headTitle: Template.contentOfFile(import.meta.dirname, "headTitle.html"),
        head: Template.contentOfFile(import.meta.dirname, "head.html"),
        content: Template.contentOfFile(import.meta.dirname, "content.html"),
        footer: "",
    }))
})

export default router

