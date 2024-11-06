const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

// Função de compilação imagemin
function comprimeImagem(){
    return gulp.src('./source/imagens/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/imagens'));
}

// Função de compilação uglify
function comprimeJavascript(){
    return gulp.src('./source/script/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/script'))
}

// Função de compilação Sass
function compilaSass(){
    return gulp.src("./source/style/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(sourcemaps.write('.\maps'))
    .pipe(gulp.dest("./build/style"))
}

// Exportando tarefas individuais
exports.default = function(){
    gulp.watch('./source/style/*.scss', {ignoreInitial:false}, gulp.series(compilaSass));
    gulp.watch('./source/script/*.js', {ignoreInitial:false}, gulp.series(comprimeJavascript));
    gulp.watch('./source/imagens/*', {ignoreInitial:false}, gulp.series(comprimeImagem));
}

