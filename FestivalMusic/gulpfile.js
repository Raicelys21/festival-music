const {src, dest, parallel, watch} = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//Utilidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'

}

function javascript(){
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe( concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe( dest('./build/js'))
}

function css() {
  return src('./src/scss/app.scss')
         .pipe(sourcemaps.init())
         .pipe( sass() )
         .pipe(postcss([autoprefixer(), cssnano()]))
         .pipe(sourcemaps.write('.'))
         .pipe( dest('./build/css'))

}

/*
function minificar(){
    return src('./src/scss/app.scss')
         .pipe( sass({
             outputStyle: 'compressed'
         }) )
         .pipe( dest('./build/css'))
}*/

function watchA(){ //realiza cambios automaticamente
    watch('./src/**/*.scss', css);
    watch('./src/js/*.js', javascript);
}

function imagenes() {
    return src("scr/img/**/*")
    .pipe(imagemin())
    .pipe(dest("./build/img"))
    .pipe(notify({message: 'Minificacion completada'}))
}

function web(){
    return src("scr/img/**/*")
    .pipe(webp() )
    .pipe(dest("./build/img"))
    .pipe(notify({message: 'Webp completada'}))
}

exports.css = css;
//exports.minificar = minificar;
exports.watchA = watchA;
exports.imagenes = imagenes;
exports.javascript = javascript;

exports.default = parallel(css, javascript, watchA);

//Aprender a minificar imagen con imagemin
//Aprender a realizar notify
//Aprender a realizar webp