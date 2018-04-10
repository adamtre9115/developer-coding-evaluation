const gulp = require("gulp");
const inject = require("gulp-inject");
const webserver = require("gulp-webserver");
const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// set folder structure for gulp to follow
const paths = {
    src: "src/**/*",
    srcHTML: "src/**/*.html",
    srcCSS: "src/**/*.css",
    srcJS: "src/**/*.js",
    srcAssets: "src/**/*",

    tmp: "tmp",
    tmpIndex: "tmp/index.html",
    tmpCSS: "tmp/**/*.css",
    tmpJS: "tmp/**/*.js",
    tmpAssets: "tmp/**/*",

    dist: "dist",
    distIndex: "dist/index.html",
    distCSS: "dist/**/*.css",
    distJS: "dist/**/*.js",
    distAssets: "dist/**/*"
};

// set destination from src folder to tmp  
gulp.task("html", function(){
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
})

// set destination from src folder to tmp 
gulp.task("css", function(){
    return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
})

// set destination from src folder to tmp 
gulp.task("js", function(){
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
})

gulp.task("assets", function(){
    return gulp.src(paths.srcAssets).pipe(gulp.dest(paths.tmp));
})

// copy folders from src and send them to the tmp folder
gulp.task("copy", ["html", "css", "js", "assets"]);

// inject files into html
gulp.task("inject", ["copy"], function(){
    const css = gulp.src(paths.tmpCSS);
    const js = gulp.src(paths.tmpJS);
    const assets = gulp.src(paths.tmpAssets);
    return gulp.src(paths.tmpIndex)
        .pipe(inject(css, {relative: true}))
        .pipe(inject(js, {relative: true}))
        .pipe(inject(assets, {relative: true}))
        .pipe(gulp.dest(paths.tmp));
})

// serve site at localhost:3000
gulp.task("serve", ["inject"], function(){
    return gulp.src(paths.tmp)
        .pipe(webserver({
            port: 3000,
            livereload: true
        }));
})

// watch for local changes
gulp.task("watch", ["serve"], function(){
    gulp.watch(paths.src, ["inject"]);
})

// html build dist
gulp.task('html:dist', function () {
    return gulp.src(paths.srcHTML)
      .pipe(htmlclean())
      .pipe(gulp.dest(paths.dist));
  });

// css build dist
  gulp.task('css:dist', function () {
    return gulp.src(paths.srcCSS)
      .pipe(concat('style.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.dist));
  });

// js build dist
  gulp.task('js:dist', function () {
    return gulp.src(paths.srcJS)
      .pipe(concat('script.min.js'))
    //   .pipe(uglify())
      .pipe(gulp.dest(paths.dist));
  });

// assets build dist
  gulp.task('assets:dist', function () {
    return gulp.src(paths.srcAssets)
      .pipe(gulp.dest(paths.dist));
  });

// copy files to dist folder
  gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'assets:dist']);

  gulp.task('inject:dist', ['copy:dist'], function () {
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    var assets = gulp.src(paths.distAssets);
    return gulp.src(paths.distIndex)
      .pipe(inject( css, { relative:true } ))
      .pipe(inject( js, { relative:true } ))
      .pipe(gulp.dest(paths.dist));
  });

// build folder
  gulp.task('build', ['inject:dist']);