

//express tools and configuring
let express = require("express")
let app = express()
let cors = require("cors") /////to remove later
const multer  = require("multer") 
let bodyParser = require('body-parser')
let cookieParser = require("cookie-parser")
let mongodb = require("mongodb").MongoClient  ///mongodb atlas
let { ObjectID } = require("bson") 
let fs = require("fs")

app.use(cookieParser())
app.use(cors())    /////to remove 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
require("dotenv").config()


app.use(express.static("./public-imgs"))
app.use("/", express.static("./home"))
app.use("/map", express.static("./map"))

app.use("/donors", express.static("./donors"))
app.use("/blog", express.static("./blog"))

app.use("/admin",(req, res, next)=>{
    if(req.cookies.tModeAuth){
        ////send the full page
        console.log(req.cookies.token)
        if(req.cookies.tModeAuth == process.env.MODEAUTH){
            console.log("will send the full page")
            next()
        }else{
            console.log("the else one")
        }
    }else{
        ////send the cred making 
        res.send(`    <input type="text" name="" id="em" placeholder="em">
        <button onclick="fetch('/checkmode', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                em: document.querySelector('#em').value,
            })
        })
    ">send</button>
    `)
    }
}, express.static("./admin"))



app.post('/admin/makeblog', (req, res)=>{
    ////connect to db
})


app.listen(process.env.PORT || 2100, ()=>console.log(`listening on port 2100`))

