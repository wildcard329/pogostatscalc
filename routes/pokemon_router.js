const router = require('express').Router();

const Pokemon = require('../controllers/pokemon_controller.js');

router.get('/', (req, res) => {
    Pokemon.find()
    .then(pokemon => {
        res.json(pokemon);
    })
    .catch(err => {
        res.status(500).json({ msg: 'Could not find pokemon', err });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Pokemon.findById(id)
    .then(pokemon => {
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ msg: `Could not find pokemon with id ${id}` })
        }
    })
    .catch(err => {
        res.status(500).json({ msg: 'Failed to get pokemon', err });
    });
});

router.post('/', (req, res) => {
    const pokemonData = req.body;

    Pokemon.add(pokemonData)
    .then(pokemon => {
        res.status(201).json(pokemon);
    })
    .catch(err => {
        res.status(500).json({ msg: 'Failed to add new entry.', err })
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Pokemon.findById(id)
    .then(pokemon => {
        if (pokemon) {
            Pokemon.update(changes, id)
            .then(updatedPokemon => {
                res.json(updatedPokemon);
            });
        } else {
            res.status(404).json({ msg: `Could not find pokemon with id ${id}` });
        }
    })
    .catch(err => {
        res.status(500).json({ msg: 'Failed to update pokemon', err })
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Pokemon.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted });
        } else {
            res.status(404).json({ msg: `Could not find pokemon with id ${id}`});
        }
    })
    .catch(err => {
        res.status(500).json({ msg: 'Failed to delete pokemon', err });
    });
});

module.exports = router;
