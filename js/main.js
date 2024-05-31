"use strict";

// jQuery(document).ready(function ($) {

// ==== rezet focus ====

function setFocus() {
  var button = document.querySelectorAll('a, button, label, input');
  var isMouseDown = false;
  for (var i = 0; i < button.length; i++) {
    var el = button[i];
    if (el.tagName !== 'LABEL') {
      el.classList.add('focus');
    }
    el.addEventListener('mousedown', function () {
      this.classList.remove('focus');
      isMouseDown = true;
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === "Tab") {
        isMouseDown = false;
      }
    });
    el.addEventListener('focus', function () {
      if (isMouseDown) {
        this.classList.remove('focus');
      }
    });
    el.addEventListener('blur', function () {
      this.classList.add('focus');
    });
  }
}
setFocus();

/**************** 
		navigation 
****************/

// ===== scroll up show btn =====

(function () {
  var btnUp = document.querySelector('[data-up]');
  function scrollUp() {
    window.scrollBy(0, -80);
    if (window.pageYOffset > 0) {
      requestAnimationFrame(scrollUp);
    }
  }
  var lastScrollPos = 0;
  var start = true;
  function showBtnUp() {
    if (start) {
      start = false;
      setTimeout(function () {
        var scrollPos = window.pageYOffset;
        if (scrollPos > 600 && scrollPos < lastScrollPos) {
          btnUp.classList.add('show');
        } else {
          btnUp.classList.remove('show');
        }
        lastScrollPos = scrollPos;
        start = true;
      }, 200);
    }
  }
  if (btnUp) {
    // btnUp.addEventListener('click', scrollUp);
    document.addEventListener('scroll', showBtnUp);
  }
})();

/****************
		animation
****************/

// === smooth scrolling ===

const lenis = new Lenis({
  // duration: 2.0,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/**************** 
			slider 
****************/

// review__slider

$('.review__slider').on('init reInit afterChange', getSlide);
function getSlide(event, slick, currentSlide) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  if (i < 10) {
    i = '0' + i;
  }
  var all = slick.slideCount;
  // if (all < 10) { all = '0' + all; }

  $('.paging').html('<span class="paging__current">' + i + '</span>' + ' / ' + '<span class="paging__all">' + all + '</span>');
}
$('.review__slider').slick({
  prevArrow: $('.review__prev'),
  nextArrow: $('.review__next'),
  variableWidth: true,
  // infinite: false,
  mobileFirst: true,
  responsive: [{
    breakpoint: 767,
    settings: {
      variableWidth: false
    }
  }]
});

// report__slider

$('.report__slider').on('init reInit afterChange', getHeight);
function getHeight() {
  var elem = document.querySelector('.report__wrap-slider');
  if (elem) {
    elem.style.minHeight = elem.scrollHeight + 'px';
    if (typeof lenis !== "undefined") {
      lenis.resize();
    }
  }
}
$('.report__slider').slick({
  prevArrow: $('.report__prev'),
  nextArrow: $('.report__next'),
  // infinite: false,
  variableWidth: true,
  // autoplay: true,
  // autoplaySpeed: 3000,
  mobileFirst: true,
  responsive: [{
    breakpoint: 767,
    settings: {
      variableWidth: false,
      slidesToShow: 2,
      centerMode: true,
      centerPadding: '10vw'
    }
  }, {
    breakpoint: 1199,
    settings: {
      variableWidth: false,
      slidesToShow: 3,
      centerMode: true,
      centerPadding: '15vw'
    }
  }]
});

// ===== spoiler jQuery  =====

(function () {
  var $allBtn = $('[data-spoiler] [data-btn]');
  $allBtn.filter('.active').next().slideDown(0);
  $allBtn.click(function () {
    var $parent = $(this).closest('[data-spoiler]');
    var $attr = $parent.attr('data-spoiler');
    var $btn = $parent.find('[data-btn]');
    if ($attr === 'toggle') {
      $btn.not($(this)).removeClass('active').attr('aria-expanded', false);
      $btn.not($(this)).parent().removeClass('active').attr('aria-expanded', false);
      $btn.next().not($(this).next()).slideUp(500);
      $(this).toggleClass('active').next().slideToggle(500);
      $(this).parent().toggleClass('active');
      toggleAttr.call($(this));
    } else if ($attr === 'one') {
      $btn.not($(this)).removeClass('active').attr('aria-expanded', false);
      $btn.next().not($(this).next()).slideUp(500);
      $(this).addClass('active').attr('aria-expanded', true).next().slideDown(500);
    } else {
      // multiple
      $(this).toggleClass('active').next().slideToggle(500);
      $(this).parent().toggleClass('active');
      toggleAttr.call($(this));
    }
  });
  function toggleAttr() {
    if ($(this).attr('aria-expanded') === 'true') {
      $(this).attr('aria-expanded', 'false');
    } else {
      $(this).attr('aria-expanded', 'true');
    }
  }
})();

// });