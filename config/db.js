const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// DB Config
const db = require('./keys').mongoURI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,            
			useUnifiedTopology: true
		});

		console.log('MongoDB conectado...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;