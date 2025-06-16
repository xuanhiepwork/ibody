const core = { ET: new EventTarget() }
{
    try { core.user = JSON.parse(localStorage.getItem("user")) } catch (e) { }
    if (!core.user) core.user = {}

    core.syncUser = async () => {
        const { user, syncCode } = await (await fetch("/api/Auth/whoami")).json()
        if (user) { localStorage.setItem("user", JSON.stringify(user)) } else localStorage.removeItem("user")
        if (syncCode) { localStorage.setItem("user-syncCode", syncCode) } else localStorage.removeItem("user-syncCode")
        core.ET.dispatchEvent(new Event("syncUser-after"))
    }

    const re = /\s*([^=]+)(=([\S\s]*?))?(;|$)/g
    core.loadCookies = () => {
        const C = core.cookies = Object.create(null), cookie = document.cookie
        re.lastIndex = 0
        var m, v
        while (m = re.exec(cookie)) {
            v = m[3]
            C[m[1]] = v === "" ? true : v
        }
        return C
    }

    core.refresh = () => {
        const syncCode = core.loadCookies().syncCode
        if (syncCode) {
            syncCode = String(syncCode)
            if (syncCode !== localStorage.getItem("user-syncCode")) {
                localStorage.setItem("user-syncCode", syncCode)
                core.syncUser()
            }
        }
    }
}

core.ET.addEventListener("syncUser-after", () => location.reload())
core.refresh()

{
    const rpcOptions = { method: "POST", headers: { 'Content-Type': 'application/json' } }
    core.rpc = () => {
        const options = Object.create(rpcOptions)
        options.body = JSON.stringify([...arguments])
        return fetch("/rpc", options).then((response) => response.json())
    }
}