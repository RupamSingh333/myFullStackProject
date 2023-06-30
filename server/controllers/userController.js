const User = require("../models/userModal");
const bcryptjs = require("bcryptjs");
const helper = require("../utils/helper");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");
const { ObjectId } = require("mongodb");

//register user
module.exports.register_user = async (req, res) => {
  try {
    const spassword = await helper.createPassword(req.body.password);

    const user = new User({
      name: await helper.capitalizeName(req.body.name),
      email: req.body.email,
      password: spassword,
      type: req.body.type,
      mobile: req.body.mobile,
    });

    // console.log(user); return false;
    if (req.file) {
      user.image = req.file.filename;
    } else {
      user.image = null; // or user.image = "";
    }

    let userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).send({ success: false, message: "User already exists" });
    } else {
      const user_data_save = await user.save();

      await helper.sendEmail(
        user_data_save.email,
        "Thank You for register with us",
        "Hii " + user_data_save.name,
        `<html>
        <body>
          <h2>Thank You for Registering with Us</h2>
          <p>Hi ${user_data_save.name},</p>
          <p>Thank you for registering with our service. We're excited to have you on board!</p>
          <p>Here are your registration details:</p>
          <ul>
            <li>Name: ${user_data_save.name}</li>
            <li>Email: ${user_data_save.email}</li>
            <li>Password: ${req.body.password}</li>
          </ul>
          <p>If you have any questions or need assistance, please feel free to contact us.</p>
          <p>Best regards,</p>
          <p>Your Company</p>
        </body>
      </html>`
        // email content without image attachment
      );

      res.status(200).send({
        success: true,
        data: user_data_save,
        message:
          "Thank you for registering with us, " +
          user_data_save.name +
          "! You have received a verification email. Kindly verify.",
      });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

//login Method
module.exports.user_login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let userExist = await User.findOne({ email: email });

    if (userExist) {
      const passwordMatch = await bcryptjs.compare(
        password,
        userExist.password
      );
      if (passwordMatch) {
        const tokenData = await helper.create_token(userExist._id);
        const userData = {
          _id: userExist._id,
          name: userExist.name.toUpperCase(),
          password: userExist.password,
          image: userExist.image,
          mobile: userExist.mobile,
          role: userExist.role,
          token: tokenData,
        };

        const response = {
          success: true,
          message: "Login Successfully",
          data: userData,
        };
        res.status(200).send(response);
      } else {
        res
          .status(400)
          .send({ success: false, message: "Login details are incorrect" });
      }
    } else {
      res
        .status(400)
        .send({ success: false, message: "Login details are incorrect" });
    }
  } catch (error) {
    res.status(400).send({ sucess: false, message: error.message });
  }
};

//get all users
module.exports.get_users = async (req, res) => {
  try {
    const users = await User.find({});

    // Add the image URL to each user's image property
    const usersWithImageUrls = users.map((user) => {
      return {
        ...user.toObject(),
        image:
          req.protocol + "://" + req.get("host") + "/api/uploads/" + user.image,
      };
    });

    res.status(200).send({
      success: true,
      message: "Authentication",
      data: usersWithImageUrls,
    });
  } catch (error) {
    res.status(400).send({ sucess: false, message: error.message });
  }
};

//update password methode
module.exports.update_password = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const password = req.body.password;

    // Check if any of the fields are empty
    if (!user_id || !password) {
      return res.status(400).json({
        success: false,
        error: "Both user id and password are required.",
      });
    }

    const isValid = await User.findOne({ _id: ObjectId(user_id) });
    if (isValid) {
      const newpassword = await helper.createPassword(password);

      const updateUser = await User.findByIdAndUpdate(
        { _id: ObjectId(user_id) },
        {
          $set: {
            password: newpassword,
          },
        }
      );
      res.status(200).send({
        success: true,
        message: "Password has been update successfully.",
      });
    } else {
      res.status(200).send({ success: false, message: "Invalid user id" });
    }
  } catch (error) {
    res.status(400).send({ sucess: false, message: error.message });
  }
};

// forget password
module.exports.forget_password = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "email are required.",
      });
    }
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const generateToken = randomstring.generate();
      await User.updateOne(
        { email: email },
        {
          $set: {
            token: generateToken,
          },
        }
      );
      console.log(generateToken);
      await helper.sendEmail(
        email,
        "Update Password",
        "We have send mail to your mail kidly check and verify.",
        "<p>Hii " +
          findUser.name +
          ', Please copy the link and <a href="http://localhost:5000/api/reset-password?token=' +
          generateToken +
          '"> Reset your password</a>'
      );

      return res.status(200).json({
        success: true,
        message: "We have send mail to your mail kidly check and verify.",
      });
    } else {
      res.status(200).send({
        sucess: true,
        message: "This email does not exist",
      });
      return false;
    }
  } catch (error) {
    res.status(400).send({ sucess: false, message: error.message });
    return false;
  }
};

//reset passoword
module.exports.reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    const findUser = await User.findOne({ token: token });
    const password = req.body.password;
    if (findUser && password) {
      const newPassword = await helper.createPassword(password);
      const userData = await User.findByIdAndUpdate(
        { _id: ObjectId(findUser._id) },
        { $set: { password: newPassword, token: null } },
        { new: true }
      );

      res.status(200).send({
        sucess: true,
        message: "Password has reset successfully",
        data: userData,
      });
      return false;
    } else {
      res
        .status(400)
        .send({ sucess: false, message: "This Link has been expired" });
      return false;
    }
  } catch (error) {
    res.status(400).send({ sucess: false, message: error.message });
    return false;
  }
};
