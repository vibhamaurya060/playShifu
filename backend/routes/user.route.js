const express=require("express");
const { signup, login, getAllUser } = require("../controllers/user.controller");

const userRouter=express.Router();

userRouter.post("/", signup);
userRouter.post("/", login);
userRouter.get("/", getAllUser);

module.exports=userRouter;