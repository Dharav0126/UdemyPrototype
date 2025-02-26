require('dotenv').config();
const express= require("express");
const app= express();
const ejs = require("ejs");
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log(process.env.PORT);

// including static files to the server
app.use('/css', express.static(path.join(__dirname, 'CSS')));
app.use('/IMG', express.static(path.join(__dirname, 'IMG')));
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/",(req,res) =>{
    res.render("index.ejs");
});



// starting the application on port in env file
app.listen(process.env.PORT, ()=>{
    console.log("server has started");
});