require('babel-core/register');

const fs = require('fs');

const gulp = require('gulp');

const babel = require('gulp-babel');

const eslint = require('gulp-eslint');

const mocha = require('gulp-mocha');

const istanbul = require('gulp-istanbul');

const nodemon = require('gulp-nodemon');

const Cache = require('gulp-file-cache');

const docco = require('gulp-docco');

const mkdirp = require('mkdirp');

const cache = new Cache();

function createLogDir() {
    const logDirPath = 'build/logs';
    mkdirp(logDirPath, (err) => {
        if(err) console.error(err);
    });
}

gulp.task('lint', () => {
    // run ESLint
    gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
})

/**
* Compile source files
*/
gulp.task('compile', ['lint'], () => {

    // compile source to ES5
    gulp.src('src/**/*.js')
    .pipe(cache.filter())       // cache source files
    .pipe(babel())      // compile only modified files
    // .pipe(cache.cache())        // cache compiled files
    .pipe(gulp.dest('build'));  // move compiled files to build directory
});

gulp.task('build', ['compile'], () => {
    var filesToCopy = [ 'config.json', 'package.json' ];
    // copy configuration file to build directory
    gulp.src(filesToCopy)
    .pipe(gulp.dest('build'));

    createLogDir();
});

gulp.task('docco', () => {
    gulp.src('./src/**/*.js')
        .pipe(docco())
        .pipe(gulp.dest('./docs'));
});

gulp.task('doc', ['docco']);

gulp.task('pre-test', () => {
    return gulp.src(['build/**/*.js', '!build/{test,test/**}'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
    process.chdir('build');
    gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha({timeout: 60000}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({
        thresholds: {
            global: {
                statements: 80,
                branches: 70,
                lines: 80,
                functions: 80
            }
        }
    }))
    .on('error', () => {
        process.exit(1);
    })
    .on('end', () => {
        process.exit();
    });
});

gulp.task('watch', ['compile'], () => {
    console.log('Watching source directory for changes');
    gulp.watch('src/**/*.js').on('change', () => {
        console.log('Recompiling source');
        gulp.start('compile');
        console.log('Source recompilation done');
    });
});

gulp.task('run', () => {
    process.chdir('build');
    nodemon({
        script: 'server.js',
        tasks: ['watch'],
        ignore: ["test/test.js", "gulpfile.babel.js"],
        ext: 'js html json',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('default', ['run']);
