//Search Hint
if ($('.js-search-input').length > 0) {
    var searchInput = $('.js-search-input');
    searchInput.on('keyup', function () {
        var hint = $(this).closest('.js-search').find('.search__hint');
        if ($(this).val() != '') {
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    });
}

//Card Adress Map
if ($('#contacts-map').length > 0) {
    ymaps.ready(init);
    var myMap,
        myPlacemark,
        myPin;

    function init() {
        myMap = new ymaps.Map('contacts-map', {
            center: [55.73226853, 37.62091910],
            zoom: 16
        });

        myMap.behaviors.disable(['scrollZoom']);

        myMap.controls
            .remove('searchControl')
            .remove('typeSelector')
            .add('routeEditor');

        myPin = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/general/map-pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });

        myPlacemark = new ymaps.Placemark([55.73226853, 37.62091910], {
            balloonContentHeader: '<span class="map-pin__title">BAZAAR-TEX</span>',
            balloonContentBody: '<span class="map-pin__place">ул. Большая Полянка, 51А/9, Московский р-н</span>'
        });

        myPin.add(myPlacemark);
        myMap.geoObjects.add(myPin);
    }
}