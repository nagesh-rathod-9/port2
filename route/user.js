var express=require("express")
var route=express.Router();
var exe=require("./connection")

route.get("/",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)
    res.render("user/home.ejs",{"home_data":home_data,"social":social,"social":social})
})
route.get("/about",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)
    var about_detail=await exe(`SELECT * FROM about_detail`)
    var service=await exe(`SELECT * FROM service`)
    var programming=await exe(`SELECT * FROM programming`)
    var interest=await exe(`SELECT * FROM interest`)
    res.render("user/about.ejs",{"home_data":home_data,"social":social,"about_detail":about_detail,"service":service,"programming":programming,"interest":interest})
})
route.get("/all",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)
    var project=await exe(`SELECT * FROM project`)

    res.render("user/all.ejs",{"home_data":home_data,"social":social,"project":project})
})
route.get("/frontend",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)
    res.render("user/frontend.ejs",{"home_data":home_data,"social":social})
})
route.get("/fullstack",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)

    res.render("user/fullstack.ejs",{"home_data":home_data,"social":social})
})
route.get("/contact",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)
    var basic_info=await exe(`SELECT * FROM basic_info`)
    res.render("user/contact.ejs",{"home_data":home_data,"social":social,"basic_info":basic_info})
})
route.post("/save_contact_form",async function(req,res){
    var d=req.body;
    var date=new Date().getDate()
    var month=new Date().getMonth()+1;
    var year=new Date().getFullYear()
    var today=date+"/"+month+"/"+year

    var hour=new Date().getHours()%12
    var minutes=new Date().getMinutes()+""
    var second=new Date().getSeconds()
    var time=(hour<10?'0'+hour:hour)+":"+(minutes<10?'0'+minutes:minutes)+":"+(second<10?'0'+second:second)

    // console.log(time)
    await exe(`INSERT INTO contact_form(Name,Email,subject,Message,date,time) VALUES('${d.Name}','${d.Email}','${d.subject}','${d.Message}','${today}','${time}')`)
    res.redirect('/contact')
    // res.send(req.body)
})
module.exports=route;

// CREATE TABLE contact_form(c_id INT PRIMARY KEY AUTO_INCREMENT,Name VARCHAR(200),Email VARCHAR(200),subject TEXT,Message TEXT)