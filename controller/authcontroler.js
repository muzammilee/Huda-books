const signupModel =require('../model/signupmodel')
const bcrypt=require('bcrypt')



exports.signupGet=(req,res)=>{
    res.render("signup")
}



const usernameRegex = /^[a-zA-Z0-9_-]{3,12}$/;
const emailRejex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex = /^(?=.*\d)[A-Za-z\d]{5,}$/;


exports.signupPost=async (req,res)=>{
    try{
        const data=req.body
        const {userName,email,password}= data;
        
        const alreadyUserName=await signupModel.findOne({userName:userName})
        const alreadyUserEmail=await signupModel.findOne({email:email})
        
        if(userName==""||email==""||password==""){
            res.status(422).json({message:'Please Provide All Details'})
        }
        else if(!usernameRegex.test(userName)){
            res.status(422).json({message:'Invalid username'})
        }
        else if(!emailRejex.test(email)){
            res.status(422).json({message:'Invalid email address'})
        }
        else if(!passwordRegex.test(password)){
            res.status(422).json({message:'Invalid Password'})
        }
        else if(alreadyUserName){
           
            res.status(422).json({message:'User Name is Already Taken'})
        }
        else if(alreadyUserEmail){
            res.status(422).json({message:'email is Already Taken'})
        }
        
        
        else{
            const saltRounds= 10;
            const hashedpass=await bcrypt.hash(password,saltRounds)
            const newUser=new signupModel({
                userName:userName,
                email:email,
                password:hashedpass,
                registerDate:new Date()
            })
            await newUser.save()
            res.status(200).json({message:'Signup Successful'})
        }
    }catch(err){
        console.log("error on Signup post",err.message);
    }
    
}
