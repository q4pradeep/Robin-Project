const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = { Dashboard }