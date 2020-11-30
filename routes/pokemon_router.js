const router = require('express').Router();

const Pokemon = require('../controllers/pokemon_controller.js');

router.get('/', (req, res) => {
    Pokemon.find()
    .then(pokemon => {
        res.json(pokemon);
    })
    .catch(err => {
        res.status(500).json(err.message);
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
        res.status(500).json(err.message);
    });
});

router.post('/', (req, res) => {
    const pokemonData = req.body;

    Pokemon.add(pokemonData)
    .then(pokemon => {
        res.status(201).json(pokemon);
    })
    .catch(err => {
        res.status(500).json(err.message)
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
        res.status(500).json(err.message)
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
        res.status(500).json(err.message);
    });
});

module.exports = router;
