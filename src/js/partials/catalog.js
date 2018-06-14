$('.js-product-item').find('.color__item').on('click', function(e) {
	let item = $(this).closest('.js-product-item');
	let color = $(this).data('color');
	let img = item.find('.product-item__image');

	img.attr('src', color);
	e.preventDefault();
});

//Changer
$('.js-changer').find('.changer__item').on('click', function() {
	if ($(this).hasClass('is-checked')) {
		return;
	} else {
		$('.js-changer').find('.changer__item').removeClass('is-checked');
		$(this).addClass('is-checked');
		return;
	}
});

$('.js-changer').find('.changer__reset').on('click', function(e) {
	let item = $(this).parent('.changer__item');
	if (item.hasClass('is-checked')){
		item.removeClass('is-checked');
	}
	e.stopPropagation();
});

$('.js-catalog-filter-item').find('.catalog-filter__subitem').each(function() {
	var colorBox = $(this).find('.catalog-filter__color');
	var color = colorBox.data('filter-color');
	colorBox.css('background-color', color);
});

if($(window).width() <= 480) {
	$('.js-catalog-filter-item').find('.catalog-filter__content').removeClass('js-scroll');
}

if ($('.js-catalog-filter-item-price').length > 0) {

    var slider = document.getElementById('js-catalog-filter-slider');
    var allPriceStart = $('#js-catalog-filter-slider').data('start');
    var allPriceEnd = $('#js-catalog-filter-slider').data('end');
    var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
    var startPrice;
    var endPrice;
    var arrParams;
    var sUrl;

    if (spans[0].text() == '') {
        startPrice = allPriceStart;
    } else {
        startPrice = parseInt(spans[0].text())
    }

    if (spans[1].text() == '') {
        endPrice = allPriceEnd;
    } else {
        endPrice = parseInt(spans[1].text());
    }


    noUiSlider.create(slider, {
        start: [startPrice, endPrice],
        connect: true,
        range: {
            'min': allPriceStart,
            'max': allPriceEnd
        }
    });
    slider.noUiSlider.on('update', function (values, handle) {
        spans[handle].text((values[handle]));
    });
}

//Catalog Filter Action
$('.js-catalog-filter--show').on('click', function() {	
	$('.js-catalog-filter').addClass('is-visible');
	document.documentElement.style.overflow = 'hidden';
});
$('.js-catalog-filter--hide').on('click', function() {	
	$('.js-catalog-filter').removeClass('is-visible');
	document.documentElement.style = '';
});