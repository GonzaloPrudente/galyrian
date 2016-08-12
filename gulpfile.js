var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
mincss = require('gulp-clean-css'),
concat = require('gulp-concat'),
jade = require('gulp-jade'),
stylus = require('gulp-stylus'),
server = require('gulp-webserver'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify');

const paths = {
	dev: {
		css: {
			src: './src/css/main.styl',
			dest: './build/css/',
			watch: './src/css/**/*.styl'
		},
		js: {
			src: [
				'./src/js/primero/jquery.js', 
				'./src/js/primero/hammer.js',
				'./src/js/*.js'
			],
			dest: './build/js/',
			watch: './src/js/**/*.js'
		},
		html: {
			src: './src/jade/views/*.jade',
			dest: './build/',
			watch: './src/jade/**/*.jade'
		}
	}
}

gulp.task('server', function () {
	return gulp.src('./build')
		.pipe(server({
			host: '0.0.0.0',
			port: '80',
			livereload: true,
			open: true,
		}));
});

gulp.task('build:css', function () {
	return gulp.src(paths.dev.css.src)
		.pipe(stylus({
			'include css': true
		}))
		.pipe(autoprefixer())
		.pipe(mincss())
		.pipe(gulp.dest(paths.dev.css.dest))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dev.css.dest));
});

gulp.task('build:js', function () {
	return gulp.src(paths.dev.js.src)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.dev.js.dest))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dev.js.dest));
});

gulp.task('build:html', function buildHTML () {
	return gulp.src(paths.dev.html.src)
		.pipe(jade())
		.pipe(gulp.dest(paths.dev.html.dest))

});

gulp.task('watch', function () {
	gulp.watch(paths.dev.css.watch, ['build:css']);
	gulp.watch(paths.dev.js.watch, ['build:js']);
	gulp.watch(paths.dev.html.watch, ['build:html']);
});

gulp.task('build', ['build:css', 'build:js', 'build:html']);

gulp.task('default', ['server', 'build', 'watch']);