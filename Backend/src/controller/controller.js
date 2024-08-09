const Conmodel = require("../model/model");
const dbConn = require("../../config/configuration");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const secretKey = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};
const userRegistration = async (req, res) => {
  const { user_name, user_password, user_email } = req.body;
  

  if (!user_name || !user_password || !user_email) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
  
    const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);
    const results = await Conmodel.registerUser(user_name, hashedPassword, user_email);

    if (results && results[0] && results[0][0] && results[0][0][0] && results[0][0][0].message === "Email already exists. Please use a different email.") {
      return res.status(409).json({ 
        success: false,
        error: true,
        message: results[0][0][0].message
      });
    }
      else if (results && results[0] && results[0][0] && results[0][0][0] && results[0][0][0].message === "Username already exists. Please choose a different username.") {
        return res.status(409).json({ 
          success: false,
          error: true,
          message: results[0][0][0].message
        });
    }else{
      res.status(200).json({
        success: true,
        error: false,
        message: "User registered successfully",
        //token: token 
      });
    }

    //const newUser = results; 
    //const secretKeys = secretKey(); 
    //const token = jwt.sign({ p_u_username: newUser.p_u_username, p_u_email: newUser.p_u_email }, secretKeys, { expiresIn: '1h' });


  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + err.message
    });
  }
};




const userLoginDetails = async (req, res) => {
  const { user_email,user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);
    console.log(hashedPassword,"password");
    const results = await Conmodel.userLoginDetails(user_email, hashedPassword);
  

    const user = results[0]; 
    console.log(user[0],"user");
    const secretKeys = secretKey(); 
    const token = jwt.sign({  user_email: user[0][0].user_email, user_password: user[0][0].user_password }, secretKeys);
    if (user[0][0].result === 'Invalid email or password') {
      return res.status(401).json({ 
        success: false,
        error: true,
        message: user[0][0].result
      });
    }else if(user[0][0].result === 'User is not active'){
      return res.status(400).json({ 
        success: false,
        error: true,
        message: user[0][0].result
      });
    }else{
    res.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      user: user[0],
      token: token 
    });
  }
  } catch (err) {
    console.error("Error executing login query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + err.message
    });
  }
};


module.exports = {
    userRegistration,userLoginDetails
};