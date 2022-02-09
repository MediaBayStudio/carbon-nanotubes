document.addEventListener('DOMContentLoaded', function() {

//=include ../sections/header/header.js

//=include ../sections/mobile-menu/mobile-menu.js

//=include ../sections/tokenomics-hero/tokenomics-hero.js

;(function() {
  let slider = q('.tokenomics-ctube__items'),
    slides = qa('.tokenomics-ctube__item', slider),

    buildSlider = function() {
      let $slider = $(slider);
      if (media('(min-width:1279.98px)') && slides.length < 4) {
        if (SLIDER.hasSlickClass($slider)) {
          SLIDER.unslick($slider);
        }
      } else {
        if (SLIDER.hasSlickClass($slider)) {
          return;
        }
        if (slides.length && slides.length > 1) {
          $slider.slick({
            infinite: false,
            arrows: false,
            dots: true,
            dotsClass: 'tokenomics-ctube__items-dots dots',
            customPaging: function() {
              return SLIDER.dot;
            },
            mobileFirst: true,
            responsive: [{
              breakpoint: 1279.98,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }]
          });
        }
      }
    };
    // buildSlider();
    windowFuncs.resize.push(buildSlider);

    
})();

//=include ../sections/tokenomics-token-distribution-model/tokenomics-token-distribution-model.js

//=include ../sections/title-descr-link/title-descr-link.js

//=include ../sections/footer/footer.js

});