var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    zip = require('gulp-zip'),
    exit = require('gulp-exit'),
    del = require('del'),
    git = require('gulp-git'),
    minimist = require('minimist'),
    config = require('./config.json');

var reload = browserSync.reload;

var args = minimist(process.argv.slice(2),{
    string: 'message',
    default: 'Initial commit'
});

gulp.task('uglify',function(){
    gulp.src(config.srcDir + '*.js').pipe(concat(config.gameFile)).pipe(uglify()).pipe(gulp.dest(config.buildDir));
});

gulp.task('imagemin',function(){
    gulp.src(config.srcDir + config.assetsDir + '*.{png,jpg,gif}').pipe(imagemin()).pipe(gulp.dest(config.buildDir + config.assetsDir));
});

gulp.task('clean',function(){
    del(['build/*']);
});
gulp.task('copy',function(){
    gulp.src('./src/**').pipe(gulp.dest('./build/'));
});

gulp.task('compress',function(){
    gulp.src('./build/**').pipe(zip('game.zip')).pipe(gulp.dest('./build')).pipe(exit());
});

gulp.task('deploy',function(){
    gulp.src('./src/*').pipe(git.add()).pipe(git.commit(args.message));
});

gulp.task('serve',function(){
    browserSync({
        server: {
            baseDir: 'src',
        },
        port: 8000
    });
});

gulp.task('production',function(){
    browserSync({
        server: {
            baseDir: 'build'
        },
        port: 8000
    });
});


gulp.task('build',['clean','copy','uglify','imagemin','compress']);

gulp.task('default',function(){
     
});

gulp.watch(['**/*'],{cwd: 'src'},reload);
