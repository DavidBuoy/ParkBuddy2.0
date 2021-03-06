const router = require('express').Router();
const { Faves, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const faveData = await Faves.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const faves = faveData.map((fave) => fave.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      faves,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  res.render("faves", {
    logged_in: req.session.logged_in,
  });
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/faves');
    return;
  }

  res.render('login');
});

module.exports = router;
