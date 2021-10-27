const Subject=require('./../models/subject')
const mongoose=require('mongoose')

module.exports.create=async(req,res,next)=>{
      const sub=await new Subject(req.body)

      try{
          const savesub=await sub.save()
          res.status(200).json("subject saved")
      }catch(err){
          res.status(401).json(err)
      }
      
}

module.exports.getOne=async(req,res,next)=>{
    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return next()
    const sub=await Subject.findById(req.params.id)
    res.status(200).render('select2.ejs',{sub:sub})
    next()
}

module.exports.getAll=async(req,res,next)=>{

    try{
    const subjects=await Subject.find();
    res.status(200).json({status:'success',quantity:subjects.length,subjects:subjects})
    }catch(err){
        res.status(400).json(err)
    }

}

module.exports.Update=async(req,res,next)=>{
    try{
        const subject=await Subject.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({status:'success'})
    }catch(err){
        res.status(400).json(err)
    }
}
module.exports.Delete=async(req,res,next)=>{

    try{
        const subject=await Subject.findByIdAndDelete(req.params.id)
        res.status(200).json({status:'success'})
    }catch(err){
        res.status(400).json(err)
    }
}


module.exports.assingment=async(req,res,next)=>{
    const sub=await Subject.findById(req.params.id)
    res.status(200).render('assingment.ejs',{sub:sub})
    next()
}

module.exports.notes=async(req,res,next)=>{
    const sub=await Subject.findById(req.params.id)
    res.status(200).render('notes.ejs',{sub:sub})
    next()
}

module.exports.createForm=(req,res,next)=>{
    res.status(200).render('createForm.ejs')
}

