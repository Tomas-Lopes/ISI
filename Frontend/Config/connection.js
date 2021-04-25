const mongoose = require('mongoose');

const URI = "mongodb+srv://root:1234@cluster0.w7ldi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log('Database Connected');
}

module.exports = connectDB;