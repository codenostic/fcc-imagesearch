// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
var searchController = require('./controllers/searchController')
var mongoose = require('mongoose');

//connecting to database 
var mongoDB = "mongodb://root:root123@ds143734.mlab.com:43734/search_lib";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('errors', console.error.bind(console, 'connection error:'))

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/api/imagesearch', searchController.search);
app.get('/api/latest/imagesearch', searchController.history);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
