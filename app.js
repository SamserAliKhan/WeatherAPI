const exress = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = exress();
app.use(bodyParser.urlencoded({extended: true}))





app.post('/',function(req,res){
    const qur= req.body.city;
    const apikey = "4d6ca974b8ba47fd32c97ebdac99563d";
    const units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+qur+"&appid="+apikey+"&units="+units;
    https.get(url,function(respo){
    respo.on('data',function(data){
        const Data = JSON.parse(data);
        const des = Data.weather[0].description
        const temp = Data.main.temp;
        const imgurl = "https://openweathermap.org/img/wn/"+Data.weather[0].icon+"@2x.png";
        res.write("<h1>Curently the wearher is "+des+"</h1>");
        res.write("<h3>Curently the Temperature is: "+temp+"</h3>");
        res.write("<img src="+imgurl+">");
        res.send();
    })
    })

})


app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})

app.listen(3000,function(){
});