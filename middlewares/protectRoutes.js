// package init
import expressHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
// Create and export protectRoutes middleware
export const protectRoutes = expressHandler((req,res,next) =>{
    // Get token here...
    const {accessToken} = req.cookies;
    
    // Now validation ...
    if (!accessToken) {
        return res.status(400).json({message : "Authentication required"})
    }

    // Now verify the token...
    jwt.verify(accessToken, process.env.JWT_SECRET, (err,data)=>{
        if (err) {
            return res.status(400).json({message : "Invalid token"});
        }
        next();
    })
});