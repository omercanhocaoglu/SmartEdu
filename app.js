const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();
// Template engine
app.set("view engine", "ejs");
// Global Variable
global.userIN = null;
// Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}));
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
} );
app.use(flash());
app.use(( req, res, next ) =>{
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));
// Connect DB
mongoose.connect('mongodb+srv://omercanhocaoglu:cMvuZUYvdEqUnza1@smartedudbcluster.pvntovo.mongodb.net/?retryWrites=true&w=majority&appName=SmartEduDBCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('db connected succesfully');
});
// Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app started on port: ${port}`);
});
