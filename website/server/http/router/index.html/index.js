import Template from 'server/lib/template-engine.js'
import landingPage from 'server/http/www-template/landing.js'


const content = Template.contentOfFile(import.meta.dirname, "content.html")

export default (req, res, next) => {
    if (req.path !== "/" || (req.method !== 'GET' && req.method !== 'HEAD')) return next()

    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(landingPage({
        content
    }))
}