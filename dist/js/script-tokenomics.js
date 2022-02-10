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

;(function() {
  let chartData = q('.distribution-chart__data');
    // dataColors = qa('.distribution-chart__data-item-color', chartData),
    dataNumbers = qa('.distribution-chart__data-item-title', chartData),
    dataLabels = qa('.distribution-chart__data-item-descr', chartData),
    tooltip = q('.tokenomics-distribution__chart-tooltip'),
    data = {
      'colors': ['#66A6FF', '#36BF49', '#BC29E1', '#F5576C', '#FEBD60', '#9B23EA'],
      // 'colors': [],
      'numbers': [],
      'labels': []
    };
  
  // dataColors.forEach(el => data['colors'].push(el.style.background));
  dataNumbers.forEach(el => data['numbers'].push(el.textContent.slice(0, -1)));
  dataLabels.forEach(el => data['labels'].push(el.textContent));

  tooltip.addEventListener('transitionend', function(e) {
    let styles = getComputedStyle(tooltip);
    if (styles.opacity == 0) {
      tooltip.innerHTML = '';
    }
  });

  let ctx = document.querySelector('.distribution-chart').getContext('2d'),
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data['labels'],
        datasets: [{
          data: data['numbers'],
          backgroundColor: data['colors'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        onHover: function(e, elements, oo) {
          console.log(arguments);
          if (elements && elements.length) {
            let context = elements[0].element.$context,
              number = context.parsed,
              index = context.index,
              legend = oo.legend.legendItems[index].text;

            tooltip.innerHTML = number + '%<br>' + legend;
          }
        },
        cutout: 0,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        onMouseLeave: function() {
          console.log(arguments);
        }
      }
    });
})();

//=include ../sections/title-descr-link/title-descr-link.js

//=include ../sections/footer/footer.js

});