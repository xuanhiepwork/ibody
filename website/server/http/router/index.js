// lib
import express from 'express'


// #TODO:
const router = express.Router()
router.use("/rpc", (await import('./rpc.js')).default)
// router.use("/file", (await import('./file/index.js')).default)
// router.use("/api", (await import('./api/index.js')).default)
// router.use("/desk", (await import('./desk/index.js')).default)
// router.use("/auth", (await import('./auth/index.js')).default)

export default router