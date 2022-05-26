const express=require('express');
const router=express.Router();

//import user schema
const users=require('../models/User');

//using validation from express to check if req.body is valid
const { body, validationResult } = require('express-validator');

//using jsonwebtoken to authenticate user
var jwt = require('jsonwebtoken');
const JWT_SECRET='white';
//using bcrypt to secure password;
const bcrypt = require('bcrypt');

//import middleware fetchUser
const fetchUser=require('../middleware/fetchUser');

//Route:1
//end-point for create new user for first time
router.post('/createnewuser',
//express-validation checks
body('Name',"Enter a valid name").isString().isLength({min:3}),
body('Email','Enter a valid email').isEmail(),
body('Password',).isLength({min:5}),

 async (req,res)=>{ 
    const errors=validationResult(req);

    //if the req.body has errors it will be returned from here
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
    //check if there is already a user with the given email
    const a= await users.findOne({Email:req.body.Email});
    if(a){
       return  res.json({
            error:"This email already exists"
        })
    }
    const salt= await bcrypt.genSalt(10);
    const Secpass=await bcrypt.hash(req.body.Password,salt);
    //if email is unique then object is created and add to database
    const b=await users.create({
        Name: req.body.Name,
        Email:req.body.Email,
        Password: Secpass,
      }).catch((err)=>console.log(err));
    
      const data={
          user:{
              id:b.id
          }
      }
      
      const jwtdata= jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken:jwtdata});

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error occured"});
    }
})

//Route:2
//end-point for login of user
router.post('/login',
body('Email').isEmail(),
body('Password').exists(),
async (req,res)=>{
// if there are errors return bad request
const a=validationResult(req);
if(!a.isEmpty()){
    return res.status(400).json({ errors: "invalid user" });
}
try {
    const email=req.body.Email;
    const password=req.body.Password;
    const user=await users.findOne({Email:email});
    if(user){
        const passwordcompare= await bcrypt.compare(password,user.Password);
        if(!passwordcompare){
            return res.status(400).json({errors:"Please login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const jwtdata=jwt.sign(data,JWT_SECRET);
        const success=true;
        res.json({success,authtoken:jwtdata});

    }else{
        return res.status(400).json({errors:"Please login with correct credentials"});
    }
}
catch (error) {
    res.status(500).json({error:"Internal server error occured"})
    console.log(error);
}
})


//Route:3
router.post('/getuser',fetchUser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user=await users.findById(userId).select("-Password");
        res.json(user);
    } catch (error) {
        res.status(500).json({error:"Internal server error occured"})
        console.log(error);
    }
})

module.exports=router; 