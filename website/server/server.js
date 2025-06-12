import express from 'express'

import { createServer } from 'node:http'
import { Server } from 'socket.io'

const http = express();
http.disable('x-powered-by');

const server = createServer(http);
const io = new Server(server);

export {
    http,
    io,
    server,
}