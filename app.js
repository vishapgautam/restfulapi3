const express=require("express")
const app=express();
const firstRoute=require('./routes/firstRoute')
const subjectRoute=require('./routes/subjectRoutes')
const bodyParser=require('body-parser')
require('dotenv').config()
const cors=require('cors')
const cookieParser=require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.set("view engine","ejs")

app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:[process.env.URL]
}))
app.use(express.static("views"));
app.use(express.static("public"));

app.use('/api/v1/',firstRoute)
app.use('/api/v1/sub/',subjectRoute)

app.listen(process.env.PORT||5000,app,()=>{
    console.log(`server started listining at port ${process.env.PORT}...`)
})
