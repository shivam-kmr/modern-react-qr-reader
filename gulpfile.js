const { src, dest, series, parallel, watch } = require("gulp");
const fs = require("fs");
const del = require("del");
const inlineStr = require("gulp-inline-str");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

const babelOptions = JSON.parse(fs.readFileSync("./.babelrc", "utf8"));

const paths = {
  scripts: ["src/index.js", "src/getDeviceId.js", "src/havePropsChanged.js", "src/errors.js", "src/createBlob.js"],
  worker: "src/worker.js",
  jsQR: "node_modules/jsqr/dist/jsQR.js",
  destination: "./lib",
};

// Clean task
function clean() {
  return del([`${paths.destination}/*.js`]);
}

// Worker task
function worker() {
  return src([paths.jsQR, paths.worker])
    .pipe(concat("worker.js"))
    .pipe(uglify())
    .pipe(dest(paths.destination));
}

// Build task
function build() {
  return src(paths.scripts)
    .pipe(inlineStr({ basePath: paths.destination }))
    .pipe(babel(babelOptions))
    .pipe(dest(paths.destination));
}

// Watch task
function watchFiles() {
  watch(paths.scripts, build);
}

// Define complex tasks
const buildTask = series(clean, worker, build);
const defaultTask = buildTask;

// Export tasks
exports.clean = clean;
exports.worker = worker;
exports.build = buildTask;
exports.watch = watchFiles;
exports.default = defaultTask;
