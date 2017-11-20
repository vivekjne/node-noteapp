var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Notes = require('../models/notes');
/* GET home page. */
router.get('/', function(req, res, next) {
  Notes.find((err,notes)=>{
    if(err) console.log(err);
    res.render('index',{ notes })
  })
  
});

router.get('/add',function(req,res,next){
  res.render('add');
})


router.post('/add',function(req,res,next){
  var title = req.body.title;
  var note = req.body.note;
 var newNote = new Notes({title:title,note:note});
  newNote.save(function(err){
    if(err){
      console.log(err);
    }
  
  })
  res.redirect('/')
})

router.get('/notes/:id',function(req,res,next){
  Notes.findById(req.params.id,function(err,note){
    if(err){
      console.log(err)
    }else{
      res.render('note',{note:note})
      console.log(note);
    }
  })
})

router.get('/notes/delete/:id',function(req,res,next){
  Notes.findByIdAndRemove(req.params.id,function(err,note){
    if(err){
      console.log(err)
    }else{
    
      console.log(note);
      res.redirect('/')
    }
  })
})

router.get('/notes/edit/:id',function(req,res,next){
  Notes.findById(req.params.id,function(err,note){
    if(err){
      console.log(err)
    }else{
      console.log(note)
      res.render('edit',{ note:note });
    }
  })
})

router.post('/notes/edit/:id',function(req,res,next){
  var title = req.body.title;
  var note = req.body.note;
  var newNote = {title:title,note:note}

  Notes.findByIdAndUpdate(req.params.id,newNote,function(err,note){
    if(err){
      console.log(err)
    }else{
      console.log(note)
      res.redirect('/');
    }
  })
})

module.exports = router;
