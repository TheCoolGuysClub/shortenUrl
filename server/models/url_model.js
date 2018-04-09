const mongoose = require('mongoose');


const url_schema = mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  shortened_url: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
})

const Url = mongoose.model('Url', url_schema);


module.exports = {Url}
