var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    zip = require('gulp-zip'),
    exit = require('gulp-exit'),
    del = require('del'),
    changed = require('gulp-changed'),
    config = require('./config.json');

var reload = browserSync.reload;

gulp.task('uglify',function(){
    gulp.src(config.srcDir + '*.js').pipe(changed(config.buildDir)).pipe(concat(config.gameFile)).pipe(uglify()).pipe(gulp.dest(config.buildDir));
});

gulp.task('imagemin',function(){
    gulp.src(config.srcDir + config.assetsDir + '*.{png,jpg,gif}').pipe(changed(config.buildDir + config.assetsDir)).pipe(imagemin()).pipe(gulp.dest(config.buildDir + config.assetsDir));
});

gulp.task('clean',function(){
    del([config.buildDir + '*']);
});
gulp.task('copy',function(){
    gulp.src(config.srcDir + '*').pipe(changed(config.buildDir)).pipe(gulp.dest(config.buildDir));
});

gulp.task('compress',function(){
    gulp.src(config.buildDir + '**').pipe(zip('game.zip')).pipe(gulp.dest(config.buildDir)).pipe(exit());
});

gulp.task('serve',function(){
    browserSync({
        server: {
            baseDir: config.srcDir,
        },
        port: 8000
    });
});

gulp.task('production',function(){
    browserSync({
        server: {
            baseDir: config.buildDir 
        },
        port: 8000
    });
});


gulp.task('build',['clean','copy','uglify','imagemin','compress']);

gulp.task('default',function(){
     
});

gulp.watch(['**/*'],{cwd: 'src'},reload);
