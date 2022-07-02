// DB Config
//const MONGO_USERNAME1 = process.env.MONGO_USERNAME;
//const MONGO_PASSWORD1 = process.env.MONGO_PASSWORD;
//const MONGO_HOSTNAME1 = process.env.MONGO_HOSTNAME;
//const MONGO_PORT1 = process.env.MONGO_PORT;
//const MONGO_DB1 = process.env.MONGO_DB;
//const dbPassword = `mongodb://${MONGO_USERNAME1}:${MONGO_PASSWORD1}@${MONGO_HOSTNAME1}:${MONGO_PORT1}/${MONGO_DB1}?authSource=admin`;

dbPassword = 'mongodb+srv://GIADMIN:'+ encodeURIComponent(process.env.MONGO_ATLAS_PASSWORD) + '@cluster0-xmlrk.mongodb.net/saicdatabase?retryWrites=true&w=majority';
module.exports = {
    mongoURI: dbPassword
};
