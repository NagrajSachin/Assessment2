const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    BankId : 
    {
        type : String,  
    },
    BankBranch : 
    {
        type : String,
    },
    file :
    {
        type : String,
    }
},
    {
        timestamps : true
});

module.exports = mongoose.model('user',User);