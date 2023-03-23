import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
// import { JsonWebTokenError } from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken"
import CryptoJS from "crypto-js";
import { encrypt } from "paytmchecksum";
// var CryptoJS=require("crypto-js")

const handler=async(req,res)=>{
    // console.log("hellos")
    if(req.method=='POST'){
        let token=req.body.token;
        // console.log(token)
        let user=jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser =await User.findOne({email: user.email})
        const bytes=CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let decryptedPass=bytes.toString(CryptoJS.enc.Utf8);
        if(decryptedPass==req.body.password && req.body.npassword==req.body.cpassword){
            // let dbuser=await User.findOneAndUpdate
            let dbuser= await User.findOneAndUpdate({email: user.email},{password: CryptoJS.AES.encrypt(req.body.cpassword,process.env.AES_SECRET).toString()})
            // encrypt(req.body.password, process.env.AES_SECRET).toString()
            res.status(200).json({success: true})
            return
        }
    }
    else{
        res.status(400).json({error: "error"})
    }
}

export default connectDb(handler);