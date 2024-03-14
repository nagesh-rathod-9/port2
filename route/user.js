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
    res.render("user/about.ejs",{"home_data":home_data,"social":social,"about_detail":about_detail,"service":service})
})
route.get("/all",async function(req,res){
    var home_data=await exe(`SELECT * FROM home`)
    var social=await exe(`SELECT * FROM social`)

    res.render("user/all.ejs",{"home_data":home_data,"social":social})
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

    res.render("user/contact.ejs",{"home_data":home_data,"social":social})
})
module.exports=route;