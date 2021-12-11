const gulp = require('gulp')
const pug = require('gulp-pug')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const clean = require('gulp-clean');
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const { series, parallel } = gulp

const cleanBuild = () => {
    return gulp.src('build/', {allowEmpty: true})
        .pipe(clean());
}

const server = () => {
    browserSync.init({
        open: true,
        server: {
            baseDir: "build/"
        }
    });
}


const html = () => {
    return gulp
        .src('src/pug/*.pug')
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
}

const styles = () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',          
        'src/styles/**/*.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('build/css', {allowEmpty: true}))
        .pipe(browserSync.stream());
}

const scripts = () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
}

const moveImg = () => {
    return gulp.src('src/img/*.*')
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.stream());
}

const moveHTML = () => {
    return gulp.src('src/pug/*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
}

const moveJson = () => {
    return gulp.src('src/json/*.json')
        .pipe(gulp.dest('build/json'))
        .pipe(browserSync.stream());
}

const watch = () => {
    gulp.watch('src/pug/**/*.pug', html)
    gulp.watch('src/styles/**/*.scss', styles)
    gulp.watch('src/js/**/*.js', scripts)
}


exports.dev = series(
    cleanBuild,
    parallel(html, styles, scripts, moveImg, moveHTML, moveJson),
    parallel(server, watch)
)