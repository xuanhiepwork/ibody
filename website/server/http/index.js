import express from 'express'
import { http } from "../server.js"
import { join } from 'path'

http.use(express.static(join(import.meta.dirname, "www")))
