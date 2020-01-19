const mongoose = require('mongoose');
class Connection {
	
    static async MongooseConnect() {

        //mongoose connection
        await mongoose.connect(process.env.URI_CONNENT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    }
}

module.exports = Connection;