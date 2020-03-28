const saaliit_model = require('../models/saaliit-model');
const saaliit_view = require('../views/saaliit-view');
const saaliit_view_paivamaara = require('../views/saaliit-view-paivamaara');


const get_saaliit = (req, res, next) => {
    const user = req.user;
    user.populate('saaliitMongoObject')
        .execPopulate()
        .then(() => {
            console.log('THEN?????')
            console.log('user:', user);
            let data = {
                user_name: user.name,
                // parametri ForEachille
                saaliit_foreach: user.saaliitMongoObject
               // saaliit_foreach: user.kalastuspaivaMongoObject.saaliit
            };
            let html = saaliit_view.saaliit_view(data);
            res.send(html);
        });
};

// const get_saaliit = (req, res, next) => {
//     const user = req.user;
//     user.populate({
//         path:'kalastuspaivaMongoObjects',
//         model: 'user',
//         populate: {
//             path: 'saaliit',
//             model: 'kalastuspaivaMongoModel'
//         }
//       })
//         .execPopulate()
//         .then(() => {
//             console.log('user:', user);
//             let data2 = {
//                 user_name: user.name,
//                 // parametri ForEachille
//                 saaliit_foreach: saaliitMongoModel.saaliit
//                // saaliit_foreach: user.kalastuspaivaMongoObject.saaliit
//             };
//             let html = saaliit_view.saaliit_view(data2);
//             res.send(html);
//         });
// };

const post_poista_saalis = (req, res, next) => {
    const user = req.user;
    const saalis_id_poistetaan = req.body.saaliitMongoObject_id;

    //Poista kalastuspäivä
    const paivitetyt_saaliit = user.saaliitMongoObject.filter((saaliitMongoObject_id) => {
        return saaliitMongoObject_id != saalis_id_poistetaan;
    });
    user.saaliitMongoObject = paivitetyt_saaliit;

    //Poista kalastuspäivä objecti tietokannasta
    user.save().then(() => {
        saaliit_model.findByIdAndRemove(saalis_id_poistetaan).then(() => {
            res.redirect('/saaliit');
        });
    });
};

//Haetaan saliit mongoose schemasta
const get_saaliitpaivamaara = (req, res, next) => {
    const saaliit_paivays = req.params.paivays;
    saaliit_model.findOne({  
        paivays: saaliit_paivays
    }).then((saaliit) => {
        console.log('saaliit haettu');
        let data = {
            
            // paivays: saaliit.paivays,
            // kalalaji: saaliit.kalalaji,
            // paino: saaliit.paivays,
            // saa: saaliit.saa,
            // image_url: saaliit.image_url  
        };
        let html = saaliit_view_paivamaara.saaliitpaivamaara_view(data);
        res.send(html);
    });
};

// selaimen kautta syötetyt parametrit käsitellään kontrollerissa ja työnnetään kalastuspäivän tietoihin
const post_saaliit = (req, res, next) => {
    const user = req.user;
    var date = new Date()
    let uusi_saalis = saaliit_model({
        paivays: date.toDateString(),
        kalalaji: req.body.kalalaji,
        paino: req.body.paino,
        saa: req.body.saa
    });
    uusi_saalis.save().then(() => {
        console.log('saalis tallennettu');
        user.saaliitMongoObject.push(uusi_saalis);
        user.save().then(() => {
            return res.redirect('/saaliit');
        });
    });
};


module.exports.get_saaliit = get_saaliit;
module.exports.get_saaliitpaivamaara = get_saaliitpaivamaara;
module.exports.post_saaliit = post_saaliit;
module.exports.post_poista_saalis = post_poista_saalis;

