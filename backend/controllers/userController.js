const UserModel = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const genToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = await UserModel.signup(username, email, password);
    const token = genToken(userId, username);
    res.status(200).json({ AuthValidation: token });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = await UserModel.login(username, password);
    const token = genToken(userId, username);
    res.status(200).json({ AuthValidation: token });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};

const LoadUser = async (req, res) => {
  try {
    const { username, token } = req.body;
    if (username) {
      const inDB = await UserModel.findOne({ username });
      res.status(200).json({
        username: inDB.username,
        id: inDB._id,
        profilePicture: inDB.profilePicture,
      });
    } else if (token) {
      const {userId} = await jwt.verify(token, process.env.SECRET);

      const inDB = await UserModel.findOne({ _id:userId });
      res.status(200).json({
        username: inDB.username,
        userId: inDB._id,
        profilePicture: inDB.profilePicture,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};

const UpdateProfilePicture = async (req, res) => {
  try {
    const { username, profilePicture } = req.body;
    const auth = await UserModel.findOne({ _id: req.userId }); //already verifying the token with middleware
    if (!auth) {
      throw new Error("Not verified.");
    }
    const inDB = await UserModel.findOneAndUpdate(
      { username },
      { profilePicture },
      { new: true }
    );
    res.status(200).json({ inDB });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const UpdateUsername = async (req,res) => {
    try{
        const {username,newUsername} = req.body;
        const doWeHaveUser = await UserModel.findOne({username})
        if(doWeHaveUser._id == req.userId){

            const response = await UserModel.findOneAndUpdate({username},{username:newUsername},{new:true});
            res.status(200).json({response})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const UpdateEmail = async (req,res) => {
    try{
        const {username,newEmail} = req.body;
        const doWeHaveUser = await UserModel.findOne({username})
        if(doWeHaveUser.username == req.username){


            const response = await UserModel.findOneAndUpdate({username},{email:newEmail},{new:true});
            res.status(200).json({response})
        }
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
module.exports = { Signup, Login, LoadUser, UpdateProfilePicture,UpdateUsername,UpdateEmail };