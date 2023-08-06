const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pleasenameme');

module.exports = mongoose.connection;
