// npm i -D yargs fs mkdirpsync path gulp gulp-cli gulp-shell gulp-sass gulp-clean-css gulp-autoprefixer gulp-html-minifier gulp-include gulp-remove-logging gulp-uglify gulp-rename gulp-strip-comments gulp-tap gulp-beautify gulp-if gulp-flatten

// npm i -D gulp-babel @babel/core @babel/plugin-transform-block-scoping @babel/plugin-transform-template-literals @babel/plugin-transform-arrow-functions

// export PATH=$PATH:/Applications/MAMP/Library/bin/

const { src, dest, watch, series, parallel, task } = require('gulp');
const path = require('path').posix;
const fs = require('fs');
const argv = require('yargs').argv;
const mkdirpsync = require('mkdirpsync');
const colors = require('colors');

const watchcss = require('./scripts/watch/watch-css.js');
const buildcss = require('./scripts/build/build-css.js');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const config = require('./scripts/config.js');

const createBlock = require('./scripts/start/create-block.js');
const createSection = require('./scripts/start/create-section.js');
const createFile = require('./scripts/start/create-file.js');
const createInc = require('./scripts/create/createinc.js');

const renameSection = require('./scripts/rename-section.js');

const buildWordpress = require('./scripts/start/build-wordpress.js');
const start = require('./scripts/start/start.js');

const htaccessSrc = path.join(config.libs.pages, '.htaccess');
const htaccessDest = path.join(config.localServerDest, '.htaccess');

const acfImportSrc = path.join(config.libs.pages, 'acf-import.php');
const acfImportDest = path.join(config.localServerDest, 'acf-import.php');

const createStartCatalogs = function(cb) {
  mkdirpsync(config.dest.path);

  console.log('Создано: ' + config.dest.path);

  // Move .htaccess
  try {
    let htaccessCnt = fs.readFileSync(htaccessSrc).toString();
    htaccessCnt = htaccessCnt.replace(/%title%/g, config.siteName);
    createFile(htaccessDest, htaccessCnt);
  } catch (err) {
    console.log('Файл ' + htaccessSrc + ' не найден');
  }

  // Move acf-import.php
  try {
    let acfImportCnt = fs.readFileSync(acfImportSrc).toString();
    createFile(acfImportDest, acfImportCnt);
  } catch (err) {
    console.log('Файл ' + acfImportSrc + ' не найден');
  }

  for (dir in config.src) {
    mkdirpsync(config.src[dir]);
    console.log('Создано: ' + config.src[dir]);
  }
  cb();
};

const moveSource = require('./scripts/move/move-src.js');
const { moveImages, moveFonts, moveFavicons, moveJSON, moveBlocks, moveSections, movePHP, moveHTML } = require('./scripts/move/move-files.js');
const moveJs = require('./scripts/move/move-js.js');

const buildJs = require('./scripts/watch/build-js.js');

const createPage = require('./scripts/create-page.js');


task('start', series(createStartCatalogs, start));
task('wp', series(createStartCatalogs, buildWordpress));

task('createcomponent', function(cb) {
  let newPath = argv.src;
  if (newPath.constructor !== Boolean) {
    createBlock(newPath, 'component');
  }
  cb();
});

task('createinc', createInc);

// const createSection = function(cb) {
//   let newPath = argv.src;
//   if (newPath.constructor !== Boolean) {
//     createSection(newPath);
//   }
//   cb();
// }

createSection.description = 'Create scss, js, php files';
createSection.flags = { '--src': 'name of new section' };
task('createsection', createSection);

renameSection.description = 'Rename scss, js, php files of the section';
renameSection.flags = { '--src': 'old name', '--dest': 'new name' };
task('renamesection', renameSection);

task('createpage', createPage);

task('default', function(done) {
  watch(path.join(config.src.components, '**', '*.js'), buildJs);
  watch(path.join(config.src.sections, '**', '*.js'), buildJs);
  watch(path.join(config.src.js, 'components', '*.js'), buildJs);
  watch(path.join(config.src.js, 'script.js'), buildJs);
  watch(path.join(config.src.js, 'script-admin.js'), buildJs);
  watchcss(done);
  watch(path.join(config.src.components, '**', '*.php'), moveBlocks);
  watch(path.join(config.src.sections, '**', '*.php'), moveSections);
  watch(path.join(config.src.path, '*.php'), movePHP);
  watch(path.join(config.src.inc, '*.php'), movePHP);

  watch(path.join(config.src.inc, '*.php'), movePHP);

  let imageProcessing = function(filepath, event) {
    const filetype = path.parse(filepath).ext.slice(1);
    switch (filetype) {
      case 'jpeg':
      case 'jpg':
      case 'png':
        src(filepath, { allowEmpty: true })
        .pipe(webp())
        .pipe(dest(config.dest.img));
        src(filepath, { allowEmpty: true })
        .pipe(imagemin())
        .pipe(dest(config.dest.img));
        console.log('File ' + filepath + ' was ' + event + ', webped and minified');
        break;
      case 'svg':
        src(filepath, { allowEmpty: true })
        // .pipe(svgmin())
        .pipe(dest(config.dest.img));
        console.log('File ' + filepath + ' was ' + event + ' and minified');
        break;
    }
  }

  watch(path.join(config.src.img, '**', '*'), moveImages)
  .on('add', filepath => imageProcessing(filepath, 'added'))
  .on('change', filepath => imageProcessing(filepath, 'changed'));
  // .on('unlink', function(filepath) {
  //   const filetype = path.parse(filepath).ext.slice(1);
  //   console.log(filetype);
  //   console.log('removed');
  // });
  watch(path.join(config.src.fonts, '**', '*'), moveFonts);
  watch(path.join(config.src.path, '**', '*.json'), moveJSON);
});

task('movesrc', moveSource);
task('buildjs', buildJs);
task('movejs', moveJs);
// При flexiblewordpress собираются только blocks и assets
// html, php
task('moveblocks', moveBlocks);
task('movesections', moveSections);
task('movephp', movePHP);
task('movehtml', moveHTML);
task('movefonts', moveFonts);
task('moveimg', moveImages);
task('movefavicons', moveFavicons);
task('movejson', moveJSON);

task('moveall', parallel(
  'movesrc',
  'movejs',
  // 'movecss',
  'moveblocks',
  'movesections',
  'movephp',
  'movehtml',
  'movefonts',
  'moveimg',
  'movefavicons',
  'movejson'));

task('buildcss', buildcss);
task('watchcss', watchcss);