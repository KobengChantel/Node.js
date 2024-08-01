const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/Users');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// // Define and set the directory where the views are located
// const viewsPath = path.join(__dirname, 'templates', 'views');
// app.set('views', viewsPath);

// // Debug code to verify the views directory path and contents
// console.log('Views Path:', viewsPath);
// console.log('Files in Views Directory:', fs.readdirSync(viewsPath));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Setup session and flash messages
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { weatherData: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data; // Extracting current weather data
        res.render('index', { weatherData, error: null });
    } catch (error) {
        res.render('index', { weatherData: null, error: 'City not found' });
    }
});

// Serve signup page
app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error') });
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/signup');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        req.flash('error', 'Username or email already exists');
        res.redirect('/signup');
    }
});

// Serve login page
app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});

// Handle login form submission
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logged out successfully');
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
