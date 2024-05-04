var express=require("express")
var route=express.Router()
var exe=require("./connection")

function check_admin(req,res,next){
  if(req.session.admin_id==undefined){
    res.redirect("/admin/login")
  }
  if(req.session.admin_id!= undefined){
    next()
}
}

route.get("/",check_admin,async function(req,res){
    var contact_form=await exe(`SELECT * FROM contact_form`)
    res.render("admin/home.ejs",{"contact_form":contact_form})
})
route.get("/home_detail",check_admin,async function(req,res){
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
route.get("/about",check_admin, async function(req,res){
    var about_detail=await exe(`SELECT * FROM about_detail`)
    var service_list=await exe(`SELECT * FROM service`)
    var interest=await exe(`SELECT * FROM interest`)
    var programming=await exe(`SELECT * FROM programming`)

    res.render("admin/about.ejs",{"about_detail":about_detail,"service_list":service_list,"interest":interest,"programming":programming})
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
route.get("/service_list",check_admin,async function(req,res){
    var service_list=await exe(`SELECT * FROM service`)
    res.render("admin/service_list.ejs",{"service_list":service_list})
})
route.get("/edit/:service_id",check_admin,async function(req,res){
    var service_list=await exe(`SELECT * FROM service WHERE service_id='${req.params.service_id}'`)
    res.render("admin/edit_service.ejs",{"service_list":service_list})
})
route.post("/edit/update_ser",async function(req,res){
    var d=req.body;
    var update_ser=`UPDATE service SET service='${d.service}' WHERE service_id='${d.hidd}'`
    await exe(update_ser)
    res.redirect("/admin/about")
})
route.get("/delete/:id",async function(req,res){
    var sql=`DELETE FROM service WHERE service_id='${req.params.id}'`
    await exe(sql)
    res.redirect("/admin/about")
})
route.post("/intrest",async function(req,res){
    var d=req.body
    var sql=`INSERT INTO interest(interest) VALUES('${d.intrest}')`
    await exe(sql);
    res.redirect("/admin/about")
})

route.get("/edit_interest/:id",async function(req,res){
    var interest=await exe(`SELECT * FROM interest WHERE interest_id='${req.params.id}'`)
    res.render("admin/edit_interest.ejs",{"interest":interest})
})

route.post("/edit_int",async function(req,res){
    var d=req.body;
    await exe(`UPDATE interest SET interest='${d.intrest}' WHERE interest_id='${d.intrest_id}'`)
    res.redirect("/admin/about")
})
route.get("/delete_intrest/:id",check_admin,async function(req,res){
    await exe(`DELETE FROM interest WHERE interest_id='${req.params.id}'`)
    res.redirect("/admin/about")
})
route.post("/save_programming",async function(req,res){
    var d=req.body;
    await exe(`INSERT INTO programming(t_name,percentage) VALUES('${d.t_name}','${d.percentage}')`)
    res.redirect("/admin/about")
})
route.get("/edit_tech/:id",check_admin,async function(req,res){
    var programming=await exe(`SELECT * FROM programming WHERE p_id='${req.params.id}'`)
    res.render("admin/edit_technology.ejs",{"programming":programming})
})
route.post("/edit_programming",async function(req,res){
    var d=req.body;
    await exe(`UPDATE programming SET t_name='${d.t_name}',percentage='${d.percentage}' WHERE p_id='${d.p_id}'`)
    res.redirect("/admin/about")
})
route.get("/delete_tech/:id",check_admin,async function(req,res){
    await exe(`DELETE FROM programming WHERE p_id='${req.params.id}'`)
    res.redirect("/admin/about")
})
route.get("/project",check_admin,async function(req,res){
    var project=await exe(`SELECT * FROM project`)
    res.render("admin/projects.ejs",{"project":project})
})
route.post("/save_project",async function(req,res){
    var d=req.body;
    var img=new Date().getTime()+req.files.img.name;
    req.files.img.mv("public/uploads/"+img)
    await exe(`INSERT INTO project(img,project_link,project_heading,project_disc,project_type,project_date) VALUES ('${img}','${d.link}','${d.heading}','${d.disc}','${d.type}','${d.date}')`)
    res.redirect('/admin/project')
})
route.get("/edit_project/:id",check_admin,async function(req,res){
    var project=await exe(`SELECT * FROM project WHERE project_id='${req.params.id}'`)
    res.render("admin/edit_project.ejs",{"project":project})
})
route.post("/edit_project",async function(req,res){
    var d=req.body;
    if(req.files!=undefined){
        if(req.files.img){
            var img=new Date().getTime()+req.files.img.name;
            req.files.img.mv("public/uploads/"+img)
            await exe(`UPDATE project SET img ='${img}' WHERE project_id='${d.project_id}'`)
        }
    }
    await exe(`UPDATE project SET project_link='${d.link}',project_heading='${d.heading}',project_disc='${d.disc}',project_type='${d.type}',project_date='${d.date}' WHERE project_id='${d.project_id}'`)
    res.redirect("/admin/project")
})
route.get("/delete_project/:id",check_admin,async function(req,res){
    await exe(`DELETE FROM project WHERE project_id='${req.params.id}'`)
    res.redirect("/admin/project")

})
route.get("/contact_info",check_admin,async function(req,res){
    var basic_info=await exe(`SELECT * FROM basic_info`)
    res.render("admin/contact_us.ejs",{"basic_info":basic_info})
})
route.post("/save_basic_info",async function(req,res){
    var d=req.body;
    // await exe(`INSERT INTO basic_info(address,email,mobile) VALUES ('${d.address}','${d.email}','${d.mobile}')`)
    await exe(`UPDATE basic_info SET address='${d.address}',email='${d.email}',mobile='${d.mobile}',map='${d.map}'`)
    res.redirect("/admin/contact_info")
})
route.get("/delete_contact/:id",check_admin,async function(req,res){
   await exe(`DELETE FROM contact_form WHERE c_id='${req.params.id}'`)
    res.redirect("/admin")
})
route.get("/login",function(req,res){
    res.render("admin/login.ejs")
})
route.post("/check_admin",async function(req,res){
    var d=req.body
    var info=await exe(`SELECT * FROM admin WHERE username='${d.username}' AND password='${d.password}'`)
    if(info.length>0){
        req.session['admin_id']=info[0].admin_id;
        res.redirect("/admin")
    }
    else{
        res.redirect('/admin/login')
    }
})
module.exports=route;

// CREATE TABLE home(home_id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(200),position VARCHAR(100),discription VARCHAR(200))
// CREATE TABLE social(social_id INT PRIMARY KEY AUTO_INCREMENT,insta_link TEXT,whatsapp_link TEXT,linkdin_link TEXT,github_link TEXT)
// CREATE TABLE about_detail(about_id INT PRIMARY KEY AUTO_INCREMENT,disc_1 TEXT,disc_2 TEXT,name TEXT,address TEXT,study TEXT,degree TEXT,mail TEXT,phone VARCHAR(13))
//CREATE TBALE service(service_id INT PRIMARY KEY AUTO_INCREMENT,service VARCHAR(200))
//CREATE TBALE interest(interest_id INT PRIMARY KEY AUTO_INCREMENT,interest VARCHAR(200))
// CREATE TABLE programming(p_id INT PRIMARY KEY AUTO_INCREMENT,t_name TEXT, percentage TEXT)
// CREATE TABLE project(project_id INT PRIMARY KEY AUTO_INCREMENT,img TEXT,project_link TEXT,project_heading TEXT,project_disc TEXT,project_type TEXT,project_date TEXT)
// CREATE TABLE basic_info(info_id INT PRIMARY KEY AUTO_INCREMENT,address TEXT,email TEXT,mobile TEXT)