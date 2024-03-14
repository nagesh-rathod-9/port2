var express=require("express")
var route=express.Router()
var exe=require("./connection")

route.get("/",function(req,res){
    res.render("admin/home.ejs")
})
route.get("/home_detail",async function(req,res){
    var data=await exe(`SELECT * FROM home`);
    var social=await exe(`SELECT * FROM social`);

    res.render("admin/home_data.ejs",{"data":data[0],"social":social[0]})
})
route.post("/home_data",async function(req,res){
    if(req.files){
        var image1=new Date().getTime()+req.files.image1.name;
        req.files.image1.mv("public/"+image1);
        // var image2=new Date().getTime()+req.files.image2.name;
        // req.files.image2.mv("public/"+image2);
        var sql=`UPDATE home SET image1='${image1}'`
        await exe(sql)
    }
    var d=req.body;
    var sql=`UPDATE home SET name='${d.name}',position='${d.position}',discription='${d.discription}'`
    await exe(sql)
    res.redirect("/admin/home_detail")
})
route.post("/social_link",async function(req,res){
    var d=req.body;
    var sql=`UPDATE social SET insta_link='${d.r}',whatsapp_link='${d.whatsapp}',linkdin_link='${d.linkdin}',github_link='${d.github}'`;
    await exe(sql)
    res.redirect("/admin/home_detail")
})
route.get("/about", async function(req,res){
    var about_detail=await exe(`SELECT * FROM about_detail`)
    res.render("admin/about.ejs",{"about_detail":about_detail})
})
route.post("/save_about",async function(req,res){
    var d=req.body;
    var sql=`UPDATE about_detail SET disc_1='${d.disc1}',disc_2='${d.disc2}',name='${d.name}',address='${d.address}',study='${d.study}',degree='${d.degree}',mail='${d.mail}',phone='${d.phone}'`
    await exe(sql)
    res.redirect("/admin/about")
})
route.post("/save_service",async function(req,res){
    var d=req.body
    var sql=`INSERT INTO service(service) VALUES('${d.service}')`
    await exe(sql)
    res.redirect("/admin/about")
    
})
route.get("/service_list",async function(req,res){
    var service_list=await exe(`SELECT * FROM service`)
    res.render("admin/service_list.ejs",{"service_list":service_list})
})
route.get("/edit/:service_id",async function(req,res){
    var service_list=await exe(`SELECT * FROM service WHERE service_id='${req.params.service_id}'`)
    res.render("admin/edit_service.ejs",{"service_list":service_list})
})
route.post("/edit/update_ser",async function(req,res){
    var d=req.body;
    var update_ser=`UPDATE service SET service='${d.service}' WHERE service_id='${d.hidd}'`
    await exe(update_ser)
    res.redirect("/admin/service_list")
})
route.get("/delete/:id",async function(req,res){
    var sql=`DELETE FROM service WHERE service_id='${req.params.id}'`
    await exe(sql)
    res.redirect("/admin/service_list")
})
route.post("/intrest",async function(req,res){
    var d=req.body
    var sql=`INSERT INTO interest(interest) VALUES('${d.intrest}')`
    await exe(sql);
    res.redirect("/admin/about")
})
route.get("/interst_list",async function(req,res){
    res.render("admin/interest.ejs")
})
module.exports=route;

// CREATE TABLE home(home_id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(200),position VARCHAR(100),discription VARCHAR(200))
// CREATE TABLE social(social_id INT PRIMARY KEY AUTO_INCREMENT,insta_link TEXT,whatsapp_link TEXT,linkdin_link TEXT,github_link TEXT)
// CREATE TABLE about_detail(about_id INT PRIMARY KEY AUTO_INCREMENT,disc_1 TEXT,disc_2 TEXT,name TEXT,address TEXT,study TEXT,degree TEXT,mail TEXT,phone VARCHAR(13))
//CREATE TBALE service(service_id INT PRIMARY KEY AUTO_INCREMENT,service VARCHAR(200))
//CREATE TBALE interest(interest_id INT PRIMARY KEY AUTO_INCREMENT,interest VARCHAR(200))
