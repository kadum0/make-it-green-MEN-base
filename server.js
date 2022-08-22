

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
let path = require("path")

// configure some settings
app.set('view engine', 'ejs')


app.use(cookieParser())
app.use(cors())    /////to remove 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
require("dotenv").config()

let cloudinary = require("cloudinary")
const { Console } = require("console")


cloudinary.config({ 
    cloud_name: process.env.CL_NAME, 
    api_key: process.env.CL_API_KEY, 
    api_secret: process.env.CL_SECRET,
    // secure: true 
});



// app.use(express.static("./public"))
app.use('/public', express.static(__dirname + '/public-imgs'))
// app.use(express.static( __dirname +"./public-imgs"))
// app.use(express.static(path.join(__dirname,'./public-imgs')))

app.use("/", express.static("./public"))
app.get("/map-api-key", (req, res)=>{
    res.send({apiKey: process.env.MAPAPIKEY})
})



app.use("/admin",(req, res, next)=>{
    if(req.cookies.tModeAuth){
        ////send the full page
        console.log(req.cookies.token)
        if(req.cookies.tModeAuth == process.env.MODEAUTH){
            console.log("will send the full page")
            next()
        }else{
            console.log("the else one")
            res.cookie = req.cookies.tModeAuth+ '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }else{
        ////send the cred making 
        res.send(`<input style='height: 4rem' type="text" name="" id="em" placeholder="em">
        <button style='height: 4rem' onclick="fetch('/checkmode', {
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

app.post("/checkmode", (req, res)=>{
    console.log("check mode .......",req.body)
    /////check if true auth to give a set the cookie
    if(req.body.em == process.env.MODEAUTH){
        res.cookie("tModeAuth", process.env.MODEAUTH);
        // res.redirect("/mode") ///make a reload instead
        res.redirect(req.get("/admin"))
    }else{
        res.sendStatus(400)
    }
})

/////multer
////multer; article 
///storing paln 
    let articelStoring = multer.diskStorage({
        // destination: './public/articles',
        destination: './articles',
        filename: async (req, file, cb)=>{
            console.log(file)
            articleLink = await new Date().toISOString().replace(/:/g, '-') +file.originalname.replaceAll(" ","")
            cb(null, articleLink)
        }
    })

///filter 

/// general plan
let artilceGeneral = multer({
    storage: articelStoring, 
    // limits: {fileSize: 1024 * 1024}, 
    // fileFilter: fileFilter
})

/////multer; donor; 
let donorStoring = multer.diskStorage({
    destination: './donors',
    filename: async (req, file, cb)=>{
        console.log(file)
        donorLogoLink = await new Date().toISOString().replace(/:/g, '-') +file.originalname.replaceAll(" ","")
        cb(null, donorLogoLink)
    }
})
///filter 
/// general plan
let donorGeneral = multer({
storage: donorStoring, 
limits: {fileSize: 1024 * 1024}, 
// fileFilter: fileFilter
})



/////get map statics 
app.get("/mapStatics", (req, res)=>{


    /////db; 
    mongodb.connect(process.env.MAP, async (err, client)=>{

        let object = {}

        let dbb = client.db()
        object.green = await dbb.collection('con-finished').find().toArray()
        object.red = await dbb.collection('con-unfinished').find().toArray()
        console.log(object)
        res.send(object)
})
})


////blog and post

app.get('/articles', (req, res)=>{
    mongodb.connect(process.env.MAKE, async (err, client)=>{
        let dbb = client.db()
        let found = await dbb.collection("articles").find().toArray()
        console.log(found)
        res.send(found)
})
})

let articleLink
app.post('/makeArticle', (req, res, next)=>{articleLink = null, next()}, artilceGeneral.any(), async (req, res)=>{
    // check if the admin 
    console.log(req.cookies.tModeAuth)
    if(req.cookies.tModeAuth == process.env.MODEAUTH){
        console.log("valid request")
        console.log(req.body)

        ////check if valid data; 
        if(typeof req.body.articleTitle == 'string' && typeof req.body.articleContent == 'string'){
            // cloudinary
            await cloudinary.v2.uploader.upload("./articles/" + articleLink, {folder: 'make-it-green/article/'})
            .then(result=> articleLink = result.secure_url).catch((err)=>console.log(err.message))

            ////db;
            mongodb.connect(process.env.MAKE, async (err, client)=>{
                let dbb = client.db()
                dbb.collection('articles').insertOne({title: req.body.articleTitle, img: articleLink,content: req.body.articleContent})
            })

        }

    }else{
        console.log("not valid request")
    }


})

app.get('/blog/:article', async (req, res)=>{
    console.log(req.params.article)
    let tosearch = req.params.article
    // req.params.article = req.params.article.replace(' ', '-')
    // res.send('./article.html')
    // res.sendfile('./article.html')

    // res.send({'received from': req.params.article})
    let found 

    mongodb.connect(process.env.MAKE, async (err, client)=>{
        let dbb = client.db()

        found = await dbb.collection("articles").findOne({title:tosearch})
        // .find(e=>e.title == req.params.article)
        console.log(found)

let articleData = {}
articleData.title = found.title
articleData.img = found.img
articleData.content = found.content

// console.log(title)

    res.render('article.ejs',{articleData})

})
})



////donors; 
app.get("/donors", async (req, res)=>{
    /////db; 
    mongodb.connect(process.env.MAKE, async (err, client)=>{

        let object = {}
        let dbb = client.db()
        let found = await dbb.collection('donors').find().toArray()
        console.log(found)

        res.send(found)
})
})

let donorLogoLink
app.post("/makeDonor", (req, res, next)=>{donorLogoLink = null, next()}, donorGeneral.any(),async (req, res)=>{


    console.log(req.body)

    // check if valid user; admin (valid)

    //check if valid data; 
    
    if(typeof req.body.donorName == 'string' && typeof req.body.donorWebsite == 'string'){
        ////cloudinary; 

        // await cloudinary.v2.uploader.upload("./public/donors/" + donorLogoLink,
        // {folder: 'samples/'}, result=> donorLogoLink = result.secure_url)
        
        await cloudinary.v2.uploader.upload("./donors/" + donorLogoLink, {folder: 'make-it-green/donors/'})
        .then(result=> donorLogoLink = result.secure_url)

                mongodb.connect(process.env.MAKE, async (err, client)=>{
                let dbb = client.db()
                dbb.collection('donors').insertOne({donorName: req.body.donorName, logo: donorLogoLink, website: req.body.donorWebsite})
            })
    }

})



// mongodb.connect(process.env.MAP, async (err, client)=>{

//     let dbb = client.db()
//     dbb.collection('donors').insertOne({
//         name: 'donorname',
//         // img: ,
//     })
// })






///shared code; 
// mongodb.connect(process.env.MONGOKEY, async (err, client)=>{
//             let dbb = client.db()
// })



app.listen(process.env.PORT || 2100, ()=>console.log(`listening on port 2100`))

