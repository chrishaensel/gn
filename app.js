const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const fs = require('fs');
const bodyParser = require('body-parser');
const handyUtils = require('handyutils');
// Dot Env File Loader
if (!process.env.PORT) {
  require('dotenv').load();
}
// session storage with mongodb
const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'userSessions',
});
// Configuration for express
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
// App config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'gn',
resave: false, saveUninitialized: false,
maxAge: 9000000, cookie: { secure: false }, store: sessionStore }));
app.use(flash());
app.use(cookieParser('gn'));
// =-=-=-=-=-=-=-=-=-= Keys =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Public key
const publicKey = fs.readFileSync('./keys/public.pub');
// Private Key
const privateKey = fs.readFileSync('./keys/private.pem');
//hold global reference to root folder
// app.locals.root_dir = __dirname;
// =-=-=-=-=-=-=-=-=-= Config vars =-=-=-=-=-=-=-=-=-=-=-=
const port = process.env.PORT || 8080;

// =-=-=-=-=-=-=-=-=-= Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
require('./routes/routes')(app, publicKey, privateKey);
// Start up the Server
const server = app.listen(port, () => {
  if (process.env.DEBUG) handyUtils.debug('Server Active On', port);
});
module.exports = server;
