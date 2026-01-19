import jwt from "jsonwebtoken"


const authMiddleware = async(req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:"Not Authorized login again"})
    }

    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = token_decode.id;
        next(); 
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    

    }







export default authMiddleware;