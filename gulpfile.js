var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
mincss = require('gulp-clean-css'),
concat = require('gulp-concat'),
jade = require('gulp-jade'),
stylus = require('gulp-stylus'),
server = require('gulp-webserver'),
rename = require('gulp-rename'),
zip = require('gulp-zip'),
header = require('gulp-header'),
uglify = require('gulp-uglify');

var version = '1.0.2'

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
				'./dist/galyrian.min.js'
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
		.pipe(gulp.dest(paths.dev.css.dest))
		.pipe(rename({
			basename: 'galyrian',
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(header(banner, { version: version }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('build:js', ['pre:js', 'post:js']);

gulp.task('post:js', function () {
	return gulp.src(paths.dev.js.src)
		.pipe(concat('post.js'))
		.pipe(gulp.dest(paths.dev.js.dest))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dev.js.dest))
		.pipe(rename({
			prefix: 'plugnplay-',
			basename: 'galyrian',
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('pre:js', function () {
	return gulp.src('./src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({
			basename: 'galyrian',
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(header(banner, { version: version }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist:zip:pnp', function () {
	return gulp.src([
			'./dist/plugnplay-galyrian.min.js',
			'./dist/galyrian.min.css'
		])
		.pipe(zip('galyrian-pnp-' + version + '.zip'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist:zip:oc', function () {
	return gulp.src([
			'./dist/galyrian.min.js',
			'./dist/galyrian.min.css'
		])
		.pipe(zip('galyrian-' + version + '.zip'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('build:html', function buildHTML () {
	return gulp.src(paths.dev.html.src)
		.pipe(jade())
		.pipe(gulp.dest(paths.dev.html.dest))

});

gulp.task('watch', function () {
	gulp.watch(paths.dev.css.watch, ['build:css', 'dist']);
	gulp.watch(paths.dev.js.watch, ['build:js', 'dist']);
	gulp.watch(paths.dev.html.watch, ['build:html']);
});

gulp.task('build', ['build:css', 'build:js', 'build:html']);

gulp.task('dist', ['dist:zip:pnp', 'dist:zip:oc'])

gulp.task('default', ['server', 'build', 'watch']);

var banner = ' /**\n * Galyrian \n * Versión: ' + version + '\n * Git Repository: https://github.com/EdGraVill/galyrian \n * Algunos Derechos Reservados por {innCode} - 2016 \n * Licencia: GPL 3.0 ----- \n * This file is part of Galyrian ' + version + '. \n * Galyrian is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. \n * Galyrian is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. \n * You should have received a copy of the GNU General Public License along with Foobar. If not, see https://www.gnu.org/licenses/gpl.html\n */\n\n\n'