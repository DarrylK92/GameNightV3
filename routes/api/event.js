const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Event = require('../../models/Event');

async function closeAutoCloseEvents() {
  let events = await Event.find({ isOpen: true });

  var today = Date.now();

  toUpdateEvents = events.filter(function (obj) {
    return obj.isOpen === true && obj.autoCloseDate < today;
  });

  toUpdateEvents.forEach((event) => {
    event.isOpen = false;
    event.closeDate = today;
    event.save();
  });
}

// @route    GET api/event/all/open
// @desc     Get all open events
// @access   Public
router.get('/all/open/', async (req, res) => {
  try {
    // let events = await Event.find({ isOpen: true }).populate('createdBy', [
    //   'name'
    // ]);
    // .populate({
    //     path: 'games',
    //     populate: {
    //         path: 'game',
    //         model: 'game'
    //     }
    // })
    // .populate({
    //     path: 'votes',
    //     populate: {
    //         path: 'vote',
    //         model: 'vote'
    //     }
    // });

    closeAutoCloseEvents();

    let events = await Event.find({ isOpen: true })
      .populate('createdBy', ['name'])
      .select('-games -votes');

    res.json(events);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
