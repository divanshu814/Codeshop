import Forgot from "@/models/Forgot"
import User from "@/models/User"

export default function handler(req, res) {

    // check if the user exists in the database
    // send an email to the user
    if(req.body.sendMail){
    let token=`lkdskhfsiufhaidsfdjaifahfods`
    let forgot =new Forgot({
        email: req.body.email,
        token: token
    })
    let email=`We have sent you this email in response to your request to reset your password no codeswear.com
    to reset your password, please follow the link below:
    <a href="https://codeswear.com/forgotpassword?token=${token}">Click here to reset your password</a>

    we recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My account Page and change your password.

    `
}
else{
    
}

res.status(200).json({success: true })
  }



  