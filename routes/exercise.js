
const router = require("express").Router();
const Exercise = require("../models/exercise");
const User = require("../models/user");


router.route("/add").post( async (req, res)=> {
  try {
    //Must exist user can add exercise
    const user = await User.findOne({_id: req.body.userId});
    if(user) {
      
       //Remove empty string from date to trigger default value to work in Exercise mongoose Schema, otherwise defautlt will not works, it will not works on null but works on undefined
      if (req.body.date === "") req.body.date = undefined;
      
      const exercise = await new Exercise(req.body);
      
      exercise.save((err, exerciseRecord)=>{
        if(err) return "error: " + err;
        
        //Add new exercise record to the user
        user.exercises.push(exercise);
        
        //Populate exercises in user
        Exercise.populate(user, {path: "exercises"});
        
        //Save user data
        user.save((err, userRecord)=>{
          if(err) return "error: " + err;
          res.json(userRecord);
        })
      })

      
//       //save exercise data
//       user.save()
      
//       user.save
//       res.json("hasUser");
    } else {
      res.json("noUser");
    }

  } catch(err) {
    res.status(404).json("error: " + err);
  }

});

module.exports = router;