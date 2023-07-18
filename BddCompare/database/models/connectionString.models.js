const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  database: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  }
});

// Unique index define on host, database, password and port simultaneously (uniqueness)
dataSchema.index({ name: 1, host: 1, database: 1, password: 1, port: 1 }, { unique: true });

// Static method to find data by his name
dataSchema.statics.findByDataName = function (dataName) {
  return this.findOne({ name: dataName }).exec();
};

// Model creation
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
