const Auth = require("../models/Auth");

const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email"
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const certificate = async (req,res,next)=>{
  
  try {
    const user = req.user;

    const data = await Certificate.findOne({ userId: user.userId })
    
    return res.json(data.ipfs.certificate.url);
  } catch (error) {
    next(error);
  }
}
module.exports = { profile,certificate };
