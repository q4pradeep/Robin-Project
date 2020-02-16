// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/VWDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("Connected to Database");
}).catch((e) => {
    console.log("Error");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

module.exports = {
    mongoose
};