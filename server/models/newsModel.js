// models/News.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true,
  },
  expire: {
    type: Date,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  youtubeurl: {
    type: String,
    // required: true,
  },
  publish: {
    type: Date,
    default: Date.now()
  }
  ,
  active: {
    type: Boolean,
    default: true, // Default active state
  },
  type: {
    type: String,
    required: true
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
