const mongoose = require("mongoose");

const DetailSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  // _userId:{
  //     type: mongoose.Types.ObjectId,
  //     required: true

  // }
  _dashboardId: {
    type: mongoose.Types.ObjectId,
    required: true	
  }
});

const Detail = mongoose.model("Detail", DetailSchema);

module.exports = { Detail };
