import { join } from 'node:path'
import { readFileSync } from 'node:fs'


const R = /({{\s*\S+?\s*}})/g

class Template {
    static fromFile() {
        return new Template(readFileSync(join(...arguments), { encoding: 'utf8' }))
    }

    static contentOfFile() {
        return readFileSync(join(...arguments), { encoding: 'utf8' })
    }

    constructor(raw) {
        this.raw = raw
    }

    render(obj = {}) {
        return this.raw.replace(R, placeholder => {
            return obj[placeholder.slice(2, -2).trim()] || ""
        })
    }

    toString(obj) {
        return this.render(obj)
    }
}


export default Template