import jwt from 'jsonwebtoken';

const authenticate=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    console.log("authHeader:",authHeader);  
    console.log("list:",authHeader.split(' '));     
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if(!token) return res.status(401).json({message:'Authorization token is required'})

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("decoded:",decoded);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({message:'Invalid token'});
    }
};

export default authenticate;
