
import $ from 'jquery';

import hljs from 'highlight.js/lib/highlight.js'
import hljs_pony from 'highlight.js/lib/languages/pony'
import hljs_cpp from 'highlight.js/lib/languages/cpp'
import hljs_json from 'highlight.js/lib/languages/json'
import hljs_bash from 'highlight.js/lib/languages/bash'
import hljs_markdown from 'highlight.js/lib/languages/markdown'
hljs.registerLanguage("pony", hljs_pony);
hljs.registerLanguage("pony-full-source", hljs_pony); // in order to support full source pony listings
hljs.registerLanguage("cpp", hljs_cpp);
hljs.registerLanguage("json", hljs_json);
hljs.registerLanguage("bash", hljs_bash);
hljs.registerLanguage("markdown", hljs_markdown);
hljs.initHighlightingOnLoad();

// sass/scss
require('../sass/theme.sass');

// images
require.context('../img', false, /.+$/);

$(document).ready(function() {
  // Shift nav in mobile when clicking the menu.
  $(document).on('click', "[data-toggle='wy-nav-top']", function () {
    $("[data-toggle='wy-nav-shift']").toggleClass("shift");
    $("[data-toggle='rst-versions']").toggleClass("shift");
  });

  // Close menu when you click a link.
  $(document).on('click', ".wy-menu-vertical .current ul li a", function () {
    $("[data-toggle='wy-nav-shift']").removeClass("shift");
    $("[data-toggle='rst-versions']").toggleClass("shift");
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if ($(e.target).is(':input')) return true;
    var key = e.which || e.keyCode || window.event && window.event.keyCode;
    var page;
    switch (key) {
      case 39:  // right arrow
        page = $('[role="navigation"] a:contains(Next):first').prop('href');
        break;
      case 37:  // left arrow
        page = $('[role="navigation"] a:contains(Previous):first').prop('href');
        break;
      default:
        break;
    }
    if (page) window.location.href = page;
  });

  $(document).on('click', "[data-toggle='rst-current-version']", function () {
    $("[data-toggle='rst-versions']").toggleClass("shift-up");
  });

  // Make tables responsive
  $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");

  //hljs.initHighlighting();

  $('table').addClass('docutils');

  // The code below is a copy of @seanmadsen code posted Jan 10, 2017 on issue 803.
  // https://github.com/mkdocs/mkdocs/issues/803
  // This just incorporates the auto scroll into the theme itself without
  // the need for additional custom.js file.
  //
  $.fn.isFullyWithinViewport = function () {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ( !(
      (bounds.top <= viewport.top) ||
      (bounds.bottom >= viewport.bottom)
    ) );
  };
  if ($('li.toctree-l1.current').length && !$('li.toctree-l1.current').isFullyWithinViewport()) {
    $('.wy-nav-side')
      .scrollTop(
        $('li.toctree-l1.current').offset().top -
        $('.wy-nav-side').offset().top -
        60
      );
  }
});

// PONY SPECIFIC
$(document).ready(function() {
  // source-links styling
  $(".source-link").parent().addClass("source-link-container");

  // full source listings
  var full_source = $('.pony-full-source');
  if (full_source.length) {
    // more space for source code
    $('.wy-nav-content').css("max-width", "1200px");


    var lines = full_source.text().split('\n').length - 1;
    var numbering = $('<code class="code-line-numbers"></code>');
    for (var i = 1; i <= lines; i++) {
      numbering.append(
        $('<code></code>')
          .addClass('code-line-number')
          .append(
            $('<a></a>')
              .text(i)
              .attr('id', 'L' + i)
              .attr('href', '#L' + i)
          )
      );
    }
    full_source
      .addClass('has-numbering')
      .parent()
      .addClass('pony-full-source')
      .append(numbering);

    // manually scroll into view, because some browsers can't,
    // because dom with hash id is not there when loading
    var referencedLine = window.location.hash.substr(1);
    if (referencedLine.length > 0 && referencedLine[0] == 'L') {
      var elem = document.getElementById(referencedLine);
      if (elem !== null) {
        elem.scrollIntoView();
      }
    }
  }
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function () {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function () {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));
