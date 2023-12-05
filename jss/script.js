// wow js
wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       true,       // default
  live:         true        // default
}
)
wow.init();

// load js
wow = new WOW(
  {
    animateClass: 'animated',
    offset:       100,
    callback:     function(box) {
      console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
    }
  }
);
wow.init();
document.getElementById('moar').onclick = function() {
  var section = document.createElement('section');
  section.className = 'section--purple wow fadeInDown';
  this.parentNode.insertBefore(section, this);
};

// preload
;(function($) {
	$.fn.preloadinator = function(options) {
		'use strict';

		var settings = $.extend({
			scroll: false,
			minTime: 0,
			animation: 'fadeOut',
			animationDuration: 400,
			afterDisableScroll: function() {},
			afterEnableScroll: function() {},
			afterRemovePreloader: function() {}
		}, options),
		preloader = this,
		start = new Date().getTime();

		$.fn.preloadinator.disableScroll = function() {
			$('body').css('overflow', 'hidden');

			if(typeof settings.afterDisableScroll == 'function') {
				settings.afterDisableScroll.call(this);
			}
		}

		$.fn.preloadinator.enableScroll = function() {
			$('body').css('overflow', 'auto');

			if(typeof settings.afterEnableScroll == 'function') {
				settings.afterEnableScroll.call(this);
			}
		}

		$.fn.preloadinator.removePreloader = function() {
			$(preloader)[settings.animation](settings.animationDuration, function() {
				if(settings.scroll === false) { 
					$.fn.preloadinator.enableScroll(); 
				}
				if(typeof settings.afterRemovePreloader == 'function') {
					settings.afterRemovePreloader.call(this);	
				}
			});
		}

		$.fn.preloadinator.minTimeElapsed = function() {
			var now = new Date().getTime(),
			elapsed = now - start;

			if(elapsed >= settings.minTime) {
				return true;
			}
			else {
				return false;
			}
		}

		if(settings.scroll === false) { $.fn.preloadinator.disableScroll(); }

		$(window).on('load', function() {
			if($.fn.preloadinator.minTimeElapsed()) {
				$.fn.preloadinator.removePreloader();
			}
			else {
				var now = new Date().getTime(),
				elapsed = now - start;

				setTimeout($.fn.preloadinator.removePreloader, settings.minTime - elapsed);
			}
		});

	    return this;
	}
}(jQuery));

