// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUser, findUserByEmail} = require('../models/userModels');


const generateProdilePic = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://api.dicebar.com/7.x/identification/svg?seed=${randomId}`;
};

const register = async(req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password)
        return res.status(400).json({message:'All fields are required'});

    const existing = await findUserByEmail(email);
    if(existing) return res.status(409).json({message:'Email already registered'});

    const hashed = await bcrypt.hash(password,10);
    const newUser = {
        strUsername:username,
        strEmail:email,
        strPassword:hashed,
        strProfilePicLink: generateProdilePic(),
    }

    await createUser(newUser);
    res.status(201).json({message:'User registered succesfully'});
}

const login = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password)
        return res.status(400).json({message:'All fields are required'});

    const user = await findUserByEmail(email);
    if(!user) return res.status(401).json({message:'User Not Found'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(401).json({message:'Invalid credentials'});

    const token = jwt.sign({id:user.intId}, process.env.JWT_SECRET,{
        expiresIn:'3d',
    });

    res.json({
        token,
        user:{
            id:user.intId,
            username:user.strUsername,
            email:user.strEmail,
            profile_pic:user.strProfilePictureLink
        }
    })
};

module.exports = {
    register,
    login
}