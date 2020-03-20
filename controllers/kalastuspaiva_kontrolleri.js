const kalastuspaiva_model = require('../models/kalastuspaiva-model');
const kalastuspaivat_view = require('../views/kalastuspaiva-view');

const get_kalastuspaivat = (req, res, next) => {
    const user = req.user;

    // haetaan user schema ja populeitataan kalastuspaiva objektit
    user.populate('kalastuspaivaMongoObject')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                // parametri ForEachille
                kalastuspaiva_foreach: user.kalastuspaivaMongoObject
               // saaliit_foreach: user.kalastuspaivaMongoObject.saaliit
            };
            let html = kalastuspaivat_view.kalastuspaivat_view(data);
            res.send(html);
        });
};

const post_poista_kalastuspaiva = (req, res, next) => {
    const user = req.user;
    const kalastuspaiva_id_poistetaan = req.body.kalastuspaivaMongoObject_id;

    //Poista kalastuspäivä
    const paivitetyt_kalastuspaivat = user.kalastuspaivaMongoObject.filter((kalastuspaivaMongoObject_id) => {
        return kalastuspaivaMongoObject_id != kalastuspaiva_id_poistetaan;
    });
    user.kalastuspaivaMongoObject = paivitetyt_kalastuspaivat;

    //Poista kalastuspäivä objecti tietokannasta
    user.save().then(() => {
        kalastuspaiva_model.findByIdAndRemove(kalastuspaiva_id_poistetaan).then(() => {
            res.redirect('/');
        });
    });
};

// const get_kalastuspaiva = (req, res, next) => {
//     const kalastuspaiva_id = req.params.id;
//     kalastuspaiva_model.findOne({  
//         _id: kalastuspaiva_id
//     }).then((kalastuspaiva) => {
//         console.log('kalastuspaivat haettu');
//         let data = {
//             paivays: kalastuspaiva.paivays,
//             paikka: kalastuspaiva.paikka,
//             kommentit: kalastuspaiva.kommentit,
        
//         };
//         let html = kalastuspaivat_view.kalastuspaiva_view(data);
//         res.send(html);
//     });
// };

// selaimen kautta syötetyt parametrit käsitellään kontrollerissa ja työnnetään kalastuspäivän tietoihin
const post_kalastuspaiva = (req, res, next) => {
    const user = req.user;
    let uusi_kalastuspaiva = kalastuspaiva_model({
        paivays: req.body.paivays,
        paikka: req.body.paikka,
        kommentit: req.body.kommentit,
        saaliit: req.body.saaliit
    });
    uusi_kalastuspaiva.save().then(() => {
        console.log('kalastuspaiva tallennettu');
        user.kalastuspaivaMongoObject.push(uusi_kalastuspaiva);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_kalastuspaivat = get_kalastuspaivat;
//module.exports.get_kalastuspaiva = get_kalastuspaiva;
module.exports.post_kalastuspaiva = post_kalastuspaiva;
module.exports.post_poista_kalastuspaiva = post_poista_kalastuspaiva;
