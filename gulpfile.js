// npm i -D yargs fs mkdirpsync path gulp gulp-cli gulp-shell gulp-sass gulp-clean-css gulp-autoprefixer gulp-html-minifier gulp-include gulp-remove-logging gulp-uglify gulp-rename gulp-strip-comments gulp-tap gulp-beautify gulp-if gulp-flatten

// npm i -D gulp-babel @babel/core @babel/plugin-transform-block-scoping @babel/plugin-transform-template-literals @babel/plugin-transform-arrow-functions

// export PATH=$PATH:/Applications/MAMP/Library/bin/

let { src, dest, watch, series, parallel, task } = require('gulp'),
  path = require('path').posix,
  fs = require('fs'),
  argv = require('yargs').argv,
  mkdirpsync = require('mkdirpsync'),
  colors = require('colors'),

  watchcss = require('./scripts/watch/watch-css.js'),
  buildcss = require('./scripts/build/build-css.js'),

  shell = require('gulp-shell'),

  imagemin = require('gulp-imagemin'),
  svgmin = require('gulp-svgmin'),
  webp = require('gulp-webp'),

  srcPath = './src',
  config = require('./scripts/config.js'),
  wordpress = config.wordpress,
  flexibleWordpress = config.flexibleWordpress,

  createBlock = require('./scripts/start/create-block.js'),
  createSection = require('./scripts/start/create-section.js'),
  createFile = require('./scripts/start/create-file.js'),
  createInc = require('./scripts/create/createinc.js'),

  removeLogging = require('gulp-remove-logging'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),

  buildWordpress = require('./scripts/start/build-wordpress.js'),
  start = require('./scripts/start/start.js'),

  htaccessSrc = path.join(config.libs.pages, '.htaccess'),
  htaccessDest = path.join(config.localServerDest, '.htaccess'),

  acfImportSrc = path.join(config.libs.pages, 'acf-import.php'),
  acfImportDest = path.join(config.localServerDest, 'acf-import.php'),

  createStartCatalogs = function(cb) {
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
  },

  moveSource = require('./scripts/move/move-src.js'), { moveImages, moveFonts, moveFavicons, moveJSON, moveBlocks, moveSections, movePHP, moveHTML } = require('./scripts/move/move-files.js'),
  moveJs = require('./scripts/move/move-js.js'),

  buildJs = require('./scripts/watch/build-js.js'),
  buildCss = require('./scripts/build/build-css.js'),

  createPage = require('./scripts/create-page.js');


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

task('createsection', function(cb) {
  let newPath = argv.src;
  if (newPath.constructor !== Boolean) {
    createSection(newPath);
  }
  cb();
});

task('renameblock', function(cb) {
  let oldPath = argv.src,
    newPath = argv.dest,
    blocksSrc = config.src.blocks;

  if (oldPath.constructor !== Boolean && newPath.constructor !== Boolean) {
    if (flexibleWordpress) {
      let parsedPath = path.parse(path.normalize(oldPath)),
        filedir = path.join(blocksSrc, parsedPath.name),
        files;

      try {
        files = fs.readdirSync(filedir);
      } catch (err) {
        console.log('Не удалось прочитать папку ' + filedir);
        console.error(err);
        return;
      }

      files.forEach(function(file) {
        let filebase = path.parse(file).base, //file.txt
          oldFilepath = path.join(filedir, filebase),
          newFilepath = path.join(filedir, filebase.replace(parsedPath.name, newPath));

        console.log('Хочу переименовать ' + oldFilepath + ' в ' + newFilepath);
        try {
          fs.renameSync(oldFilepath, newFilepath);
          console.log('Файл ' + oldFilepath + ' переименован в ' + newFilepath);
        } catch {
          console.log('Ошибка переименования файла ' + oldFilepath)
        }

      });

      // Переименовываем саму папку
      try {
        fs.renameSync(filedir, filedir.replace(parsedPath.name, newPath));
        console.log('Файл ' + filedir + ' переименован в ' + filedir.replace(parsedPath.name, newPath));
      } catch {
        console.log('Ошибка переименования файла ' + filedir)
      }
    }
  }
  cb();
});

task('createpage', createPage);


// function buildCSS(filepath, event) {
//   let parsedPath = path.parse(filepath),
//     pagesInfo = path.join(config.dest.path, 'pages-info.json'),
//     date = new Date(),
//     startDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
//     endDate,
//     timeDiff;

//   console.log('  [' + startDate.grey + ']' + ' Starting \'' + 'buildCSS'.blue + '\'...');

//   if (event === 'change') {
//     console.log('    ' + filepath + ' has been modified'.green);

