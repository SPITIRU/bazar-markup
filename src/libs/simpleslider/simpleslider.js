/*
 * MODULE: default FILE: simpleslider/simpleslider.js
 */
(function($) {

	var methods = {
		init: function( options ) {

			var settings = $.extend( {
				'startIndex'         : 0,
				'typeImage'          : 'cover',
				'autoHide'           : true,
				'container'          : window,
				'containerExtraBtns' : '.object',
				'parentExtraBtns'    : '.js-parent-extra-simple-slider',
				'eventExtraBtns'     : 'mouseenter',
				'showFirstSlideOnOut': true,
				'autoResizeImage'    : true
			}, options);

			return this.each(function() {
				var $this = $(this),
					data = $this.data('simpleslider'),
					arrayImages = [],
					currIndex = settings.startIndex;
					$prevButton = $([]),
					$nextButton = $([]),
					$imageContainer = $([]);

				var $prevContainer = $('<div/>', {
										'class': 'ss-prev-slide'
									}),
					$nextContainer = $('<div/>', {
										'class': 'ss-next-slide'
									}),
					$imgContainer = $('<img/>', {
										'class': 'ss-image'
									});

				// Р•СЃР»Рё РїР»Р°РіРёРЅ РµС‰С‘ РЅРµ РїСЂРѕРёРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°РЅ
				if(!data) {
					/* РўСѓС‚ РІС‹РїРѕР»РЅСЏРµРј РёРЅРёС†РёР°Р»РёР·Р°С†РёСЋ */
					// СЃРѕР·РґР°РµРј РјР°СЃСЃРёРІ СЃ РєР°СЂС‚РёРЅРєР°РјРё
					if($this.data('ss-images')) {
						arrayImages = $this.data('ss-images').split(';');
					}

					if(arrayImages.length) {
						// РґРѕР±Р°РІР»СЏРµРј РЅРµРѕР±С…РґРёРјС‹Рµ СЌР»РµРјРµРЅС‚С‹
						$this
							.addClass('simple-slider-container')
							.append($prevContainer)
							.append($nextContainer)
							.append($imgContainer);

						$prevButton = $this.find('.ss-prev-slide');
						$nextButton = $this.find('.ss-next-slide');
						$parentExtraButtons = $this.closest(settings.containerExtraBtns).find(settings.parentExtraBtns);
						$extraButtons = $parentExtraButtons.find('.js-extra-simple-slider');
						$imageContainer = $this.find('.ss-image');

						if(settings.autoHide) {
							$this.addClass('auto-hide');
						}

						// Р·Р°РїРёСЃС‹РІР°РµРј РІ РґР°С‚Сѓ РїР°СЂР°РјРµС‚СЂС‹ СЃР»Р°Р№РґРµСЂР°
						$this.data('simpleslider', {
							target: $this,
							container: settings.container,
							autoResizeImage: settings.autoResizeImage,
							imagesPath: arrayImages,
							images: [],
							currIndex: currIndex,
							imageContainer: $imageContainer,
							containerExtraBtns: settings.containerExtraBtns,
							loaded: false
						});

						// РїРѕРєР°Р·С‹РІР°РµРј РїРµСЂРІС‹Р№ СЃР»Р°Р№РґРµСЂ
						changeSlide(currIndex, $this);

						// СЃРѕР±С‹С‚РёСЏ РїРµСЂРµРєР»СЋС‡РµРЅРёСЏ СЃР»Р°Р№РґРѕРІ
						$prevButton.on('click', function(e) {
							e.preventDefault();
							$this.simpleslider('showPrevSlide');
						});

						$nextButton.on('click', function(e) {
							e.preventDefault();
							$this.simpleslider('showNextSlide');
						});

						$extraButtons.on(settings.eventExtraBtns, function(e) {
							e.preventDefault();

							var
								$target = $(e.target),
								targetTag = $target[0].tagName.toLowerCase(),
								$elementList = null,
								$listElements = null,
								elementListIndex = null;

							if(targetTag !== 'li') {
								$elementList = $target.closest('li');
							} else {
								$elementList = $target;
							}

							$listElements = $elementList.closest('ul').find('li');
							elementListIndex = $listElements.index($elementList);

							if(elementListIndex + 1) {
								showSlide(elementListIndex + (settings.startIndex + 1), $this);
								$this.trigger('simpleslider:extraSlide');
							}

						})

						if(settings.showFirstSlideOnOut) {
							$parentExtraButtons.on('mouseleave', function() {
								var
									data = $this.data('simpleslider');
								if (data && typeof data.currIndex !== 'undefined') {
									showSlide(data.currIndex, $this);
								}
							})
						}
					}

					$(settings.container).on('scroll', function() {
						var
							data = $this.data('simpleslider');
						if (data && typeof data.currIndex !== 'undefined') {
							showSlide(data.currIndex, $this);
						}
					})

				}
			});
		},
		// СѓРЅРёС‡С‚РѕР¶РёС‚СЊ СЃР»Р°Р№РґРµСЂ
		destroy: function( ) {

			return this.each(function(){

				var $this = $(this),
					data = $this.data('simpleslider');

				// РїСЂРѕСЃС‚СЂР°РЅСЃС‚РІР° РёРјС‘РЅ СЂСѓР»СЏС‚!!!
				$(data.container).unbind('scroll');
				$(window).unbind('.simpleslider');
				$this.removeData('simpleslider');

			})

		},
		// РїРѕРєР°Р·Р°С‚СЊ РїСЂРµРґС‹РґСѓС‰РёР№ СЃР»Р°Р№РґРµСЂ
		showPrevSlide: function(data) {
			return this.each(function(){
				var $this = $(this),
					data = $this.data('simpleslider');

				if(data) {

					var index = data.currIndex,
						images = data.imagesPath,
						activeIndex = getIndex(index, 'prev', images.length - 1),
						$imageContainer = data.imageContainer;

					if(images[activeIndex] !== undefined) {
						changeSlide(activeIndex, $this);
						data.currIndex = activeIndex;

						$this.trigger('simpleslider:prevSlide');

						var prevIndex = getIndex(activeIndex, 'prev', images.length - 1);
						if(data.images[prevIndex] === undefined) {
							loadImage(data.imagesPath[prevIndex])
								.done(function(image) {
									data.images[prevIndex] = image;
								});
								// .fail(function(image) {
								// 	data.images[prevIndex] = '../img/icons.png';
								// });
						}
					}


				}
			})
		},
		// РїРѕРєР°Р·Р°С‚СЊ СЃР»РµРґСѓСЋС‰РёР№ СЃР»Р°Р№РґРµСЂ
		showNextSlide: function() {
			return this.each(function(){
				var $this = $(this),
					data = $this.data('simpleslider');

				if(data) {
					var index = data.currIndex,
						images = data.imagesPath,
						activeIndex = getIndex(index, 'next', images.length - 1),
						$imageContainer = data.imageContainer;

					if(images[activeIndex] !== undefined) {
						changeSlide(activeIndex, $this);
						data.currIndex = activeIndex;

						$this.trigger('simpleslider:nextSlide');

						var nextIndex = getIndex(activeIndex, 'next', images.length - 1);
						if(data.images[nextIndex] === undefined) {
							loadImage(data.imagesPath[nextIndex])
								.done(function(image) {
									data.images[nextIndex] = image;
								});
								// .fail(function(image) {
								// 	data.images[nextIndex] = '../img/icons.png';
								// });
						}
					}

				}
			})
		},

		// РѕР±РЅРѕРІРёС‚СЊ СЃР»Р°Р№РґРµСЂС‹
		update: function() {
			return this.each(function() {
				var $this = $(this),
					data = $this.data('simpleslider');

				if(data) {
					showSlide(data.currIndex, $this);
				}
			})
		}
	},

	getIndex = function(currIndex, direct, maxIndex) {
		var index = currIndex;

		if(direct === 'prev') {
			index--;
			if(index < 0) {
				return maxIndex;
			} else {
				return index;
			}
		} else if (direct === 'next') {
			index++;
			if (index > maxIndex) {
				return 0;
			} else {
				return index;
			}
		}
	},

	// С„СѓРЅРєС†РёСЏ СЃРјРµРЅС‹ СЃР»Р°Р№РґРµСЂР°
	changeSlide = function(index, $parent) {
		var 
			data = $parent.data('simpleslider');

		if(data) {
			data.currIndex = index;
			showSlide(index, $parent);
		}

	},

	showSlide = function (index, $parent) {
		var 
			data = $parent.data('simpleslider'),
			$imageContainer = null,
			autoResizeImage = null;

		if (!!data && 'imageContainer' in data) {
			$imageContainer = data['imageContainer'];
		}

		if (!!data && 'autoResizeImage' in data) {
			autoResizeImage = data['autoResizeImage'];
		}

		if($imageContainer && imageContainerIsView($imageContainer, window)) {
			if(data.images[index] === undefined) {
				loadImage(data.imagesPath[index])
					.done(function(image) {
						showImage(image, $imageContainer, autoResizeImage);
						data.images[index] = image;
					});
					// .fail(function(image) {
					// 	showImage('../img/icons.png', $imageContainer, autoResizeImage);
					// 	data.images[index] = '../img/icons.png';
					// });
			} else {
				showImage(data.images[index], $imageContainer, autoResizeImage);
			}
		}
	},

	showImage = function(image, $imageContainer, autoResizeImage) {
		clearFormatPhoto($imageContainer);

		if(typeof image === 'object') {
			$imageContainer.attr('src', image.src);

			var 
				proportionWidth = $imageContainer.parent().width() / $imageContainer.width(),
				proportionHeight = $imageContainer.parent().height() / $imageContainer.height(),
				
				respByWidth_width = image.naturalWidth*proportionWidth,
				respByWidth_height = image.naturalHeight*proportionWidth,

				respByHeight_width = image.naturalWidth*proportionHeight,
				respByHeight_height = image.naturalHeight*proportionHeight;

			if(autoResizeImage) {
				if(
					image.naturalHeight < $imageContainer.parent().height()
					|| respByWidth_height < $imageContainer.parent().height()
					|| respByHeight_height < $imageContainer.parent().height()
				) {
					$imageContainer.addClass('h-full');
				} else {
					$imageContainer.addClass('w-full');
				}
			} else {
				$imageContainer.addClass('w-full');
			}
		} else {
			$imageContainer.attr('src', image);
		}

	}

	// СѓРґР»РёС‚СЊ РєР»Р°СЃСЃС‹, РѕС‚РІРµС‡Р°СЋС‰РёРµ Р·Р° СЂР°СЃС‚СЏРіРёРІР°РЅРёРµ С„РѕС‚РѕРє
	clearFormatPhoto = function($imageContainer) {
		$imageContainer.removeClass('w-full');
		$imageContainer.removeClass('h-full');
	},

	// С„СѓРЅРєС†РёСЏ Р·Р°РіСЂСѓР·РєРё С„РѕС‚РѕРє
	loadImage = function(url) {
		// Define a "worker" function that should eventually resolve or reject the deferred object.
		var loadImage = function(deferred) {
			var image = new Image();

			// Set up event handlers to know when the image has loaded
			// or fails to load due to an error or abort.
			image.onload = loaded;
			image.onerror = errored; // URL returns 404, etc
			image.onabort = errored; // IE may call this if user clicks "Stop"

			// Setting the src property begins loading the image.
			image.src = url;

			function loaded() {
				unbindEvents();
				// Calling resolve means the image loaded sucessfully and is ready to use.
				deferred.resolve(image);
			}
			function errored() {
				unbindEvents();
				// Calling reject means we failed to load the image (e.g. 404, server offline, etc).
				deferred.reject(image);
			}
			function unbindEvents() {
				// Ensures the event callbacks only get called once.
				image.onload = null;
				image.onerror = null;
				image.onabort = null;
			}
		};

		// Create the deferred object that will contain the loaded image.
		// We don't want callers to have access to the resolve() and reject() methods,
		// so convert to "read-only" by calling `promise()`.
		return $.Deferred(loadImage).promise();
	},

	imageContainerIsView = function($imageContainer, container) {
		var fold = null,
			containerCoords = {},
			imageWrapperCoords = {},
			$imageWrapper = $imageContainer.parent();

		if(container === window) {
			fold = $(window).scrollTop() + $(window).height();
			containerCoords['top'] = $(window).scrollTop();
			containerCoords['bottom'] = containerCoords['top'] + $(window).height();
		} else {

		}

		imageWrapperCoords['top'] = $imageWrapper.offset().top;
		imageWrapperCoords['bottom'] = imageWrapperCoords['top'] + $imageWrapper.height();

		if(
			(
				imageWrapperCoords.top >= containerCoords.top
				&& imageWrapperCoords.top < containerCoords.bottom
			)
			||
			(
				imageWrapperCoords.bottom > containerCoords.top
				&& imageWrapperCoords.top < containerCoords.top
			)
		) {
			return true;
		}
	};

	$.fn.simpleslider = function( method ) {
		if(methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( ' ' +  method + ' ' );
		}
	};

})( jQuery );