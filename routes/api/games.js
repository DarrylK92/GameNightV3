const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Game = require('../../models/Game');

// @route    GET api/games/
// @desc     Get all games
// @access   Public
router.get('/', async (req, res) => {
  try {
    let games = await Game.find().populate('ownerId', ['name']).sort('name');

    for (game in games) {
      games[game].initialIsEnabled = games[game].isEnabled;
    }

    res.json(games);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/games/
// @desc     Updates game state on db
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    let games = req.body;

    for (game in games) {
      if (games[game].isEnabled !== games[game].initialIsEnabled) {
        try {
          gameFromDB = await Game.findOneAndUpdate(
            { name: games[game].name },
            {
              $set: {
                isEnabled: games[game].isEnabled
              }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
          );
        } catch (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }

        gameFromDB = await gameFromDB.save();
      }
    }

    res.json(gameFromDB);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
