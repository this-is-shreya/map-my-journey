const userSchema = require("../models/user")
const validator = require("email-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports.login = async(req,res)=>{

try{
    const data = await userSchema.find({email:req.body.email})
    if(data.length == 0){
        return res.status(404).json({
            success:false,
            message:"No account with this email ID exists",
        })
    }
    else if(data[0].email == "admin@admin.com" && req.body.password == data[0].password){
        const token = jwt.sign(
            { id: data[0]._id,
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: "10d",
            }
          )
        return res.status(200).json({
            success:true,
            message:"Logged in successfully",
            data:data,
            token:token
        })
    }
    bcrypt.compare(req.body.password, data[0].password, function(err, result) {

        if(result){
            
            const token = jwt.sign(
                { id: data[0]._id,
                },
                process.env.JWT_TOKEN,
                {
                  expiresIn: "10d",
                }
              )
            return res.status(200).json({
                success:true,
                message:"Logged in successfully",
                token:token,
                data:data
            })
        }
        
        else{
            return res.status(400).json({
                success:false,
                message:"Incorrect password",
            })
        }
    });
    
        
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal server error "+error,
        data:null
    })
}
}

module.exports.signUp = async(req,res)=>{

try{
    console.log(req.body);
    const user = await userSchema.find({email:req.body.email})
    if(user.length != 0){
        return res.status(403).json({
            success:false,
            message:"Account with this email already exists",
        })
    }
    else{
        if(validator.validate(req.body.email)){
                bcrypt.hash(req.body.password, 10,async function(err, hash) {
                const data = new userSchema({
                    email:req.body.email,
                    password:hash,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name
                    
                })
        
                await data.save()
                
                const token = jwt.sign(
                    { id: data._id,
                    
                    },
            
                    process.env.JWT_TOKEN,
                    {
                      expiresIn: "10d",
                    }
                  )
                return res.status(200).json({
                    success:true,
                    message:"user signed up successfully",
                    token:token
                })
            })

                
           
            
        }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid email ID"
        })
    }

        
        
    }
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal server error "+error,
        data:null
    })
}
}

module.exports.logout = async(req,res)=>{
    try{
        res.clearCookie("jwt_token");
        return res.status(200).json({
        success: true,
        message: "Logout successful",
        data: null,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}