const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const http = express();
const server = createServer(http);
const io = new Server(server);

module.exports = {
    http,
    io,
    server,
}