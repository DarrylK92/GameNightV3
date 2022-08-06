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

module.exports = router;
