const router=require("express").Router();
const subjectController=require('./../controller/subController')
const fController=require('./../controller/firstController')


//to create or delete you need to set userName cookie =admin12345
router.post('/create',fController.verifyAdmin,subjectController.create)
router.get('/:id',subjectController.getOne)
router.get('/assingment/:id',subjectController.assingment)
router.get('/notes/:id',subjectController.notes)
router.get('/getAll',fController.verifyAdmin,subjectController.getAll)
router.patch('/update',fController.verifyAdmin,subjectController.Update)
router.delete('/delete',fController.verifyAdmin,subjectController.Delete)
router.get('/createForm',fController.verifyAdmin,subjectController.createForm)

module.exports=router