const express = require('express')
const app = express()
const port = 3000

const static = require("./app/static")
app.use(static)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})