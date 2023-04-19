import User from "../model/User.js";
import bcrypt from "bcryptjs";

// @description Register user
// @route POST /api/v1/users/register
// @access Private/Admin

export const registerUserCtrl = async (req, res) => {
  const { fullname, email, password } = req.body;
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
    res.json({
      msg: "User already exists",
    });
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User Registerd Successfully",
    data: user,
  });
};
