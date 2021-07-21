//import and initialise express
const express = require('express')
const app = express()
const path = require('path')
//initialise database connection as db
//const db = require('./database')
const port = process.env.PORT || 3000

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
//const translationRouter = require('./routes/translation')

app.use('/', homeRouter)
app.use('/home', homeRouter)
app.use('/voiceNote', voiceNoteRouter)
app.use('/checklist', checklistRouter)
app.use('/voicenote_view', voicenoteViewRouter)
app.use('/checklist_update', checklistUpdateRouter)
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

