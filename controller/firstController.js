const User=require('./../models/user')
const Subject=require('./../models/subject')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const w=[1,2,3,4]
module.exports.select=(req,res,next)=>{
    res.render('select.ejs')
}
module.exports.home=(req,res)=>{
    res.render('inputForm.ejs')
}

module.exports.homepage=async (req,res)=>{
    const exist=await User.findOne({email:req.body.email})
    if(exist) return res.render('inputForm2.ejs',{message:"Email already exist!!"})
    const hash=await bcrypt.hash(req.body.password, 10)
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
    })
    try{
    const saveduser=await user.save()
    
    const token=jwt.sign({email:user.email},process.env.SECRET_KEY)
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    res.cookie('userName',user.name,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    res.redirect('/api/v1/mainContent')
    next()
    }catch(err){
        res.status(400).json("error")
        console.log(err)
    }

}

module.exports.login=(req,res,next)=>{
    res.status(200).render('loginForm.ejs')
    next()
}

module.exports.homepage2=async (req,res,next)=>{
    const user= await User.findOne({email:req.body.email})
    if (!user) return res.render('loginForm2.ejs',{message:"Email not Found"})

    const password=await bcrypt.compare(req.body.password,user.password)
    console.log(password)
    if(password==false) return  res.render('loginForm2.ejs',{message:"Password is incorrect"})
    
    const token=jwt.sign({email:user.email},process.env.SECRET_KEY)
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    res.cookie('userName',user.name,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    res.redirect('/api/v1/mainContent')
    next()
    // res.status(200).json({status:'success',message:"successfuly loged in"})
}
module.exports.verify=async(req,res,next)=>{
    const cookie=req.cookies['jwt']
    if (!cookie) return res.redirect('/api/v1/login')
    const claims= await jwt.verify(cookie,process.env.SECRET_KEY)
    if (!claims) return res.redirect('/api/v1/login')
    next()

}

module.exports.mainContent= async(req,res,next)=>{
    const userName=req.cookies['userName']
    const subjects=await Subject.find()
    console.log(subjects)
    console.log(userName)
    res.status(200).render('mainContent.ejs',{row:subjects,userName:userName})
    next()
}

module.exports.verifyAdmin=async(req,res,next)=>{
    const name=req.cookies['userName']
    if (name=="admin12345"){
        next()
    }
    else{
        return res.status(400).json({status:'fail',message:'You are not allowrd to do that'})
    }
}