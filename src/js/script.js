//=include components/utils.js

document.addEventListener('DOMContentLoaded', function() {
  body = document.body;

  //=include components/telMask.js
  
  //=include components/validateForms.js

  //=include components/menu.js

  // В основном для IE
  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (!HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }

  fakeScrollbar = id('fake-scrollbar');
  hdr = q('.hdr');
  burger = q('.hdr__burger', hdr);

  menu = mobileMenu({
    menu: q('.menu', hdr),
    menuCnt: q('.menu__cnt', hdr),
    openBtn: burger,
    closeBtn: q('.menu__close', hdr),
    toRight: true,
    fade: false,
    allowPageScroll: false
  });
  // menu.open();

  let navLinks = qa('.nav-link[href*="#"]');

  for (let i = 0, len = navLinks.length; i < len; i++) {
    navLinks[i].addEventListener('click', scrollToTarget);
  }

  sticky(hdr);

  // thanksPopup = new Popup('.thanks', {
  // closeButtons: '.thanks__close'
  // });

  // Инициализация lazyload
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  window.svg4everybody && svg4everybody();

  // Добавление расчета vh на ресайз окна
  windowFuncs.resize.push(setVh);

  // Сбор событий resize, load, scroll и установка на window
  for (let eventType in windowFuncs) {
    if (eventType !== 'call') {
      let funcsArray = windowFuncs[eventType];
      if (funcsArray.length > 0) {
        windowFuncs.call(funcsArray);
        window.addEventListener(eventType, windowFuncs.call);
      }
    }
  }

  // настройки grab курсора на всех слайдерах
  // let slickLists = $('.slick-list.draggable');

  // slickLists.on('mousedown', function() {
  //   $(this).addClass('grabbing');
  // }).on('beforeChange', function() {
  //   $(this).removeClass('grabbing');
  // });

  // $(document).on('mouseup', function() {
  //   slickLists.removeClass('grabbing');
  // });
});