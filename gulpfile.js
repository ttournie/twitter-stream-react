var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');


var autoprefixerOptions = {
    browsers: ['last 2 versions','ie >= 9', '> 5%', 'Firefox ESR']
};


gulp.task('sass', function() {
    return gulp.src(['scss/**/*.scss', 'src/components/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
});
gulp.task('watch', function() {
    gulp.watch(['scss/**/*.scss','src/components/**/*.scss'], ['sass']);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'watch'],
        callback
    )
});