//     try {
//       pagesInfo = JSON.parse(fs.readFileSync(pagesInfo).toString());
//       let updateStyles = [],
//         mediaRegExp = /\.[0-9]+/,
//         styleMedia = parsedPath.name.match(mediaRegExp); // .1024

//       for (let pageName in pagesInfo) {
//         let pageStyles = pagesInfo[pageName];

//         if (pageStyles.indexOf(parsedPath.name.replace(mediaRegExp, '')) !== -1) {
//           let styleName = 'style-' + pageName + (styleMedia ? styleMedia[0] : '') + '.scss',
//             stylePath = path.join(config.src.scss, styleName);
//           updateStyles[updateStyles.length] = stylePath;
//         }
//       }

//       if (updateStyles.length > 0) {
//         buildCss(null, updateStyles);
//         updateStyles.forEach(style => console.log('      ' + style + ' has been updated'.green));
//       }

//     } catch (err) {
//       console.log(pagesInfo + ' not found'.red);
//       return;
//     }

//   } else if (event === 'unlink') {

//   }
//   endDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

//   timeDiff = Date.parse(new Date()) - Date.parse(date) + '';

//   console.log('  [' + endDate.grey + ']' + ' Finished \'' + 'buildCSS'.blue + '\' after ' + timeDiff.yellow + ' ms'.yellow);
// }

// task('watchcss', function(cb) {
//   const paths = {
//     sections: path.join(config.src.sections, '**', '*.scss'),
//     themeStyle: path.join(config.src.path, 'style.scss'),
//     components: path.join(config.src.components, '**', '*.scss')
//   };

// for (const key in paths) {
//   watch(paths[key])
//     .on('add', filepath => buildCSS('add', filepath, key))
//     .on('change', filepath => buildCSS('change', filepath, key))
//     .on('unlink', filepath => buildCSS('unlink', filepath, key));
// }

//   // watch(paths.sections)
//   //   .on('add', filepath => buildCSS('add', filepath, 'sections'))
//   //   .on('change', filepath => buildCSS('change', filepath, 'sections'))
//   //   .on('unlink', filepath => buildCSS('unlink', filepath, 'sections'));

//   // watch(paths.sections)
//   //   .on('add', filepath => buildCSS('add', filepath, 'themeStyle'))
//   //   .on('change', filepath => buildCSS('change', filepath, 'themeStyle'))
//   //   .on('unlink', filepath => buildCSS('unlink', filepath, 'themeStyle')); 

//   // watch(paths.components)
//   //   .on('add', filepath => buildCSS('add', filepath, 'components'))
//   //   .on('change', filepath => buildCSS('change', filepath, 'components'))
//   //   .on('unlink', filepath => buildCSS('unlink', filepath, 'components')); 

//   cb();
// });

task('default', function(done) {
  // moveSource(); // Перемещаем исходный код
  if (wordpress) {
    watch(path.join(config.src.components, '**', '*.js'), buildJs);
    watch(path.join(config.src.sections, '**', '*.js'), buildJs);
    watch(path.join(config.src.js, 'components', '*.js'), buildJs);
    watch(path.join(config.src.js, 'script.js'), buildJs);
    watch(path.join(config.src.js, 'script-admin.js'), buildJs);

    // watch(path.join(config.src.path, 'style.scss'), buildCss);
    // watch(path.join(config.src.scss, 'style-admin.scss'), buildCss);
    // watch(path.join(config.src.components, '**', '*.scss'), buildCss);
    // watch(path.join(config.src.sections, '**', '*.scss'), buildCss);
    // watch(config.src.scss + '**/*.scss', buildCss);
    // watch(path.join(config.src.scss, '**', '!(style-)*.scss'), buildCss);

    watch(path.join(config.src.components, '**', '*.php'), moveBlocks);
    watch(path.join(config.src.sections, '**', '*.php'), moveSections);
    watch(path.join(config.src.path, '*.php'), movePHP);
    watch(path.join(config.src.inc, '*.php'), movePHP);

    watch(path.join(config.src.inc, '*.php'), movePHP);
  } else {
    watch(path.join(config.src.js, 'components', '*.js'), buildJs) /*.on('unlink', path => removeFiles(path, 'unlink'))*/ ;
    watch(path.join(config.src.path, '*.html'), moveHTML);
  }

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
task('movecss', buildCss);
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
  'movecss',
  'moveblocks',
  'movesections',
  'movephp',
  'movehtml',
  'movefonts',
  'moveimg',
  'movefavicons',
  'movejson'));

task('watchcss', watchcss);