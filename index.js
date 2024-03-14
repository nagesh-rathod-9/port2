var express=require("express")
var app=express()
var bodyparser=require("body-parser")
var upload=require("express-fileupload")
var session=require("express-session")
var userRoute=require("./route/user")
var adminRoute=require("./route/admin")
app.use(bodyparser.urlencoded({extended:true}))
app.use(upload())
app.use(session({
    secret:"nagesh",
    resave:true,
    saveUninitialized:true
}))
app.use("/",userRoute);
app.use("/admin",adminRoute)
app.use(express.static("public/"));
app.listen(1000)
