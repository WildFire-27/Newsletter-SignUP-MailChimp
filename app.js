const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req,res) {
  res.sendFile(__dirname+"/signup.html");
});


app.post("/", function (req,res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  var data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]};

const jsonData = JSON.stringify(data);

const url = "https://us4.api.mailchimp.com/3.0/lists/a206cfced7"

const options = {
  method: "POST",
  auth: "shreeya:dac10c5bdc3dd802bca9577a4e84b097-us4"
}

const request = https.request(url, options, function (response) {
if(response.statusCode === 200){
  res.sendFile(__dirname+"/success.html");
}else{
  res.sendFile(__dirname+"/failure.html");
}

 response.on("data", function (data) {
   console.log(JSON.parse(data));

 });
});
request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/"); //routs back to home root
});

app.listen(process.env.PORT || 3000,function () {

  console.log("Server running at port 3000");

});

//mailchimpAPI : dac10c5bdc3dd802bca9577a4e84b097-us4
//a206cfced7 uniq audienc ID
