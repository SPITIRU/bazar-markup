var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

function build(cb) {
    runSequence(
        'clean',
        'clean:temp',
        'sprite:svg',
        'svgo',
        'sprite:png',
        'sass',
        'nunjucks',
        'js:all',
        'copy',
        'list-pages',
        cb
    );
}

function buildDev(cb) {
    runSequence(
        'clean',
        'sprite:svg',
        'svgo',
        'sprite:png',
        'sass',
        'nunjucks',
        'js:build',
        'copy',
        'list-pages',
        cb
    );
}

gulp.task('build', function(cb) {
    config.setEnv('production');
    config.logEnv();
    buildDev(cb);
});

gulp.task('build:dev', function(cb) {
    config.setEnv('development');
    config.logEnv();
    build(cb);
});

