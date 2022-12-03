const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const Handlebars = require("express-handlebars");

const cors = require('cors')
const db = require('./database/database')

const setUpPassport = require("./setuppassport");
const routes = require("./routes");

const app = express();
mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.use(cors());

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.engine('.hbs', Handlebars.engine({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require("./utils/handlebars_helpers.js")
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.post('/pontos', db.addPonto)
app.get('/getPonto', db.getPonto)
app.delete('/getPonto', db.removePonto)
app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
