import Template from './template-engine.js'



const landingHeaderTpl = Template.fromFile(import.meta.dirname, "langding-header.html")
const landingFooterTpl = Template.fromFile(import.meta.dirname, "langding-footer.html")
const landingTpl = Template.fromFile(import.meta.dirname, "langding.html")

const baseObj = {
    header: landingHeaderTpl,
    footer: landingFooterTpl,
}

export default obj => landingTpl.render(Object.assign(baseObj, obj))
