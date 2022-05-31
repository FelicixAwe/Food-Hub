const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileUpload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./server/models/User');


const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressLayouts);


app.use(cookieParser('FoodHubSecure'));
app.use(session({
  secret: 'FoodHubSession',
  saveUninitialized: true,
  resave: true
}))
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//authentication config
//app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
   user = req.user;
  next();
});

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));


// app.post('/register', (req, res) => {
//       User.register({username:req.body.email}, req.body.password, (err, user) => {
//         if(err){
//           console.log(err);
//         }else{
//           passport.authenticate('local')(req, res, ()=> {
//             console.log('========user registered=========')
//             res.redirect('')
//           })
//         }
//       })
// });
//authentication routes
// app.get('/register', (req, res) =>{
//   res.render('register.ejs');
// });
