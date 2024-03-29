process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PORT = process.env.PORT || '3000'
process.env.JWT_SECRET = '0a6b944d-d2fb-46fc-a85e-0295c986cd9f'
process.env.MONGO_HOST = process.env.NODE_ENV === 'production' ?
    'mongodb://eir:1234@ds247698.mlab.com:47698/eir' :
    'mongodb://localhost/eir';
process.env.MONGO_PORT = process.env.NODE_ENV === 'production' ?
    '47698' : '27017';
require('babel-register');
require("babel-polyfill");
require('./server');
