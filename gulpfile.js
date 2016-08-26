const gulp = require('gulp');
const child_process  = require('child_process');
const exec = require('child_process').exec;
// const minifyCss = require('gulp-minify-css');
const nodemon   = require('gulp-nodemon');
const moment = require('moment');
// const UserAccount = require('./models/account');
// const OfficeHours = require('./models/officeHours');
// const Courses = require('./models/courses');
// Dot Env File Loader
// if(!process.env.PORT){
// 	let dotenv = require('dotenv').load();
// }
// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});
// Create keys and store them in the right folder
gulp.task('genRSAKeys', function() { 
  exec('openssl genrsa -out ./keys/private.pem 1024 && openssl rsa -in ./keys/private.pem -pubout > ./keys/public.pub', function(err,stdout,stderr){
    console.log(stdout);
  });
});
//Add a test user for an Admin
gulp.task('create-admin-test-user', function(done) {

    UserAccount.createUser({
    "email" : "admin@fullsail.com",
    "password" : "admin",
    "firstName" : "Admin",
    "lastName" : "Tester",
    "phone" : "999999999",
    "admin" : true,
    "idNumber" : 6231231,
    "userId" : 90123212,
  }, function(err,doc) {
          console.log('User Email: ',doc.ops[0].email);
          console.log('User Passowrd: ',doc.ops[0].password);
    });
});

// Run app.js with nodemon
gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'js' }).on('restart', function () {
      console.log('restarted!')
  });
});
// Run mocha tests
gulp.task('test', function () {
    // spawn in a child process mongodb
    exec('mocha', function(err,stdout,stderr){
        console.log(stdout);
    });
});

// start dev environment
  gulp.task('startup', ['mongod', 'dev']);
