const router=require("express").Router();
const fController=require('./../controller/firstController')

router.get('/',fController.select)
router.get('/signup',fController.home)
router.post('/add',fController.homepage)
router.get('/login',fController.login)
router.post('/add2',fController.homepage2)
router.get('/mainContent',fController.verify,fController.mainContent)

module.exports=router