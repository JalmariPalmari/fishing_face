const note_model = require('../models/note-model');
const note_views = require('../views/note-views');

const get_fishnotes = (req, res, next) => {
    const user = req.user;
    user.populate('fihs_notes')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                fish_notes: user.fish_notes
            };
            let html = note_views.notes_view(data);
            res.send(html);
        });
};

const post_delete_fishnote = (req, res, next) => {
    const user = req.user;
    const fishnote_id_to_delete = req.body.note_id;

    //Remove note from user.notes
    const updated_fishnotes = user.notes.filter((note_id) => {
        return note_id != fishnote_id_to_delete;
    });
    user.notes = updated_fishnotes;

    //Remove note object from database
    user.save().then(() => {
        note_model.findByIdAndRemove(note_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_fishnote = (req, res, next) => {
    const fishnote_id = req.params.id;
    note_model.findOne({
        _id: fishnote_id
    }).then((note) => {
        let data = {
            text: note.text
        };
        let html = note_views.note_view(data);
        res.send(html);
    });
};

const post_fishnote = (req, res, next) => {
    const user = req.user;
    let new_note = note_model({
        text: req.body.note
    });
    new_note.save().then(() => {
        console.log('note saved');
        user.notes.push(new_note);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_fishnotes = get_fishnotes;
module.exports.get_fishnote = get_fishnote;
module.exports.post_fishnote = post_fishnote;
module.exports.post_delete_note = post_delete_fishnote;