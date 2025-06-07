import env from './env.js'
import { userHasPerm } from './model/user_perm.js'


const models = {}
const ctx = {
    env,
    userId: 0,
    asUserId: function(userId) {
        const ins = Object.create(ctx)
        ins.userId = userId
        return ins
    },
    hasPerm: function (perm) {
        return userHasPerm(this, perm)
    },
    rpc: async function (modelId, actionName, ...args) {
        let model
        try {
            model = models[modelId] || (models[modelId] = await import("./model/" + modelId + ".js"))
        } catch (error) {
            if (error.code === 'ERR_MODULE_NOT_FOUND') {
                throw(new Error(`Model ${modelId} not found!`))
            }
        }

        if (typeof model[actionName] !== 'function') {
            throw(new Error(`Action ${modelId}.${actionName} is not a function!`))
        }

        return model[actionName](this, ...args)
    }
}

export default ctx
