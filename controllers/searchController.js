var Client = require('node-rest-client').Client;
var client = new Client();
var cseURL = "https://www.googleapis.com/customsearch/v1?";
var Search = require('../models/search');

exports.search = (req, res, next) => {
  const offset = req.query.offset
  const query = req.query.q
  var URL = getSearchURL(query, offset);
  var search = new Search({
    'search-string': query
  })
  search.save(function(err, response){
    if(err){return next(err)}
    client.get(URL, (data, status) => {
       var items = data.items;
      var resItems = [];
       if(items.length > 0){
           for(var i = 0; i < items.length; i++){
             var resItem = {};
             resItem.URL = items[i].formattedUrl;
             resItem.snippet = items[i].snippet;
             resItem.pageURL = items[i].link;
             resItems.push(resItem);
           }
         res.json(resItems);
       }
      else{
        res.send('No Images found kindly change search query')
      }
    })
  })
}

exports.history  = (req, res, next) => {
  Search.find()
    .limit(10)
    .exec((err, data) => {
    if(err){return next(err)}
    res.json(data);
  })
}

var getSearchURL = function(query, offset=10){
  return (cseURL 
    + "key=AIzaSyA6Wvvh-tWR1n5adTCECsmigJDb1vCpGRs"
    + "&cx=013847067190480741326:nvgzxk8grri"
    + "&q=" + query
   + "&num=" + offset);
}