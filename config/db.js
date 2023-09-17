const mongoose = require('mongoose');

const initializeDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'contact_management',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connection) {
            console.log("Connected Successfully to the database")
        }
    } catch (error) {
        console.error('Connection Failed', error)
    }
}

module.exports = { initializeDatabase }