var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Agent = require('../models/agentData');

var router = express.Router();
router.use(bodyParser.json());

router.post('/signup',(req,res,next)=>{
    Agent.register(new Agent({username: req.body.username}),
    req.body.password, (err, user)=>{
        if(user != null)
        {
            res.statuscode = 500;
            res.setHeader('content-type','application/json');
            res.json({ err : err});
        }
        else
        {
            passport.authenticate('local')(req,res, () => {
                res.statuscode = 200;
                res.setHeader('content-type','application/json');
                res.json({success : true, status : 'Registraton Successful'});
            });
        }
    })
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json');
    res.json({success : true, status : 'successfully logged in'})
});

router.get('/logout', (req,res,next)=>{
if(req.session)
{
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
}
else
{
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
}
});

module.exports = router;