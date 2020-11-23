const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('pokemon');
};

function findById(id) {
    return db('pokemon').where({id}).first();
};

function add(pokemon) {
    return db('pokemon')
    .insert(pokemon, 'id')
    .then((id => {
        return findById(id);
    }));
};

function update(changes, id) {
    return db('pokemon')
    .where({id})
    .update(changes);
};

function remove(id) {
    return db('pokemon')
    .where({id})
    .del();
};
