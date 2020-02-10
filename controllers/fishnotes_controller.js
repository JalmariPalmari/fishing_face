const fishnote_model = require('../models/fishnotes-models');
const fishnote_view = require('../views/fishnotes-view');

const get_fishnotes = (req, res, next) => {
    const user = req.user;
    user.populate('fishnotes')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                fish_notes: user.fishnotes
            };
            let html = fishnote_view.fishnotes_view(data);
            res.send(html);
        });
};

const post_delete_fishnote = (req, res, next) => {
    const user = req.user;
    const fishnote_id_to_delete = req.body.fishnote_id;

    //Remove note from user.notes
    const updated_fishnotes = user.fishnotes.filter((fishnote_id) => {
        return fishnote_id != fishnote_id_to_delete;
    });
    user.fishnotes = updated_fishnotes;

    //Remove note object from database
    user.save().then(() => {
        fishnote_model.findByIdAndRemove(fishnote_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_fishnote = (req, res, next) => {
    const fishnote_id = req.params.id;
    fishnote_model.findOne({
        _id: fishnote_id
    }).then((fishnote) => {
        let data = {
            text: fishnote.text
        };
        let html = fishnote_view.fishnote_view(data);
        res.send(html);
    });
};

const post_fishnote = (req, res, next) => {
    const user = req.user;
    let new_fishnote = fishnotes_model({
        text: req.body.fishnote
    });
    new_fishnote.save().then(() => {
        console.log('fishnote saved');
        user.fishnotes.push(new_fihsnote);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_fishnotes = get_fishnotes;
module.exports.get_fishnote = get_fishnote;
module.exports.post_fishnote = post_fishnote;
module.exports.post_delete_fishnote = post_delete_fishnote;