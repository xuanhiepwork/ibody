import ctx from "core"
import express from 'express'

const router = express.Router()

import Template from 'server/lib/template-engine.js'
import landingPage from 'server/http/www-template/landing.js'

import ExpertCard from './ExpertCard.js'

const headTitle = Template.contentOfFile(import.meta.dirname, "headTitle.html"),
    head = Template.contentOfFile(import.meta.dirname, "head.html"),
    content = Template.fromFile(import.meta.dirname, "content.html")

router.use("/", async (req, res, next) => {
    if (req.path !== "/" || (req.method !== 'GET' && req.method !== 'HEAD')) return next()

    const experts = (await ctx.call("Expert", "list", req.query)).result

    const specialtiesOptions = (await ctx.call("ExpertSpecialty", "list")).result.map(es => {
        return `<option value="${es.id}">${es.name}</option>`
    })
    specialtiesOptions.unshift(`<option value=""></option>`)

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(landingPage({
        headTitle,
        head,
        content: content.render({
            expertList: experts.map(ExpertCard.render),
            resultsCount: experts.length,
            specialtiesOptions
        })
    }))

})

export default router

