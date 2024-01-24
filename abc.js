const express = require("express")
const app = express()
const cors = require("cors")
const mongoose=require("./mongoose")
app.use(express.json())
app.use(cors())
const ImageModel= require("./blogmodel")
const multer = require("multer")
app.use(express.static("public"))
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,"public/upload/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const upload = multer({ storage: storage}).single("bimage");

app.post("/",(req,res)=>{
    // const data = new student(req.body)
    // const result = await data.save()
    // res.send(result)
    upload(req,res,(err)=>{
        const newimage = new ImageModel({
            bid : req.body.bid,
            bname : req.body.bname,
            bdesc : req.body.bdesc,
            bcat : req.body.bcat,
            bimage:"https://blogapi-56x5.onrender.com/upload/"+req.file.filename
        })
          newimage.save()
        res.send("file uploaded")

    })
})
app.get("/",async(req,res)=>{
 const data = await ImageModel.find()
 res.send(data)
})
app.listen(4000)

