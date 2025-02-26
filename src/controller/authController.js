const User = require('../models/userModels');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{
    console.log("register called");
    const { name, email, password, c_passwrod, role, profilePhoto} = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // checking if duplicate user exist
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"Email is already registered"});
    }

    // Check if passwords match
    if (password !== c_passwrod) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        profilePhoto
    });
    await newUser.save();
    res.status(201).json({message:"User created Successfully"})
};

const login = async (req,res)=>{
    console.log("login Called");
    const  {email, password} = req.body;
    try {
        console.log("1");
        const user = await User.findOne({email})
        console.log("2");
        if(!user){
            console.log("3");
            return res.status(400).json("User not found");
        }
        console.log("4");
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log("5");
            return res.status(400).json("Password is incorrect");
        }
        console.log("6");
        
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log("7");

        console.log("Login Done");
        res.status(200).json({Message: "Done"});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {register,login}