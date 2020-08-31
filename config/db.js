const mongoose = require('mongoose');
const config = require('config');
const dbUri = config.get('mongoDb.dbUri');

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('ERROR: ', error.message);
        process.exit(1);
    }

}

module.exports = connectDB;