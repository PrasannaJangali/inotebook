const jwt=require('jsonwebtoken');
const JWT_SECRET='white';
const fetchUser=(req,res,next)=>{
    //get user from jwt and append user id as req
    const token=req.header("auth-token");
    if(!token){
        res.status(401).json({error:"Access denied"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"Access denied"});
    }
}

module.exports=fetchUser;