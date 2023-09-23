var express = require('express');
var app = express();

app.set("view engine","ejs");

app.get("/",(req,res)=>{
	res.render("home");
});
app.get("/homenav", (req,res) => {
	res.render("home");
})
app.get("/about", (req,res) => {
	res.render("about");
});
app.get("/aboutnav", (req,res) => {
	res.render("about");
})

app.get("/contact", (req,res) => {
	res.render("contact");
});
app.get("/contactnav", (req,res) => {
	res.render("contact");
})
app.get("/signup", (req,res) => {
	res.render("sign");
});
app.get("/signupnav", (req,res) => {
	res.render("sign");
})
app.get("/login", (req,res) => {
	res.render("login");
});
app.get("/loginnav", (req,res) => {
	res.render("login");
})
app.get("/feedback", (req,res) => {
	res.render("feedback");
});
app.get("/feedbacknav", (req,res) => {
	res.render("feedback");
})
app.get("/products", (req,res) => {
	res.render("products");
});
app.get("/productsnav", (req,res) => {
	res.render("products");
})

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.get('/sigupSubmit', function(req, res){
    db.collection("users_details").add({
        name: req.query.name,
        email:req.query.email,
		phone:req.query.phone,
        pswd: req.query.password
    }).then(()=>{
		res.render('login');
	})
})
app.get('/loginSubmit', function(req, res){
    const emil = req.query.email;
    const pass = req.query.password;
    db.collection("users_details")
        .where("email", "==", emil)
        .where("pswd", "==", pass)
        .get()
        .then((docs) => {
            if(docs.size>0){
               res.render('success');
            }else{
                res.render('fail');
            }
        });
});
app.get('/feedSubmit', function(req, res){
    db.collection("users_feedback").add({
        name: req.query.name,
        email:req.query.email,
		phone:req.query.phone,
        rev: req.query.review
    }).then(()=>{
		res.render('thankyou');
	})
});
app.listen(3000);