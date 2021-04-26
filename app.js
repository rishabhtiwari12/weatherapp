const express= require("express");
const app=express();
const https= require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({entended: true}));

app.listen(3000,function(){
    console.log("server started at port 3000");

})
app.get("/",function(req,res){
    
    res.sendFile( __dirname+"/index.html");
})
app.post("/",function(req,res){
    

    
   const query=req.body.cityName;
   const appId="86b3a02a9346dbda373eaa0124874f75";
   const unit="metric";
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+unit+"";
    
   https.get(url,function(response){
    console.log(response.statusCode);
   
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        
        const weatherDescription=weatherData.weather[0].description;
        
        res.write("<h1>The temperature of "+query+" is "+temp+" Degree celsius</h1>");
        res.write("<h3>The weather is currently "+weatherDescription+"</h3>");
        res.send();
    })

    })
 
    
})
