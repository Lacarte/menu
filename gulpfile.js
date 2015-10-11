//require methods
var gulp 	= require('gulp');
var concat 	= require('gulp-concat');
var rename 	= require('gulp-rename');
var uglify 	= require('gulp-uglify');
var runSequence = require('run-sequence')
var sass 	= require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var plumber = require('gulp-plumber');
var browserSync	= require('browser-sync');

/* tasks */



/////////////definition task//////////

gulp.task('sass',function(){
// streamError is set to false
  var streamError = false;
  
	return gulp.src(['scss/style.scss'])
	.pipe(plumber({
	errorHandler: function(err) {
	// display the error message
	console.log(err);
	// end the errored task
	this.emit('end') }
	}))
	.pipe(sass())
	.pipe(postcss([ autoprefixer({browsers: ['last 2 version'] }) ]))
	.pipe(gulp.dest('css'));

});





//////////////task////////////////


gulp.task('sass-watch',['sass'],browserSync.reload);


/////////////watcher //////////

gulp.task('watch',function(callback){

	browserSync({

		server:{
			baseDir:'./'
		}
	});

	gulp.watch('scss/*.scss',['sass-watch']);

	gulp.watch("./*.html").on('change', browserSync.reload);

});


////////////default ////// run them sequencialy
gulp.task('default',function(callback){

	//runSequence('depsjs','depsdist',callback);

});