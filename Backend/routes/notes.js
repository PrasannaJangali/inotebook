const express=require('express');
const router=express.Router();

//using validation from express to check if req.body is valid. Log in required
const { body, validationResult } = require('express-validator');

//import Notes schema
const notes=require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { route } = require('./auth');

//Route:1 get logged in user notes
router.get('/fetchuserdata',fetchUser,async (req,res)=>{
    try {
        const note=await notes.find({user:req.user.id});
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Some error occured'});
    }
})

//Route:2 add logged in user notes.Log in required
router.post('/addnotes',
body('title').isString(),
body('description').isString()
,fetchUser,async(req,res)=>{
    //if there is error thern return error
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag}=req.body;
       const note=await notes.create({
           title,description,tag,user:req.user.id
       })
       const savednote=await note.save();
       res.json(savednote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Some error occured'});
    }
})

//Route:3 to update a note by a logged in user.
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    
   try {
   const {title,description,tag}=req.body;
   const newnote={};
   if(title)newnote.title=title;
   if(description)newnote.description=description;
   if(tag) newnote.tag=tag;
    const note=await notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    
    if(note.user.toString()===req.user.id){
        const update=await notes.findByIdAndUpdate(req.params.id,{$set : newnote},{new:true});
        res.json(update);
    }else{
        res.status(401).json({error:"Access denied"});
    }
   }catch (error) {
    console.log(error);
    res.status(500).json({error:'Some error occured'});
    }
})

//Route:4 to delete a note by logged in user. Log in required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    try {
        const note=await notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()===req.user.id){
            const deleted=await notes.findByIdAndDelete(req.params.id);
            return res.status(200).json(deleted);
        }
        else{
            return res.status(401).json({error:"Access denied"});
        }
    }
    catch (error) {
    console.log(error);
    res.status(500).json({error:'Some error occured'});
    }
})
module.exports=router;