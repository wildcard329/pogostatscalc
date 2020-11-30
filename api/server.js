const express = require('express');
const cors = require('cors');

const server = express();

const pokemonRouter = require('../routes/pokemon_router.js');

server.use(express.json());
server.use(cors())
server.use('/api/pokemon', pokemonRouter);

module.exports = server;
