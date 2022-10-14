const express=require("express");
const app=express();

var items=[];

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended:false}))

app.get("/",function(req,rep){
    list=new Array
    // rep.sendFile(`${__dirname}\\index.html`)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    today=today.toLocaleDateString("en-US", options);
    // console.log(today);
    rep.render("index",{showdate:today,list_of_work:items});
   
        
        // rep.sendFile(``)

});

app.get("/:id",function(req,rep){
    del_id=req.params.id;
    console.log(del_id);
    if(del_id==0){
        items.shift();
    }
    else{
        items.splice(del_id,del_id);
    }
    console.log(items);
    rep.redirect("/");
});

app.post("/",function(req,rep){
     item=req.body.add_text;
     time=req.body.start_time;
     items.push(`Task -: ${item}   |   Start Time -: ${time} `);
     rep.redirect("/");
});

// if you want to change HTML content based on request rep.sendFile() is very painfull becoz you have to create mutiple HTMl files so we do ` Template in Node js `.


app.listen(3000,function(){
    console.log("Server is running at 3000....")
});