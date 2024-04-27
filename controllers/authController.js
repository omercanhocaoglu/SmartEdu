const User = require('../models/User');
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        status: "success",
        user,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        error,
      });
    }
  };
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      await User.findOne({email}, (err, user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, same) => {
            if (same){
              res.status(200).send('you are logged in!')
            }
            else { res.status(401).send("Invalid password"); } 
          })
        } 
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        error,
      });
    }
  };



  // exports.loginUser = async (req, res) => 
  // { const { email, password } = req.body;
  // try { const user = await User.findOne({ email });
  //  if (user) { const same = await bcrypt.compare(password, user.password);  
  //   if (same) {  res.status(200).send("You are logged in"); } 
  //   else { res.status(401).send("Invalid password"); } } 
  //   else { res.status(404).send("User not found"); } } 
  //   catch (error) { res.status(500).json({ status: "error", error: error.message, }); } };