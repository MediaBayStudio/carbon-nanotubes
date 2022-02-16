document.addEventListener('DOMContentLoaded', function() {

//=include ../sections/header/header.js

//=include ../sections/mobile-menu/mobile-menu.js

//=include ../sections/index-hero/index-hero.js

//=include ../sections/index-about/index-about.js

//=include ../sections/index-perspective/index-perspective.js

//=include ../sections/index-text-link/index-text-link.js

;
(function() {
  let faqList = q('.index-faq__list'),
    faqHdrClass = '.index-faq__item-question',
    clickTragetClasses = [
      'index-faq__item-question',
      'index-faq__item-cross'
    ],
    faqItemClass = '.index-faq__item';

  

  if (faqList) {
    let faqBlocks = faqList.children,
      dropdownText = function(element) {
        
        if (!element) {
          for (var i = faqBlocks.length - 1; i >= 0; i--) {
            faqBlocks[i].style.maxHeight = q(faqHdrClass, faqBlocks[i]).scrollHeight + 'px';
          }
          return;
        }

        let parent = element.closest(faqItemClass),
          activeElement = q('.active', faqList);

          console.log('parent', parent);


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

    dropdownText();

    faqList.addEventListener('click', function(e) {
      let target = e.target;

      if (clickTragetClasses.some(className => target.classList.contains(className))) {
        dropdownText(target);
      }
      
    });

  }
})();

//=include ../sections/index-contacts/index-contacts.js

;(function() {
  thanksPopup = new Popup('.thanks-popup', {
    closeButtons: '.thanks-popup__btn'
  });
})();

;(function() {
  errorPopup = new Popup('.error-popup', {
    closeButtons: '.error-popup__btn'
  });
})();

//=include ../sections/footer/footer.js

});