$(document).ready(function() {
    $('.js-item-select-control--plus').on('click', function(e) {
        let select = $(this).closest('.js-item-select');
        let input = select.find('.item-select__input');
        let value = select.find('.item-select__value');
        let curentVal = parseInt(input.val());
        let count = parseInt(input.val()) + 1 + ' ' + 'м';

        input.removeAttr('style').val(count);

        if (curentVal > 0) {
            input.change();
        } else {
            input.val(1 + 'м');
        }

        value.children('.item-select__title').css('display', 'none');
        e.stopPropagation();
    });

    $('.js-item-select-control--minus').on('click', function() {
        let select = $(this).closest('.js-item-select');
        let input = select.find('.item-select__input');
        let value = select.find('.item-select__value');
        let curentVal = parseInt(input.val());
        let count = parseInt(input.val()) - 1 + ' ' + 'м';

        if (curentVal > 1) {
            count = count < 1 ? 1 : count;
            input.val(count);
            input.change();
            select.removeClass('is-close');
        } else {
            value.children('.item-select__title').removeAttr('style');
            input.css('display', 'none');
            select.removeClass('is-active');
        }
        return false;
    });

    //Search Hint
    if ($('.js-search-input').length > 0) {
        var searchInput = $('.js-search-input');
        searchInput.on('keyup', function() {
            var hint = $(this)
                .closest('.js-search')
                .find('.search__hint');
            if ($(this).val() !== '') {
                hint.removeAttr('style');
            } else {
                hint.css('display', 'none');
            }
        });
    }

    //Card Adress Map
    if ($('#contacts-map').length > 0) {
        ymaps.ready(init);
        var myMap, myPlacemark, myPin;

        function init() {
            myMap = new ymaps.Map('contacts-map', {
                center: [55.73226853, 37.6209191],
                zoom: 16
            });

            myMap.behaviors.disable(['scrollZoom']);

            myMap.controls
                .remove('searchControl')
                .remove('typeSelector')
                .add('routeEditor');

            myPin = new ymaps.GeoObjectCollection(
                {},
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/general/map-pin.svg',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-3, -42]
                }
            );

            myPlacemark = new ymaps.Placemark([55.73226853, 37.6209191], {
                balloonContentHeader:
                    '<span class="map-pin__title">BAZAAR-TEX</span>',
                balloonContentBody:
                    '<span class="map-pin__place">ул. Большая Полянка, 51А/9, Московский р-н</span>'
            });

            myPin.add(myPlacemark);
            myMap.geoObjects.add(myPin);
        }
    }

    //Price Slider
    if ($('.js-catalog-filter-item-price').length > 0) {
        var slider = document.getElementById('js-catalog-filter-slider');
        var allPriceStart = $('#js-catalog-filter-slider').data('start');
        var allPriceEnd = $('#js-catalog-filter-slider').data('end');
        var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
        var startPrice;
        var endPrice;

        if (spans[0].text() == '') {
            startPrice = allPriceStart;
        } else {
            startPrice = parseInt(spans[0].text());
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
                min: allPriceStart,
                max: allPriceEnd
            }
        });
        slider.noUiSlider.on('update', function(values, handle) {
            spans[handle].text(values[handle]);
        });
    }
});
