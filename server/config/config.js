process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.SEED = process.env.SEED || 'dev-secret-seed';

let urlDB;
if (process.env.NODE_ENV === 'dev') urlDB = 'mongodb://localhost:27017/simertdb'
else urlDB = process.env.MONGO_URI;


process.env.URLDB = urlDB;