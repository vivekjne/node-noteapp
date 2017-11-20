var mongoose = require('mongoose');

var NotesSchema = mongoose.Schema({
    title:String,
    note:String,
    updated_at:{
        type:Date,
        default:Date.now
    }
});

var Notes = mongoose.model('Notes',NotesSchema);

module.exports = Notes;