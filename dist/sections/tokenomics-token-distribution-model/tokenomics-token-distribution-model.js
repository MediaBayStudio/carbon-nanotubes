;(function() {
  let ctx = q('.distribution-chart').getContext('2d'),
    chartData = q('.distribution-chart__data');
    // dataColors = qa('.distribution-chart__data-item-color', chartData),
    dataNumbers = qa('.distribution-chart__data-item-title', chartData),
    dataLabels = qa('.distribution-chart__data-item-descr', chartData),
    tooltip = q('.tokenomics-distribution__chart-tooltip'),
    data = {
      'colors': ['#66A6FF', '#36BF49', '#BC29E1', '#F5576C', '#FEBD60', '#9B23EA'],
      // 'colors': [],
      'numbers': [],
      'labels': []
    },
    componentFromStr = function(numStr, percent) {
      var num = Math.max(0, parseInt(numStr, 10));
      return percent ? Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
    },
    rgbToHex = function(rgb) {
      var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
      var result, r, g, b, hex = "";
      if ( (result = rgbRegex.exec(rgb)) ) {
          r = componentFromStr(result[1], result[2]);
          g = componentFromStr(result[3], result[4]);
          b = componentFromStr(result[5], result[6]);
  
          hex = '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
      return hex;
    },
    lightenColor = function(color, percent) {
      var num = parseInt(color.replace("#",""),16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = (num >> 8 & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    },
    gradient1 = ctx.createLinearGradient(318, 282, 0, 0),
    gradient2 = ctx.createLinearGradient(0, 500, 0, 0),
    gradient3 = ctx.createLinearGradient(250, 0, 0, 0),
    gradient4 = ctx.createLinearGradient(500, 0, 0, 0),
    gradient5 = ctx.createLinearGradient(250, 0, 0, 0),
    gradient6 = ctx.createLinearGradient(250, 0, 0, 0),

    gradient1Hover = ctx.createLinearGradient(318, 282, 0, 0),
    gradient2Hover = ctx.createLinearGradient(0, 500, 0, 0),
    gradient3Hover = ctx.createLinearGradient(250, 0, 0, 0),
    gradient4Hover = ctx.createLinearGradient(500, 0, 0, 0),
    gradient5Hover = ctx.createLinearGradient(250, 0, 0, 0),
    gradient6Hover = ctx.createLinearGradient(250, 0, 0, 0),

    gradient1.addColorStop(0, "rgb(137, 247, 254)");
    gradient1.addColorStop(0.8686868686868687, "rgb(102, 166, 255)");
    gradient1.addColorStop(1, "rgb(102, 166, 255)");

    gradient1Hover.addColorStop(0, lightenColor(rgbToHex("rgb(137, 247, 254)"), 20));
    gradient1Hover.addColorStop(0.8686868686868687, lightenColor(rgbToHex("rgb(102, 166, 255)"), 20));
    gradient1Hover.addColorStop(1, lightenColor(rgbToHex("rgb(102, 166, 255)"), 20));
    
    gradient2.addColorStop(0, "rgb(178, 222, 80)");
    gradient2.addColorStop(0.4494949494949495, "rgb(179, 222, 80)");
    gradient2.addColorStop(0.898989898989899, "rgb(54, 191, 73)");
    gradient2.addColorStop(0.1, "rgb(54, 191, 73)");

    gradient2Hover.addColorStop(0, lightenColor(rgbToHex("rgb(178, 222, 80)"), 20));
    gradient2Hover.addColorStop(0.4494949494949495, lightenColor(rgbToHex("rgb(179, 222, 80)"), 20));
    gradient2Hover.addColorStop(0.898989898989899, lightenColor(rgbToHex("rgb(54, 191, 73)"), 20));
    gradient2Hover.addColorStop(0.1, lightenColor(rgbToHex("rgb(54, 191, 73)"), 20));

    gradient3.addColorStop(0, "rgb(195, 112, 244)");
    gradient3.addColorStop(0.5, "rgb(196, 113, 245)");
    gradient3.addColorStop(0.9292929292929293, "rgb(188, 41, 225)");
    gradient3.addColorStop(1, "rgb(188, 41, 225)");

    gradient3Hover.addColorStop(0, lightenColor(rgbToHex("rgb(195, 112, 244)"), 20));
    gradient3Hover.addColorStop(0.5, lightenColor(rgbToHex("rgb(196, 113, 245)"), 20));
    gradient3Hover.addColorStop(0.9292929292929293, lightenColor(rgbToHex("rgb(188, 41, 225)"), 20));
    gradient3Hover.addColorStop(1, lightenColor(rgbToHex("rgb(188, 41, 225)"), 20));

    gradient4.addColorStop(0, "rgb(239, 146, 250)");
    gradient4.addColorStop(0.4797979797979798, "rgb(240, 147, 251)");
    gradient4.addColorStop(0.898989898989899, "rgb(245, 87, 108)");
    gradient4.addColorStop(1, "rgb(245, 87, 108)");

    gradient4Hover.addColorStop(0, lightenColor(rgbToHex("rgb(239, 146, 250)"), 20));
    gradient4Hover.addColorStop(0.4797979797979798, lightenColor(rgbToHex("rgb(240, 147, 251)"), 20));
    gradient4Hover.addColorStop(0.898989898989899, lightenColor(rgbToHex("rgb(245, 87, 108)"), 20));
    gradient4Hover.addColorStop(1, lightenColor(rgbToHex("rgb(245, 87, 108)"), 20));

    gradient5.addColorStop(0, "rgb(255, 218, 120)");
    gradient5.addColorStop(0.5, "rgb(255, 219, 121)");
    gradient5.addColorStop(0.9191919191919192, "rgb(254, 189, 96)");
    gradient5.addColorStop(1, "rgb(254, 189, 96)");

    gradient5Hover.addColorStop(0, lightenColor(rgbToHex("rgb(255, 218, 120)"), 20));
    gradient5Hover.addColorStop(0.5, lightenColor(rgbToHex("rgb(255, 219, 121)"), 20));
    gradient5Hover.addColorStop(0.9191919191919192, lightenColor(rgbToHex("rgb(254, 189, 96)"), 20));
    gradient5Hover.addColorStop(1, lightenColor(rgbToHex("rgb(254, 189, 96)"), 20));

    gradient6.addColorStop(0, "rgb(95, 113, 188)");
    gradient6.addColorStop(0.5, "rgb(95, 114, 189)");
    gradient6.addColorStop(0.898989898989899, "rgb(155, 35, 234)");
    gradient6.addColorStop(1, "rgb(155, 35, 234)");

    gradient6Hover.addColorStop(0, lightenColor(rgbToHex("rgb(95, 113, 188)"), 20));
    gradient6Hover.addColorStop(0.5, lightenColor(rgbToHex("rgb(95, 114, 189)"), 20));
    gradient6Hover.addColorStop(0.898989898989899, lightenColor(rgbToHex("rgb(155, 35, 234)"), 20));
    gradient6Hover.addColorStop(1, lightenColor(rgbToHex("rgb(155, 35, 234)"), 20));

  data['colors'][0] = gradient1;
  data['colors'][1] = gradient2;
  data['colors'][2] = gradient3;
  data['colors'][3] = gradient4;
  data['colors'][4] = gradient5;
  data['colors'][5] = gradient6;
  
  // dataColors.forEach(el => data['colors'].push(el.style.background));
  dataNumbers.forEach(el => data['numbers'].push(el.textContent.slice(0, -1)));
  dataLabels.forEach(el => data['labels'].push(el.textContent));

  tooltip.addEventListener('transitionend', function(e) {
    let styles = getComputedStyle(tooltip);
    if (styles.opacity == 0) {
      tooltip.innerHTML = '';
    }
  });

  let chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data['labels'],
        datasets: [{
          data: data['numbers'],
          backgroundColor: data['colors'],
          borderWidth: 0,
          rotation: -90,
          hoverBackgroundColor: [
            gradient1Hover,
            gradient2Hover,
            gradient3Hover,
            gradient4Hover,
            gradient5Hover,
            gradient6Hover
          ]
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