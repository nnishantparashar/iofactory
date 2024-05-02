const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");


exports.register = async (req, res) => {
  try {
    const payload = req.body;
    const hashedValue = await bcrypt.hash(payload.password, 10);
    payload.hashedPassword = hashedValue;
    delete payload.password;
    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        res.status(201).send({
          message: "User has been registered successfully.",
          userId: data._id,
        });
      })
      .catch((error) => {
        return res.status(400).send({
            message:"Error while registering new user.",
            error:error,
        });
      });
  } catch (error) {

    res.status(500).send({
        message: "Internal server Error.",
        error : error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({email:email});

    if (existingUser) {
        const id = existingUser._id.toString();
        const name = existingUser.name;
        const data = {
            id: id,
            email: email,
            name: name,
        };
        const isValidUser = await bcrypt.compare(password, existingUser.hashedPassword);
        if (!isValidUser) {
            return res.status(400).send({
                message: "Invalid credentials.",
            })
        };

        const token = await jwt.sign({_id: existingUser._id }, process.env.SECRET_KEY);

        return res.status(200).send({
            message: "User logged-in successfully.",
            data:data,
            accessToken: token,
        });
    }
  } catch (error) {
    res.status(500).send({
        message: "Internal server Error.",
        error : error,
    });
  }
};

exports.logout = async (req, res) => {
  // token model to create to token which will used for jwt based authentication.
  // destroy jwt from req on logout
  // delete user token from token collection
  try {

    
    return res.status(200).send({
        message: "User logged-out successfully.",
        
    });
  } catch (error) {
    res.status(500).send({
        message: "Internal server Error.",
        error : error,
    });
  }
};


