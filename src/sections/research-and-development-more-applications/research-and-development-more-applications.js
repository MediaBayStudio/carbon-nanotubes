;
(function() {
  let faqList = q('.rd-more-apps__items'),
    firstPic = q('picture', faqList),
    faqHdrClass = '.rd-more-apps__item-title',
    clickTragetClasses = [
      'rd-more-apps__item-title'
    ],
    faqItemClass = '.rd-more-apps__item';

  

  if (faqList) {
    let initDropdown = function() {
      let faqBlocks = faqList.children,
        hideBlocks = function() {
          for (var i = faqBlocks.length - 1; i >= 0; i--) {
            faqBlocks[i].style.maxHeight = q(faqHdrClass, faqBlocks[i]).scrollHeight + 'px';
          }
        }
        dropdownText = function(element) {

          if (typeof element === 'number') {
            element = faqBlocks[element];
            hideBlocks();
          } else if (!element) {
            hideBlocks();
            return;
          }

          let parent = element.closest(faqItemClass),
            activeElement = q('.active', faqList);

          if (parent) {
            parent.classList.add('active');
            parent.style.maxHeight = parent.scrollHeight + 'px'
          }

          if (activeElement) {
            activeElement.classList.remove('active');
            activeElement.style.maxHeight = q(faqHdrClass, activeElement).scrollHeight + 'px';
          }
        };

      windowFuncs.resize.push(dropdownText);

      dropdownText(0);

      faqList.addEventListener('click', function(e) {
        let target = e.target;

        if (clickTragetClasses.some(className => target.classList.contains(className))) {
          dropdownText(target);
        }
        
      });
    };
    firstPic.addEventListener('lazyloaded', initDropdown);
  }
})();