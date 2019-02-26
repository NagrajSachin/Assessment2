const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const FileStore = require('session-file-store')(session);
const authenticate = require('./authenticate');
const app = express();
app.use(morgan('dev'));

const router = require('./routes/agentRoute');
const userrouter = require('./routes/userRoute');

const hostname = 'localhost';
const port = 3000;

const url = 'mongodb://localhost:27017/app1';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('connected to the database');
}, (err)=>next(err));

app.use(session({
    name : 'session-id',
    secret : 'harrypotter',
    saveUninitialized : false,
    resave : false,
    store : new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/agent', router);

function auth(req,res,next) {
    if(!req.user)
    {
        var err = new Error('You are not authenticated1');
        err.status = 403;
        return next(err);
    }
    else
    {
        next();
    }
}

app.use(auth);

app.use('/user', userrouter);

app.listen(port , hostname , (req,res)=>{
    console.log('server listening on ' + hostname + ' ' + port);
});
