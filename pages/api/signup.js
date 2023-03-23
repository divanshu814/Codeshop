import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
import CryptoJS from "crypto-js"



const handler= async (req,res)=>{

    if(req.method=='POST'){
        let user=await User.findOne({"email":req.body.email})
        // console.log(user)
        if(user){
            res.status(500).json({success:false,error: "user already exists"})
        }
        const {name,email}=req.body
        let myuser=new User({name,email,password: CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
        await myuser.save()
    res.status(200).json({success: true})
    }
    else{
        res.status(400).json({error: "This method is not allowed"})

    }
 

}
export default connectDb(handler)
