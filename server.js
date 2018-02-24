import mongoose from 'mongoose';
import util from 'util';


// config should be imported before importing any other file
import config from './server/config/config';
import app from './server/config/express';


const debug = require('debug')('express-mongoose-es6-rest-api:index');
const https = require('https');
const fs = require('fs');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912

const options = {
    key: fs.readFileSync('server/config/certs/key.pem', 'utf8'),
    cert: fs.readFileSync('server/config/certs/cert.pem', 'utf8'),
    passphrase: '1234'
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(config.port);

export default app;
