const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tombByYearSchema = new Schema({
    year: { type: String, required: false },
    numtombs: { type: Number, required: false },
    locationArray: { type: Array, required: false},
    numTombsPerLocation: {type: Object, reqired: false},
    typeArray: { type: Array, required: false },
    numTombsPerType: { type: Object, required: false }
  });

  const TombStatsModel = mongoose.model('tombStats', tombByYearSchema);

  module.exports= TombStatsModel;