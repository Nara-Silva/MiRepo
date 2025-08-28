// Configuracion basica de la base de datos MongoDB

const mongoose = require('mongoose');

class MongoDBClient {
    static async connect() {
        try {
            const conn = await mongoose.connect((process.env.MONGODB_URI) || 'mongodb://localhost:27017/birbnb');
            console.log(`MongoDB is connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}

module.exports = { MongoDBClient };