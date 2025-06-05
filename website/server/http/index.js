import express from 'express'
import { http } from "../server.js"
import { join } from 'path'


// http.use((await import("./router/index.js")).default)
http.use(express.static(join(import.meta.dirname, "www")))
// #TODO: http.use(404)

