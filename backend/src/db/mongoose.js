const mongoose = require("mongoose");

const dbconnecturl = process.env.NOTER_MONGODB_URL;
//connecting to database
mongoose.connect(dbconnecturl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});