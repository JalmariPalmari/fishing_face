const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

//Controllers
const auth_controller = require('./controllers/auth_controller');
//const fishnotes_controller = require('./controllers/fishnotes_controller');

// vaaditaan kalastupaivan kontrolleri
const kalastuspaiva_kontrolleri = require('./controllers/kalastuspaiva_kontrolleri');


let app = express();

app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

//Serve Static files
app.use('/css', express.static('css'))


//Käyttäjän hallinta
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);


//Hallitaan kaslastusmerkintöjä, varmistetaan käyttäjän kirjautuminen
// app.get('/', is_logged_handler, fishnotes_controller.get_fishnotes);
// app.post('/delete-note', is_logged_handler, fishnotes_controller.post_delete_fishnote);
// app.get('/note/:id', is_logged_handler, fishnotes_controller.get_fishnote);
// app.post('/add-note', is_logged_handler, fishnotes_controller.post_fishnote);

// Kalastuspaivien hallinta


// haetaan kalastuspaivat
app.get('/', is_logged_handler, kalastuspaiva_kontrolleri.get_kalastuspaivat);
// poistetaan kalastuspaiva
app.post('/poista-kalastuspaiva', is_logged_handler,  kalastuspaiva_kontrolleri.post_poista_kalastuspaiva);
// haetaan kalastuspaivan tiedot
app.get('/kalastuspaiva/:id', is_logged_handler,  kalastuspaiva_kontrolleri.get_kalastuspaiva);
// Lisätään kalastuspaiva
app.post('/lisaa-kalastuspaiva', is_logged_handler,  kalastuspaiva_kontrolleri.post_kalastuspaiva);


// Jos sivua ei löydy tulostetaan virheilmoitus
app.use((req, res, next) => {
    res.status(404);
    res.send(`
        page not found
    `);
});

//Shutdown server CTRL + C in terminal
const mongoose_url = 'mongodb+srv://dbadmin:Hd4HIKaSqSybwwXH@cluster0-y7oug.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
});