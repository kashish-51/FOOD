 const express = require('express')
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const jwtSecret = "mynameiskashish";

//creating a user

router.post("/createuser", [   //checks for user
 body('email', 'Enter a valid email').isEmail(),
 body('name','Enter a valid name').isLength({min:5}),
 body('password','Enter a valid password').isLength({min:5})
],
async(req, res)=>{
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

const salt = await bcrypt.genSalt(10);          //You can give any value you want
let secPassword= await bcrypt.hash(req.body.password, salt)  //first parameter should be where u want to this hash and second will be the salt


    try {                          // checks whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }  




        await User.create({                     // to take data from the user
            name:req.body.name,
            password : secPassword,             //use secPassword instead of directly passing the value which makes it more secure
            email:req.body.email,
            location: req.body.location,
        })
        res.json({success:true});

    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})


//loging a user

router.post("/loginuser", [   //checks for user
body('email', 'Enter a valid email').isEmail(),
body('password','Enter a valid password').isLength({min:5})
],
async(req, res)=>{
     // If there are errors, return bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    let email = req.body.email;
   try{
       let userData =  await User.findOne({ email })
        if(!userData){
            return res.status(400).json({ error: "Try logging with different credentials" })
        }

const pwdCompare = await bcrypt.compare(req.body.password, userData.password)  //it will check if the original password matches with hash or not

if(!pwdCompare){
    return res.status(400).json({ error: "Try logging with different credentials" })
}


const data = {    //take userid from mongoose to apply token becoz id of a user is always uniques and it is safe to use id
    user:{
        id:userData.id      
    }
}
 
 const authToken = jwt.sign(data,jwtSecret)  //generating auth token with the help of data and secret

        return res.json({success:true, authToken:authToken}) 
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

module.exports = router;
