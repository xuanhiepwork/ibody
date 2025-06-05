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
    rpc: async function (modelId, action, ...args) {
        const model = models[modelId] || (models[modelId] = await import("./model/" + modelId + ".js"))
        return model[action](this, ...args)
    }
}

export default ctx