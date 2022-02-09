;(function() {
  let slider = q('.rd-properties__items'),
    sliderParent = slider.parentElement,
    itemsDescription = q('.rd-properties__items-descr', sliderParent),
    firstPicture = q('.rd-properties__item-pic', slider),
    firstSlide = firstPicture.parentElement,
    slidesSelector = '.rd-properties__item',
    activeElement = null,
    slideIndex = 0,
    initPropertiesSection = function() {
      let $slider = $(slider),
        slides = qa(slidesSelector, slider),
        prevBtn = q('.rd-properties__items-prev', sliderParent),
        nextBtn = q('.rd-properties__items-next', sliderParent),
        // createArrow = function(dir) {
          // return '<button type="button" class="rd-properties__items-' + dir + '"></button>';
        // },
        slide = function(e) {
          let target = e.target,
            parent = target.closest('.rd-properties__item'),
            lastActiveElement = activeElement;;

          if (target.classList.contains('rd-properties__item') || parent) {
            activeElement = parent;
          } else if (target === prevBtn && slideIndex !== 0) {
            activeElement = activeElement.previousElementSibling;
          } else if (target === nextBtn && slideIndex + 1 !== slides.length) {
            activeElement = activeElement.nextElementSibling;
          } else {
            return;
          }

          lastActiveElement.classList.remove('active');
          activeElement.classList.add('active');

          itemsDescription.style.opacity = 0;
        
          for (let i = 0, len = slides.length; i < len; i++) {
            if (slides[i] === activeElement) {
              slideIndex = i;
              slider.style.transform = 'translate3d(-' + 203 * slideIndex + 'px, 0, 0)';
              itemsDescription.textContent = slides[slideIndex].getAttribute('data-descr');
              break;
            }
          }
        },
        changeDescription = function(e) {
          if (e.propertyName === 'opacity') {
            if (e.target.style.opacity == 0) {
              e.target.style.opacity = 1;
            }
          }
        },
        buildSlider = function() {
          if (media('(min-width:1279.98px)')) {
            if (SLIDER.hasSlickClass($slider)) {
              SLIDER.unslick($slider)
            }
            activeElement = firstSlide;

            firstSlide.classList.add('active');

            [prevBtn, nextBtn, slider].forEach(el => el.addEventListener('click', slide))

            itemsDescription.addEventListener('transitionend', changeDescription);

            slider.style.transform = 'translate3d(0, 0, 0)';

          } else {
            if (SLIDER.hasSlickClass($slider)) {
              return;
            }
            if (slides.length && slides.length > 1) {
              $slider.on('beforeChange', function(e, slick, prevSlide, nextSlide) {
                if (prevSlide !== nextSlide) {
                  itemsDescription.textContent = slick.$slides[nextSlide].getAttribute('data-descr');
                }
              });
              $slider.slick({
                appendDots: $('.rd-properties__nav', slider.parentElement),
                slide: slidesSelector,
                arrows: false,
                infinite: false,
                dots: true,
                // draggable: false,
                dotsClass: 'rd-properties__dots dots',
                customPaging: function() {
                  return SLIDER.dot;
                },
                // mobileFirst: true,
                // responsive: [{
                //   breakpoint: 1279.98,
                //   settings: {
                //     initialSlide: 1,
                //     variableWidth: true,
                //     dots: false,
                //     arrows: true
                //     // slidesToShow:
                //   }
                // }]
              });
            }
          }
        };


      if (!itemsDescription.textContent) {
        itemsDescription.textContent = firstSlide.getAttribute('data-descr');
      }

      buildSlider();
      windowFuncs.resize.push(buildSlider);

      slider.removeEventListener('lazyloaded', initPropertiesSection);
    };

    slider.addEventListener('lazyloaded', initPropertiesSection);
})();