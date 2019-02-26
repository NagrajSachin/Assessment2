var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Agent = require('./models/agentData');

exports.local = passport.use(new localStrategy(Agent.authenticate()));
passport.serializeUser(Agent.serializeUser());
passport.deserializeUser(Agent.deserializeUser()); 