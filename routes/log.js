const router = require("express").Router();
const User = require("../models/user");
const Exercise = require("../models/exercise");

router.route("/log").get((req, res, next)=> {
  User.findOne({_id: req.query.userId}, (err, userRecord) => {
    if (err) return "error: " + err;
    
   let userLog = {
      _id: userRecord._id,
      username: userRecord.username,
      count: 0,
      log: [],
    };
    
    const filter = {
      from: new Date(req.query.from),
      to: new Date(req.query.to),
      limit: req.query.limit !== undefined ? Number(req.query.limit) : 1000
    }
    
    //Populate exercises in user
    Exercise.populate(userRecord, {path: "exercises"}, (err, exerciseRecord) => {
      if (err) return next(err);
      
      userLog.log = exerciseRecord.exercises
        .sort((a, b) => a.date - b.date)
        .filter((exercise, index)=>{
          const exerciseDate = new Date(exercise.date).getTime();
          // console.log(exerciseDate);
          return (
            exerciseDate > (filter.from != "Invalid Date" ? filter.from.getTime() : 0) &&
            (filter.to != "Invalid Date" ? filter.to.getTime() + 8640000 : Date.now()) &&
            index < filter.limit
          );
        });
      res.json(userLog);
    })
    
 
  });
})

module.exports = router;