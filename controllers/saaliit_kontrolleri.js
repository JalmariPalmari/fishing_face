const saaliit_model = require('../models/saaliit-model');
const saaliit_view = require('../views/saaliit-view');

const get_saaliit = (req, res, next) => {
    const user = req.user;
    user.populate('kalastuspaiva.saaliit')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                saaliis: kalatuspaiva.saaliit
            }; 
            let html = saaliit_view.saaliit_view(data);
            res.send(html);
        });
};

// const post_poista_kalastuspaiva = (req, res, next) => {
//     const user = req.user;
//     const kalastuspaiva_id_poistetaan = req.body.kalastuspaiva_id;

//     //Poista kalastuspäivä
//     const paivitetyt_kalastuspaivat = user.kalastuspaivat.filter((kalastuspaiva_id) => {
//         return kalastuspaiva_id != kalastuspaiva_id_poistetaan;
//     });
//     user.kalastuspaiva = paivitetyt_kalastuspaivat;

//     //Poista kalastuspäivä objecti tietokannasta
//     user.save().then(() => {
//         kalastuspaiva_model.findByIdAndRemove(kalastuspaiva_id_poistetaan).then(() => {
//             res.redirect('/');
//         });
//     });
// };

//Haetaan saliit mongoose schemasta
const get_saaliitmongoose = (req, res, next) => {
    const saaliitmongoose_id = req.params.id;
    saaliit_model.findOne({  
        _id: saaliitmongoose_id
    }).then((saaliit) => {
        console.log('saaliit haettu');
        let data = {
            kalalaji: saaliit.kalalaji,
            paino: saaliit.paino,
            saa: saaliit.sää
        
        };
        let html = saaliit_view.saaliitmongoose_view(data);
        res.send(html);
    });
};

// selaimen kautta syötetyt parametrit käsitellään kontrollerissa ja työnnetään kalastuspäivän tietoihin
const post_saaliit = (req, res, next) => {
    const user = req.user;
    let uusi_saalis = saaliit_model({
        kalalaji: req.body.kalalaji,
        paino: req.body.paino,
        saa: req.body.saa
    });
    uusi_saalis.save().then(() => {
        console.log('saalis tallennettu');
        user.saaliit.push(uusi_saalis);
        user.save().then(() => {
            return res.redirect('/saaliit');
        });
    });
};


module.exports.get_saaliit = get_saaliit;
module.exports.get_saaliitmongoose = get_saaliitmongoose;
module.exports.post_saaliit = post_saaliit;

