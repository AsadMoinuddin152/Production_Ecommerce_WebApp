import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    // Get the data from the request body
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    // Check User
    const existingUser = await userModel.findOne({ email: email });

    //existingUser
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //Register User
    const hashedPassword = await hashPassword(password);

    //Save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //check User
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //return response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
