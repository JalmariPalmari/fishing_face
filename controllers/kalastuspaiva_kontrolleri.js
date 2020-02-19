const kalastuspaiva_model = require('../models/kalastuspaiva-model');
const kalastuspaivat_view = require('../views/kalastuspaiva-view');

const get_kalastuspaivat = (req, res, next) => {
    const user = req.user;
    user.populate('kalastuspaivat')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                kalastuspaiva: user.kalastuspaivat
            };
            let html = kalastuspaivat_view.kalastuspaivat_view(data);
            res.send(html);
        });
};

const post_poista_kalastuspaiva = (req, res, next) => {
    const user = req.user;
    const kalastuspaiva_id_poistetaan = req.body.kalastuspaiva_id;

    //Remove note from user.notes
    const paivitetyt_kalastuspaivat = user.kalastuspaiva.filter((kalastuspaiva_id) => {
        return kalastuspaiva_id != kalastuspaiva_id_poistetaan;
    });
    user.kalastuspaiva = paivitetyt_kalastuspaivat;

    //Remove note object from database
    user.save().then(() => {
        kalastuspaiva_model.findByIdAndRemove(kalastuspaiva_id_poistetaan).then(() => {
            res.redirect('/');
        });
    });
};

const get_kalastuspaiva = (req, res, next) => {
    const kalastuspaiva_id = req.params.id;
    kalastuspaiva_model.findOne({  
        _id: kalastuspaiva_id
    }).then((kalastuspaiva) => {
        console.log('kalastuspaivat haettu');
        let data = {
            text: kalastuspaiva.text
        };
        let html = kalastuspaivat_view.kalastuspaiva_view(data);
        res.send(html);
    });
};

const post_kalastuspaiva = (req, res, next) => {
    const user = req.user;
    let uusi_kalastuspaiva = kalastuspaiva_model({
        text: req.body.kalastuspaiva
    });
    uusi_kalastuspaiva.save().then(() => {
        console.log('kalastuspaiva tallennettu');
        user.kalastuspaivat.push(uusi_kalastuspaiva);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_kalastuspaivat = get_kalastuspaivat;
module.exports.get_kalastuspaiva = get_kalastuspaiva;
module.exports.post_kalastuspaiva = post_kalastuspaiva;
module.exports.post_poista_kalastuspaiva = post_poista_kalastuspaiva;
