import env from './env.js'
import userPermission from './model/UserPermission.js'


const models = Object.create(null)
const ctx = {
    env,
    userId: 0,
    asUserId: function (userId) {
        const ins = Object.create(ctx)
        ins.userId = userId
        return ins
    },
    hasPerm: function (perm) {
        return userPermission.userHasPerm(this, perm)
    },
    exec: async function (modelId, actionName, ...args) {
        let model
        try {
            model = models[modelId] || (models[modelId] = (await import("./model/" + modelId + ".js")).default)
        } catch (error) {
            if (error.code === 'ERR_MODULE_NOT_FOUND') {
                throw (new Error(`Model ${modelId} not found!`))
            }
        }

        if (!model) {
            throw (new Error(`Notfound model ${"./model/" + modelId + ".js"} !`))
        }

        if (typeof model[actionName] !== 'function') {
            throw (new Error(`Action ${modelId}.${actionName} is not a function!`))
        }

        return model[actionName](this, ...args)
    },
    call: async function (...args) {
        try {
            return {
                code: "ok",
                result: await this.exec(...args)
            }
        } catch (error) {
            console.error(error)
            return {
                code: error.code || "error",
                error: error.message,
            }
        }
    }
}

export default ctx
