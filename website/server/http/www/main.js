{
    const rpcOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
    }

    window.rpc = function () {
        const options = Object.create(rpcOptions)
        options.body = JSON.stringify([...arguments])

        return fetch("/rpc", options).then((response) => response.json())
    }
}