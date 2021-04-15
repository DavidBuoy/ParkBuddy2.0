const router = require("express").Router();
const { Faves , User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  console.log('post', req.body);
  try {
    const newFave = await Faves.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFave);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Lines 21-45 kept landing on 'catch 500' never loaded data

router.get('/', withAuth, async (req, res) => {
  try {
    const parkData = await Faves.findAll ({ where:{user_id:req.session.user_id},
      include: [
        {
          model: User,
          // attributes: [
          //   "fullName",
          //   "description",
          // ],
        },
      ],
    });
console.log(parkData);
    const favorites = parkData.map(el => el.get({ plain: true }));
    res.render('faves', {
      favorites,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});


// '/api/faves' Displaying correct handlebars

// router.get('/', async (req,res) => {
//   res.render('faves')
// });

module.exports = router;
