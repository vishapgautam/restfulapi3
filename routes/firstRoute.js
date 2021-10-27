const router=require("express").Router();
const fController=require('./../controller/firstController')

router.get('/',fController.select)
router.get('/signup',fController.home)
router.post('/add',fController.homepage)
router.get('/login',fController.login)
router.post('/add2',fController.homepage2)
router.get('/mainContent',fController.verify,fController.mainContent)
router.get('/reset',fController.resetPage)
router.post('/reset2',fController.reset2)
router.post('/checkCode',fController.checkCode)

module.exports=router