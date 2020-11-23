const express = require('express');

const server = express();

const pokemonRouter = require('../routes/pokemon_router.js');

server.use(express.json());
server.use('/api/pokemon', pokemonRouter);

module.exports = server;
