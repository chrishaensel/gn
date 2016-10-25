const gulp = require('gulp');
const fs = require('fs');
const async = require('async');
const child_process  = require('child_process');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const handyUtils = require('handyutils');
const nodemon   = require('gulp-nodemon');
const moment = require('moment');
const UserAccount = require('./models/account');
const menus = require('./models/menu');
// Dot Env File Loader
if(!process.env.PORT){
	let dotenv = require('dotenv').load();
}
// startup required services to run the app server
gulp.task('mongod', () => { 
    // spawn in a child process mongodb
    child_process.exec('mongod', (err,stdout,stderr) => {
    	console.log(stdout);
    });
});
// Create keys and store them in the right folder
gulp.task('genRSAKeys', () => { 
  exec('openssl genrsa -out ./keys/private.pem 1024 && openssl rsa -in ./keys/private.pem -pubout > ./keys/public.pub', function(err,stdout,stderr){
    console.log(stdout);
  });
});
gulp.task('envFile', () => { 
  exec('echo \"DEBUG=True\" > ./.env', (err,stdout,stderr) => {
    console.log(stdout);
  });
});
//Add a test user for an Admin
gulp.task('create-admin-test-user', (done) => {

    UserAccount.createUser({
    "email" : "admin@fullsail.com",
    "password" : "admin",
    "firstName" : "Admin",
    "lastName" : "Tester",
    "phone" : "999999999",
    "admin" : true,
    "idNumber" : 6231231,
    "userId" : 90123212,
  }, (err,doc) => {
          console.log('User Email: ',doc.ops[0].email);
          console.log('User Passowrd: ',doc.ops[0].password);
    });
});
// Populate
gulp.task('populate-menu',() => {
  //get menu category json
	async.series([
		(next) =>{
			// remove all menu categories before populating
		  menus.destroy({},(destroyErr,destroyRes)=> {
		    handyUtils.debug('destroyErr in populate-menu',destroyErr);
		    handyUtils.debug('destroyRes in populate-menu',destroyRes);
				next();
		  });
		},
		(next) =>{
			const Teppanyaki = JSON.parse(fs.readFileSync('./menuCategories/teppanyaki.json', 'utf8'));
		  menus.create(Teppanyaki,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu Teppanyaki',createErr);
		    handyUtils.debug('createRes in populate-menu Teppanyaki',createRes);
				next();
		  });
		},
		(next) => {
			const HalalTeppanyaki = JSON.parse(fs.readFileSync('./menuCategories/halalTeppanyaki.json', 'utf8'));
			menus.create(HalalTeppanyaki,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu HalalTeppanyaki',createErr);
		    handyUtils.debug('createRes in populate-menu HalalTeppanyaki',createRes);
				next();
		  });
		},
		(next) => {
			const Sushi = JSON.parse(fs.readFileSync('./menuCategories/sushi.json', 'utf8'));
			menus.create(Sushi,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu Sushi',createErr);
		    handyUtils.debug('createRes in populate-menu Sushi',createRes);
				next();
		  });
		},
		(next) => {
			const Bar = JSON.parse(fs.readFileSync('./menuCategories/bar.json', 'utf8'));
			menus.create(Bar,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu Bar',createErr);
		    handyUtils.debug('createRes in populate-menu Bar',createRes);
				next();
		  });
		},
		(next) => {
			const Appetizer = JSON.parse(fs.readFileSync('./menuCategories/appetizer.json', 'utf8'));
			menus.create(Appetizer,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu Appetizer',createErr);
		    handyUtils.debug('createRes in populate-menu Appetizer',createRes);
				next();
		  });
		},
		(next) => {
			const ChildrenMenu = JSON.parse(fs.readFileSync('./menuCategories/childrenMenu.json', 'utf8'));
			menus.create(ChildrenMenu,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu ChildrenMenu',createErr);
		    handyUtils.debug('createRes in populate-menu ChildrenMenu',createRes);
				next();
		  });
		},
		(next) => {
			const HappyHour = JSON.parse(fs.readFileSync('./menuCategories/happyHour.json', 'utf8'));
			menus.create(HappyHour,(createErr,createRes)=> {
		    handyUtils.debug('createErr in populate-menu HappyHour',createErr);
		    handyUtils.debug('createRes in populate-menu HappyHour',createRes);
				next();
		  });
		}

	], (seriesErr, seriesRes) =>{
		handyUtils.debug('seriesErr in populate-menu', seriesErr);
		handyUtils.debug('seriesRes in populate-menu', seriesRes);
	});
});
// Run app.js with nodemon
gulp.task('dev', () => {
  nodemon({ script: 'app.js'
          , ext: 'js' }).on('restart', () => {
      console.log('restarted!')
  });
});
// Run mocha tests
gulp.task('test',() => {
    // spawn in a child process mongodb
    exec('mocha', (err,stdout,stderr) => {
        console.log(stdout);
    });
});
// sass
gulp.task('sass',() => {
    return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
gulp.task('sass:watch',() => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// setup dev environment
  gulp.task('setup', ['genRSAKeys', 'envFile']);

// start dev environment
  gulp.task('start', ['dev','sass:watch']);
