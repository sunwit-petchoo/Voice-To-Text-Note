//import and initialise express
const express = require('express')
const app = express()
const path = require('path')
//initialise database connection as db
//const db = require('./database')
const port = process.env.PORT || 3000

//authen
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

  // Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.render('pages/index',{
    
}))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) =>{
    res.redirect('/home');
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

//layouts
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('', express.static(path.join(__dirname, 'public')))

//syntax highlighting
const morgan = require('morgan')
app.use(morgan('dev'))


//session setup

// session setup
/* app.use(session({
    cookie: {
        maxAge: 3600000, // 1 hour
        // secure: false, // must be true if served via HTTPS
    },
    name: 'movie_db',
    secret: 'Its a secret!',
    resave: false,
    saveUninitialized: false
})) */



//routes
const homeRouter = require('./routes/home')
const voiceNoteRouter = require('./routes/voicenote')
const checklistRouter = require('./routes/checklist')
const voicenoteViewRouter = require('./routes/voicenote_view')
const checklistUpdateRouter = require('./routes/checklist_update')
const translationRouter = require('./routes/translation')

app.use('/', homeRouter)
app.use('/home', homeRouter)
app.use('/voiceNote', voiceNoteRouter)
app.use('/checklist', checklistRouter)
app.use('/voicenote_view', voicenoteViewRouter)
app.use('/checklist_update', checklistUpdateRouter)
app.use('/translation', translationRouter)
/* app.use('/voicenote_view', voicenoteViewRouter)
app.use('/checklist_update', checklistUpdateRouter)
app.use('/translation', translationRouter) */
//const test2Router = require('./routes/test2')
//app.use('/test2', test2Router)

/* const loginRouter=require('./routes/login')
app.use('/login', loginRouter)

const homepageRouter=require('./routes/homepage')
app.use('/', homepageRouter)

const signupRouter=require('./routes/signup')
app.use('/signup', signupRouter)

const logoutRouter = require('./routes/logout')
app.use('/logout', logoutRouter)

const errorRouter=require('./routes/404')
app.use('*', errorRouter)
 */



app.listen(port, () => {
    console.log(`Voice to text app listening at http://localhost:${port}`)
})

