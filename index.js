const express = require('express');
const app = express();
require('colors')
require('dotenv').config();
// const multer = require('multer');

// Configrations 
const PORT = process.env.PORT||8080;
const MODE = process.env.MODE||'production';
const HOST = process.env.HOST|| '127.0.0.1';

// Configurat EJS 
const ejs = require('ejs')
ejs.openDelimiter = '{';
ejs.closeDelimiter='}'
app.set('view engine', 'ejs')
app.set('views', './views')

// set static folder 
app.use(express.static(path.join(__dirname, 'public')))
// Middlewares
require('express-async-errors')
app.use('/css', express.static('public/css'))
app.use('/images', express.static('public/imgs'))
const session = require('cookie-session')
app.use(session({secret:process.env.SESSION_SECRET || 'secret_key_for_Auth'}))
// connect flash 
app.use(require('connect-flash')())   // req.flash('error', 'Something wrong')  retrive msg req.flash('error')

// parse form data and attach data to req.body
app.use(express.urlencoded({extended:false}))
// Connect to DB 
require('./db')()


// custom middleware 
//  in that way i can see the user, error and succes in my view
// and that way, i can check the user in header , login, register pages
app.use((req, res, next)=>{

   
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    res.locals.user = req.session.user || null
    next()
})

// Routes 
app.use(require('./routes'))

// error Handler 
app.use(require('./middlewares/errorHandler'))


app.listen(PORT, console.log(`Server running on ${MODE} mode at http://${HOST}:${PORT}`.blue.underline))