const express = require('express');
const session = require('express-session');
const mongooseStore = require('connect-mongo'); // Mongoose session store
const passport = require('passport');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Connect to the database and configure Passport
require('./server/config/db'); // Database connection
require('./server/config/passport'); // Passport configuration

// Configure EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up session management
app.use(session({
    name: 'blog.session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 7, // 7 hours
    },
    store: mongooseStore.create({
        mongoUrl: 'mongodb+srv://gani:qwerty123456@weatherapi.qd1uz2q.mongodb.net/blog?retryWrites=true&w=majority',
        mongooseConnection: mongoose.connection,
        ttl: 7 * 24 * 60 * 60, // 7 days
    }),
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
const ensureNotBlocked = (req, res, next) => {
    if (req.user && req.user.status === 'blocked') {
        req.logout((err) => { // Use a callback function
            if (err) {
                console.error('Logout error:', err); // Handle any logout errors
                return res.status(500).send('Internal server error');
            }
            
            return res.redirect('/login?alert=Your account has been blocked'); 
        });
    } else {
        next(); // Continue if the user is not blocked
    }
};


// Apply middleware to all routes
app.use(ensureNotBlocked);
// Integrate routers
app.use(require('./server/pages/router')); // General page routes
app.use(require('./server/auth/router'));  // Authentication routes
app.use(require('./server/Admin/router')); // Admin routes for managing users

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
