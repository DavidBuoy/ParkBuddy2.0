const router = require("express").Router();
const { Faves, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("post", req.body);
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



router.get("/data", withAuth, async (req, res) => {
  try {
    const parkData = await Faves.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
        },
      ],
    });

    res.send({ data: parkData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// '/api/faves' Displaying correct handlebars

// router.get('/', async (req,res) => {
//   res.render('faves')
// });

module.exports = router;
