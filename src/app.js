
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
console.log(__dirname);

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");
const partialPath = path.join(__dirname, "../templetes/partials");

const app = express();
const port = process.env.PORT||3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    info: "Created by Atharva",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    info: "created by atharva",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "help me",
    title: "help",
    info: "created by atharva",
  });
});

app.get("/weather", (req, res) => {

    if(!req.query.address){
      return res.send({
         error:"you must provide adress"
      })
    }

    geocode(req.query.address,(error,geocodeData={})=>{
     
        if(error){
            return res.send({
                error:error,
             })
        }
       forecast(geocodeData.latitude,geocodeData.longitude,(error,forecastData)=>{
           if(error){
             return res.send({
                error: error
            })
           }

           res.send({
            forecast:forecastData,
            location:geocodeData.places,
            address:req.query.address,
           })
       })

        

    })

//   res.send({
//     forecast: "50 degree celius ",
//     location: "burnapur",
//     address : req.query.address,
//   });
});

app.get("/help/*", (req, res) => {
  res.render("404error", {
    title: "404",
    info: "Created by Atharva ",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404error", {
    title: "404",
    info: "Created by Atharva",
    message: "page not found",
  });
});

app.listen(port, () => {
  console.log("web sever hosted");
});
