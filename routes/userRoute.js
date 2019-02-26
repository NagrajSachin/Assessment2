var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var csv = require('csvtojson');
var User = require('../models/masterData');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/csv')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage : storage });

var userrouter = express.Router();
userrouter.use(bodyParser.json());

userrouter.post('/upload', upload.single('file'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json(req.file);
});

userrouter.post('/import', upload.single('file'), (req, res, next) => {
    console.log(req.file);

    csv().fromFile(req.file.path).then((json) => {
        console.log(json);

        for( i = 0; i<json.length; i++)
        {
            User.create({BankId : json[i].BankId, BankBranch : json[i].BankBranch});
        }
    
       // User.create({ file:  })
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(json);
    });
});

module.exports = userrouter;
