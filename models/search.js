var mongoose = require('mongoose') 
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
  'search-string': {type: String, required: true},
  updated: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Search', SearchSchema);