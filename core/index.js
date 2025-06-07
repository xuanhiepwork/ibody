import ctx from "./app/index.js"

if (process.argv.length > 2) {
    var args = process.argv.slice(2)

    var _ctx = ctx
    if (args[0] === '-u') {
        _ctx = _ctx.asUserId(args[1])
        args = args.slice(2)
    }

    const modelId = args.shift()
    const actionName = args.shift()
    console.log(await _ctx.rpc(modelId, actionName, ...args))
}

export default ctx