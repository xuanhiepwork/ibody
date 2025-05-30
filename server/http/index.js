const express = require('express');
const { http } = require("../server")

const path = require('path')
http .use(express.static(path.join(__dirname, "www")))
