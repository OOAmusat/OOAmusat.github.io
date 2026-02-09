/**
 * Responsive Menu Handler
 * Handles mobile navigation toggle and interactions
 */

(function($) {
  'use strict';

  // Mobile Menu Toggle
  function initMobileMenu() {
    // Create mobile menu backdrop if it doesn't exist
    if (!$('.mobile-menu-backdrop').length) {
      $('body').append('<div class="mobile-menu-backdrop"></div>');
    }

    const $menuToggle = $('.menu-toggle');
    const $siteNav = $('.site-nav');
    const $backdrop = $('.mobile-menu-backdrop');
    const $body = $('body');

    // Toggle menu on hamburger click
    $menuToggle.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      $(this).toggleClass('active');
      $siteNav.toggleClass('active');
      $backdrop.toggleClass('active');
      $body.toggleClass('menu-open');
    });

    // Close menu when clicking backdrop
    $backdrop.on('click', function() {
      closeMenu();
    });

    // Close menu when clicking a menu item
    $siteNav.find('.menu-item a').on('click', function() {
      // Small delay to allow navigation
      setTimeout(closeMenu, 300);
    });

    // Close menu on escape key
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape' && $siteNav.hasClass('active')) {
        closeMenu();
      }
    });

    // Close menu function
    function closeMenu() {
      $menuToggle.removeClass('active');
      $siteNav.removeClass('active');
      $backdrop.removeClass('active');
      $body.removeClass('menu-open');
    }

    // Close menu on window resize if open
    let resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if ($(window).width() > 991 && $siteNav.hasClass('active')) {
          closeMenu();
        }
      }, 250);
    });
  }

  // Sticky Header on Scroll
  function initStickyHeader() {
    const $header = $('.header');
    let lastScroll = 0;

    $(window).on('scroll', function() {
      const currentScroll = $(this).scrollTop();

      if (currentScroll > 100) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      const target = $(this.getAttribute('href'));
      
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 80
        }, 600, 'swing');
      }
    });
  }

  // Improve Touch Interactions
  function initTouchImprovements() {
    // Add touch class to body for CSS targeting
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      $('body').addClass('touch-device');
    }

    // Prevent double-tap zoom on buttons
    $('.btn, .menu-toggle, a').on('touchend', function(e) {
      e.preventDefault();
      $(this).trigger('click');
    });
  }

  // Lazy Load Images (if needed)
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Responsive Tables
  function initResponsiveTables() {
    $('table').each(function() {
      const $table = $(this);
      
      // Add responsive wrapper if not exists
      if (!$table.parent().hasClass('table-responsive')) {
        $table.wrap('<div class="table-responsive"></div>');
      }

      // Add data-label attributes for mobile view
      const $headers = $table.find('thead th');
      $table.find('tbody tr').each(function() {
        $(this).find('td').each(function(index) {
          const label = $headers.eq(index).text();
          $(this).attr('data-label', label);
        });
      });
    });
  }

  // Viewport Height Fix for Mobile Browsers
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Initialize all functions
  function init() {
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initTouchImprovements();
    initLazyLoad();
    initResponsiveTables();
    setViewportHeight();

    // Update viewport height on resize and orientation change
    $(window).on('resize orientationchange', function() {
      setViewportHeight();
    });
  }

  // Run on document ready
  $(document).ready(function() {
    init();
  });

  // Also run on window load for safety
  $(window).on('load', function() {
    // Ensure everything is initialized
    if (!$('.mobile-menu-backdrop').length) {
      init();
    }
  });

})(jQuery);
