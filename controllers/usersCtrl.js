import User from "../model/User.js";
import bcrypt from "bcryptjs";

// @description Register user
// @route POST /api/v1/users/register
// @access Private/Admin (only dev can register Admin)

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

// @description Login user
// @route POST /api/v1/users/login
// @access Public

export const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  // Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && await bcrypt.compare(password, userFound?.password)) {
    // same as userFound && userFound.password
    res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
    });
  } else {
    res.json({
      msg: "Invalid login",
    });
  }
};
