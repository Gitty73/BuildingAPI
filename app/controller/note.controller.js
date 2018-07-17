const Note = require("../models/note.js");

// CREATE AND SAVE A NOTE

exports.create = (req, res) => {
    
    // validate request
    
    if (!req.body.content){
        return res.status(400).send({
           message: "note content can not be empty"
        });
    }
    
    // create a note
    
    const note = new Note({
       title: req.body.title || "Untitled note",
       content: req.body.content
    });
    
    // save note
    
    note.save()
    .then(data => {
       res.send(data); 
    }).catch(err => {
       if (err)
       return res.status(500).send({
           message: err.message || "Something went wrong while creating note."
       });
    });
};

// RETRIEVE AND RETURN ALL NOTES FROM THE DATABSE

exports.findAll = (req, res) => {
     Note.find()
    .then(notes => {
       res.send(notes); 
    }).catch(err => {
       if (err)
       return res.status(500).send({
           message: err.message || "Something went wrong while retrieving notes."
       });
    });
};

// FIND A SINGLE NOTE WITH A NOTEID

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if (!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
       res.send(note); 
    }).catch(err => {
       if (err.kind === "objectId"){
       return res.status(404).send({
           message: "Note not found with id " + req.params.noteId
       });
      }
        return res.status(500).send({
           message: "Error retrieving note with id " + req.params.noteId
       });
    });
};

// UPDATE A NOTE IDENTIFIED BY THE NOEID IN THE REQUEST

exports.update = (req, res) => {
    
    // validate request
    
    if (!req.body.content){
        return res.status(400).send({
           message: "note content can not be empty"
        });
    }
    
    // find note and update it with the request body
    
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if (!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
       if (err.kind === "objectId"){
       return res.status(404).send({
           message: "Note not found with id" + req.params.noteId
       });
      }
        return res.status(500).send({
           message: "Error updating note with id " + req.params.noteId
       });
    });
};

// DELETE A NOTE IDENTIFIED BY THE NOEID IN THE REQUEST

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if (!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
       if (err.kind === "objectId" || err.name === "NotFound"){
       return res.status(404).send({
           message: "Note not found with id " + req.params.noteId
       });
      }
        return res.status(500).send({
           message: "Could not delete note with id " + req.params.noteId
       });
    });
};
