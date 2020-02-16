const mongoose = require('mongoose');

const DropmenuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _dashboardId:{
       type: mongoose.Types.ObjectId,
       required: false
    },
       
    _detailId:{
        type: mongoose.Types.ObjectId,
       required: true}
       
})

const Dropmenu = mongoose.model('Dropmenu', DropmenuSchema);

module.exports = { Dropmenu }