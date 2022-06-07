const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Event = require('../../models/Event');
const User = require('../../models/User');

async function closeAutoCloseEvents() {
  let events = await Event.find({ isOpen: true });

  var today = Date.now();

  toUpdateEvents = events.filter(function (obj) {
    return (
      obj.isOpen === true &&
      obj.autoCloseDate < today &&
      obj.autoCloseDate !== null
    );
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
    // ])
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

// @route    POST api/event
// @desc     Create an event
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let event;

    if (req.body._id !== '' && req.body._id !== undefined) {
      try {
        event = await Event.findOneAndUpdate(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              autoCloseDate: req.body.date,
              games: req.body.games
            }
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    } else {
      if (req.body.date === undefined) {
        event = new Event({
          name: req.body.name,
          games: req.body.games,
          isOpen: true
        });
      } else {
        event = new Event({
          name: req.body.name,
          autoCloseDate: req.body.date,
          games: req.body.games,
          isOpen: true
        });
      }

      event = await event.save();
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/event/:event_id
// @desc     Get event by event ID
// @access   Public
router.get(
  '/:event_id',
  checkObjectId('event_id'),
  async ({ params: { event_id } }, res) => {
    try {
      let event = await Event.findById(event_id)
        .populate('createdBy', ['name'])
        .populate({
          path: 'games',
          populate: {
            path: 'game',
            model: 'game'
          }
        })
        .populate({
          path: 'votes',
          populate: {
            path: 'vote',
            model: 'vote'
          }
        });

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      res.json(event);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
