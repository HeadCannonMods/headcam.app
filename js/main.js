(function () {
  'use strict';

  var demo = document.querySelector('.demo');
  if (demo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    demo.removeAttribute('autoplay');
    demo.pause();
  }
})();
