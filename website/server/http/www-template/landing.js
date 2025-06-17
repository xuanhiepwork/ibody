import Template from 'server/lib/template-engine.js'



const landingHeaderTpl = Template.fromFile(import.meta.dirname, "langding-header.html")
const landingFooterTpl = Template.fromFile(import.meta.dirname, "langding-footer.html")
const landingTpl = Template.fromFile(import.meta.dirname, "langding.html")

const baseObj = {
    headTitle: 'Ibody - Thấu hiểu đứa trẻ bên trong bạn',
    header: landingHeaderTpl,
    footer: landingFooterTpl,
}

export default obj => landingTpl.render(Object.assign({}, baseObj, obj))
