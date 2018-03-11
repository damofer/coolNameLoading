 var gulp = require('gulp'),
 	  uglify = require('gulp-uglify'),
 	  sass = require('gulp-sass'),
 	  plumber = require('gulp-plumber')
 	  livereload = require('gulp-livereload')
 	  imagemin = require('gulp-imagemin')
 	  prefix = require('gulp-autoprefixer'),
 	   maps = require('gulp-sourcemaps');



// Styles Task
//Uglifies
gulp.task('styles', function(){
	gulp.src('public/styles/sass/**/*.scss')
	.pipe(plumber())
	.pipe(maps.init())
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(prefix('last 2 versions'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('public/styles/css'))
	.pipe(livereload());
});

//Images Task
//Min

gulp.task('reload', function(){
	gulp.src('public/templates/**/*.html')
	.pipe(livereload());
});
//Watch Task
//Watch JS
gulp.task('watch', function() {


	livereload.listen();
	
	gulp.watch('public/styles/sass/**/*.scss', ['styles'])	
	gulp.watch('public/templates/**/*.html',['reload'])
	gulp.watch('public/index.html',['reload'])

});

 gulp.task('default', ['styles', 'watch']);
 