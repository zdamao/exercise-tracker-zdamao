const router = require("express").Router();
const User = require("../models/user");

//create new user
router.route('/new-user').post((req, res) => {
    //create new user
     const username = req.body.username;
     const newUser = new User({ username });
  
     newUser.save().then((newUser) => {
       res.json(newUser)
     }).catch(err => {
       res.status(404).json("error: " + err);
     });
});

router.route("/users").get((req, res) => {
  try {
    User.find().then(users => {
      res.json(users);
    })
  } catch(err) {
    res.status(404).json("error: " + err);
  }
})

module.exports = router;