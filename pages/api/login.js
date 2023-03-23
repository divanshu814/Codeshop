import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
var CryptoJS=require("crypto-js");
var jwt=require('jsonwebtoken')


const handler= async (req,res)=>{



    if(req.method=='POST'){
        let user=await User.findOne({"email":req.body.email})
        const bytes=CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET)
        let decryptedPassword=bytes.toString(CryptoJS.enc.Utf8);
        if(user){
        if(req.body.email==user.email && req.body.password==decryptedPassword){

            var token=jwt.sign({email:user.email,name:user.name}, process.env.AES_SECRET, {expiresIn: "2d"});
            console.log(token);
            let myuser={"token":token, "email":user.email};
            
            res.status(200).json({success:true,token,myuser})
        }
        else{
            res.status(200).json({success: false, error: "Invalid credentials"})
            
        }
        // this bug has been solved, this can be very easily solved and the programme will run very smoothly.
    }
    else{
            res.status(200).json({success: false, error: "User not found. Please signup!"})

        }
    }
    else{
        res.status(400).json({error: "This method is not allowed"})

    }


}
export default connectDb(handler)
