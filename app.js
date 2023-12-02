const http = require("http");
const express = require('express');
const app = express();
const port = 80;
const path = require("path");
const mongoose = require('mongoose');
//mongoose stuff
mongoose.connect("mongodb://0.0.0.0/store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//schema creation for orders
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  number: String,
  product: String
});
//model making for orders
const order = mongoose.model("order", orderSchema);

//schema creation for contacts
const contactusSchema = new mongoose.Schema({
  name: String,
  email: String,
  complain: String
});
//model making for orders
const contactus = mongoose.model("contactus", contactusSchema);


// pug stuff
app.set("view engine", "pug");
// Express stuff is here
app.use("/static", express.static("static")); // serving static files
app.use(express.urlencoded());

// endpoints
app.get("/", (req, res) => {
  res.render("index.pug");
});
app.get("/about", (req, res) => {
  res.render("about.pug");
});
app.get("/order", (req, res) => {
  res.render("order.pug");
});

app.get("/contact", (req, res) => {
  res.render("contact.pug");
});
//post request

app.post('/order', (req, res) => {
  var orderData = new order(req.body);
  orderData.save().then(() => {
    res.send('items are saved successfully in database');
  }).catch(() => {
    res.status(400).send('items are not saved ')
  })
});


  app.post("/contact", (req, res) => {
    var contactData = new contactus(req.body);
    contactData
      .save()
      .then(() => {
        res.send("items are saved successfully in database");
      })
      .catch(() => {
        res.status(400).send("items are not saved ");
      });
  });



app.listen(port, () => {
  console.log(`app started on ${port}` );
});
