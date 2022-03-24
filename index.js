const express = require('express');
const app = express();
const formidable = require('formidable');
const sendEmail = require('./sendEmail');
const dotenv = require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
/* app.use(express.urlencoded({ extended: true })) */

//ROUTING
app.get('/', (req, res) => {
    console.log(sendEmail);
    res.render('pages/home');
});
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});
app.get('/receivedmessage', (req, res) => {
    res.render('pages/receivedmessage', { userMessage });
});
app.get('/booking', (req, res) => {
    res.render('pages/booking');
});
app.get('/receivedbooking', (req, res) => {
    res.render('pages/receivedbooking', { userBooking });
});
app.get('/menue', (req, res) => {
    res.render('pages/menue');
});
app.get('/galerie', (req, res) => {
    res.render('pages/galerie');
});
app.get('/notFound', (req, res) => {
    res.render('pages/notFound');
});
app.get('/events', (req, res) => {
    res.render('pages/events');
});
app.get('/team', (req, res) => {
    res.render('pages/team');
});
app.get('/feedback', (req, res) => {
    res.render('pages/feedback');
});

//DatenArrays
const userMessage = [];
const userBooking = [];

//get FormData
app.post('/contact', (req, res) => {
    const form = formidable({ multiples: true });
    console.log('Ich bin in app.post/contact');
    //gib die geschrieben Nachricht zurück plus anderer Satz
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.render('pages/notFound');
        } else {
            const incomingMessage = {
                name: fields.name,
                email: fields.email,
                message: fields.message,
            };
            console.log('Incoming:', incomingMessage);
            userMessage.push(incomingMessage);
            res.redirect('/receivedmessage');
        }
    });
});

app.post('/booking', (req, res) => {
    const form = formidable();

    form.parse(req, (err, fields) => {
        if (err) {
            res.render('pages/notFound');
            return;
        } else {
            const incomingBooking = {
                name: fields.name,
                email: fields.email,
                phone: fields.phone,
                people: fields.people,
                date: fields.date,
                time: fields.time,
            };
            console.log(incomingBooking);
            userBooking.push(incomingBooking);
            sendEmail(incomingBooking);
            res.redirect('/receivedbooking');
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on port:', PORT));
