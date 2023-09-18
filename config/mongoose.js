const mongoose = require("mongoose")

// database configuration
mongoose.connect("mongodb://127.0.0.1:27017/basic")

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'))
