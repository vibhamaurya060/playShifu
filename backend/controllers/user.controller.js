const userModel = require("../models/user.model");

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            res.status(400).json({ msg: "User already signup try to login" });
        }

        const newUser = await userModel.create({ name, email, password, role });
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne(email);
        if (!user) {
            res.status(400).json({ msg: "User not signup try to signup" });
        }
        const data = await userModel.create({ email, password });
        res.status(201).json({ msg: "user login successfully ", data });
    } catch (error) {
      res.status(500).json({msg: "Server error"})
    }
}

const getAllUser=async(req,res)=>{
   try {
    const users=await userModel.find();
    res.status(200).json({msg: "get all users", users})
   } catch (error) {
    res.status(500).json({msg: "server error"})
   }
}

module.exports={signup, login, getAllUser};