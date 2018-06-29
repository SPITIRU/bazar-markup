'use strict';

$(document).ready(function () {

    $(window).on('load', function () {
        $('body').removeClass('loading');

        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        var scrollBar = $('.js-scroll');
        if (scrollBar.length > 0) {
            scrollBar.niceScroll({
                cursorcolor: '#2c2b2b',
                horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                verge: 500,
                cursorwidth: '4px',
                cursorborder: 'none',
                cursorborderradius: '0'
            });
            scrollBar.mouseover(function () {
                $(this).getNiceScroll().resize();
            });
        }
    });

    // //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });
    }

    // //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0 || $('.js-born-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: '+7 (999) 999-99-99',
            clearIncomplete: true
        });
        $('.js-born-mask').inputmask({
            mask: '99-99-9999',
            clearIncomplete: true
        });
    }

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }
    mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 90 + 'px' }, 300);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.js-go-top').addClass('is-visible');
            if ($('.main').hasClass('catalog') && $(window).width() <= 768) {
                $('.js-go-top').css('bottom', 70);
            } else {
                return false;
            }
        } else {
            $('.js-go-top').removeClass('is-visible');
            $('.js-go-top').removeAttr('style');
        }
    });

    //Stop drag
    $('img').on('dragstart', function (event) {
        event.preventDefault();
    });

    //Footer media <= 480 transform accordeon
    if ($(window).width() <= 480) {
        var footer = $('.js-footer');
        footer.find('.footer-item').addClass('accordeon__item').wrapAll('<div class="accordeon js-accordeon">');
        footer.find('.footer-item__title').addClass('accordeon__title');
        footer.find('.footer-item__content').addClass('accordeon__content');
    }

    //Hamburger btn
    $('.js-hamburger').on('click', function () {
        $(this).toggleClass('on');
        $('.js-nav-main').toggleClass('is-open');
        $('.js-overlay').toggleClass('is-active');
        document.documentElement.style.overflow = document.documentElement.style.overflow === '' ? 'hidden' : '';
        return false;
    });
    //When click outside
    $(document).click(function (e) {
        if ($(e.target).closest('.js-hamburger, .js-nav-main, .js-catalog-filter--show').length) return;
        $('.js-hamburger').removeClass('on');
        $('.js-nav-main').removeClass('is-open');
        $('.js-overlay').removeClass('is-active');
        document.documentElement.style = '';
        e.stopPropagation();
    });

    if ($(window).width() <= 768) {
        //Mobile Nav
        $('.js-nav-main').prependTo('.wrapper ');
        $('.js-main-nav-link--forward').on('click', function (e) {
            e.preventDefault();
            var navItem = $(this).closest('.nav-main__item');
            var navItemDropdown = $(this).closest('.nav-dropdown__item');
            var navItemDropdown2 = navItem.find('.nav-dropdown__item');
            var mainDropdown = $(this).closest('.nav-main__dropdown');

            var title = $(this).text();
            var block = $('<li class="nav-dropdown__title nav-dropdown__title--temp">');

            if (!navItem.hasClass('is-active') && !$(this).hasClass('nav-dropdown__title--link')) {
                navItem.addClass('is-active');
                block.insertAfter(navItem.find('.nav-dropdown__title--link')).text(title);
            } else if (navItem.hasClass('is-active') && !navItemDropdown.hasClass('is-active') && !($(this).hasClass('nav-dropdown__title--link') || $(this).hasClass('nav-dropdown__title--back'))) {
                navItemDropdown.addClass('is-active');
                mainDropdown.css('overflow', 'hidden');
            } else if (navItem.hasClass('is-active') && !navItemDropdown2.hasClass('is-active') && ($(this).hasClass('nav-dropdown__title--link') || $(this).hasClass('nav-dropdown__title--back'))) {
                navItem.removeClass('is-active');
                navItemDropdown.find('.nav-dropdown__title--temp').remove();
            } else if (navItem.hasClass('is-active') && navItemDropdown2.hasClass('is-active') && ($(this).hasClass('nav-dropdown__title--link') || $(this).hasClass('nav-dropdown__title--back'))) {
                navItemDropdown2.removeClass('is-active');
                mainDropdown.removeAttr('style');
            }
        });

        //Mobile Search
        var search = $('.js-search');
        var searchBtnShow = $('.js-mobile-search--show');

        searchBtnShow.on('click', function () {
            if (search.hasClass('is-visible')) {
                search.removeClass('is-visible');
                search.find('.js-search-input').val('');
                search.find('.search__hint').css('display', 'none');
            } else {
                search.addClass('is-visible');
            }
        });

        //Mobile Search when click outside
        $(document).click(function (event) {
            if ($(event.target).closest('.js-mobile-search--show, .js-search').length) return;
            search.removeClass('is-visible');
            search.find('.js-search-input').val('');
            search.find('.search__hint').css('display', 'none');
            event.stopPropagation();
        });
    } else {
        var headerMain = $('.header-main');
        var headerMainClone = $('<div class="header-main--clone">').css('height', 85).insertAfter('.header-main').hide();
        $(window).scroll(function () {
            if ($(this).scrollTop() >= $('.header__top-line').outerHeight()) {
                headerMain.addClass('header--fixed');
                headerMainClone.show();
            } else {
                headerMain.removeClass('header--fixed');
                headerMainClone.hide();
            }
        });
    }

    //Show Password
    $('.js-input-password--show').on('click', function () {
        $(this).css('display', 'none');
        $(this).next().css('display', 'block');
        $(this).parent().find('input[type="password"]').attr('type', 'text');
    });
    //Hide Password
    $('.js-input-password--hide').on('click', function () {
        $(this).css('display', 'none');
        $(this).prev().css('display', 'block');
        $(this).parent().find('input[type="text"]').attr('type', 'password');
    });

    //btn favorite
    $('.js-button-icon--fav').on('click', function (e) {
        if (!$(this).hasClass('is-checked')) {
            $(this).addClass('is-checked');
        } else {
            $(this).removeClass('is-checked');
        }
        e.preventDefault();
    });

    /*
    * Slider.js
    */

    // //Slick Slider https://kenwheeler.github.io/slick/
    //Slider New
    if ($('.js-bz-slider--new').length > 0) {
        $('.js-bz-slider--new').slick({
            nextArrow: '.bz-slider__arrow--next',
            prevArrow: '.bz-slider__arrow--prev',
            arrows: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: false,
            // variableWidth: true,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 426,
                settings: {
                    slidesToShow: 2,
                    autoplay: false,
                    variableWidth: false,
                    arrows: false
                }
            }, {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    }

    //Slider Card
    if ($('.js-bz-slider--card').length > 0 && $('.js-bz-slider--card-nav').length > 0) {
        $('.js-bz-slider--card').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.js-bz-slider--card-nav',
            responsive: [{
                breakpoint: 481,
                settings: {
                    dots: true,
                    fade: false
                }
            }]
        });
        $('.js-bz-slider--card-nav').slick({
            slidesToShow: 7,
            slidesToScroll: 1,
            asNavFor: '.js-bz-slider--card',
            dots: true,
            // centerMode: true,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    centerMode: false
                }
            }, {
                breakpoint: 481,
                settings: 'unslick'
            }]
        });
    }

    //Slider Promo
    if ($('.js-bz-slider--promo').length > 0) {
        $('.js-bz-slider--promo').slick({
            nextArrow: '.bz-slider-promo__arrow--next',
            prevArrow: '.bz-slider-promo__arrow--prev',
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: true
        });
    }

    //Slider Related
    if ($('.js-bz-slider--related').length > 0) {
        $('.js-bz-slider--related').slick({
            arrows: true,
            infinite: true,
            slidesToShow: 8,
            slidesToScroll: 1,
            speed: 500,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: false,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 6
                }
            }, {
                breakpoint: 769,
                settings: {
                    slidesToShow: 5
                }
            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
    }

    /*
    * Catalog.js
    */

    $(document).on('click', '.js-color-item', function (e) {
        var item = $(this).closest('.js-product-item');
        var color = $(this).data('color');
        var img = item.find('.product-item__image');

        img.attr('src', color);
        e.preventDefault();
    });

    //Changer
    $('.js-changer').find('.changer__item').on('click', function () {
        if ($(this).hasClass('is-checked')) {
            return;
        } else {
            $('.js-changer').find('.changer__item').removeClass('is-checked');
            $(this).addClass('is-checked');
            return;
        }
    });

    $('.js-changer').find('.changer__reset').on('click', function (e) {
        var item = $(this).parent('.changer__item');
        if (item.hasClass('is-checked')) {
            item.removeClass('is-checked');
        }
        e.stopPropagation();
    });

    $('.js-catalog-filter-item').find('.catalog-filter__subitem').each(function () {
        var colorBox = $(this).find('.catalog-filter__color');
        var color = colorBox.data('filter-color');
        colorBox.css('background-color', color);
    });

    if ($(window).width() <= 480) {
        $('.js-catalog-filter-item').find('.catalog-filter__content').removeClass('js-scroll');
    }

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
        slider.noUiSlider.on('update', function (values, handle) {
            spans[handle].text(values[handle]);
        });
    }

    //Catalog Filter Action
    $('.js-catalog-filter--show').on('click', function () {
        $('.js-catalog-filter').addClass('is-visible');
        document.documentElement.style.overflow = 'hidden';
    });
    $('.js-catalog-filter--hide').on('click', function () {
        $('.js-catalog-filter').removeClass('is-visible');
        document.documentElement.style = '';
    });

    /*
    * Card.js
    */

    //card tabs
    $('.js-card-tab-related').tabs();
    $('.js-card-tab-related').find('.tab__title').on('click', function () {
        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    if ($('.js-tab').length > 0 && $(window).width() > 480) {
        document.querySelector('.js-tab').addEventListener('click', tabs);
    }

    $('#preview').on('shown.bs.modal', function (e) {
        $('.js-bz-slider--card').resize();
    });

    //Табы
    function tabs(e) {
        var target = e.target;
        if (target.className === 'tab__title') {
            var dataTab = target.getAttribute('data-tab');
            var tabContent = document.querySelectorAll('.tab__content');
            var tabTitle = document.querySelectorAll('.tab__title');
            for (var i = 0; i < tabTitle.length; i++) {
                tabTitle[i].classList.remove('is-active');
            }
            target.classList.add('is-active');
            for (var i = 0; i < tabContent.length; i++) {
                if (dataTab == i) {
                    tabContent[i].style.display = 'block';
                } else {
                    tabContent[i].style.display = 'none';
                }
            }
        }
    }

    //tabs ---> accordeon
    function tabTransform() {
        var tab = $('.js-tab--transform');

        $('.js-tab').unwrap().addClass('accordeon accordeon--other js-accordeon').removeClass('tab__titles');
        tab.find('.tab__title').addClass('accordeon__title').removeClass('tab__title is-active').wrap('<div class="accordeon__item">');

        tab.find('[data-tab-content="0"]').removeAttr('style').insertAfter('[data-tab="0"]').parent().addClass('is-open');
        tab.find('[data-tab-content="1"]').css('display', 'none').insertAfter('[data-tab="1"]');

        tab.find('.tab__content').addClass('accordeon__content').removeClass('tab__content tab__content--product');
        tab.find('.tab__contentes').remove();
    }

    if ($(window).width() <= 480) {
        tabTransform();
    }

    if ($('.js-item-select').length > 0) {
        var changeColor = function changeColor() {
            $('.js-item-select').each(function () {
                var colorBox = $(this).find('.item-select__color');
                var color = colorBox.data('item-select-color');
                colorBox.css('background-color', color);
            }).find('.item-select__item').each(function () {
                var colorBox = $(this).find('.item-select__color');
                var color = colorBox.data('item-select-color');
                colorBox.css('background-color', color);
            });
        };

        $('.js-item-select').not('.js-item-select-control--plus').not('.js-item-select-control--minus').on('click', function () {
            if ($(this).hasClass('is-active')) {
                $('.js-item-select').removeClass('is-active');
                $(this).removeClass('is-active');
            } else {
                $('.js-item-select').removeClass('is-active');
                $(this).addClass('is-active');
            }
        });

        $(document).on('click', function (e) {
            if ($(e.target).closest('.js-item-select').length) return;
            $('.js-item-select').removeClass('is-active');
            e.stopPropagation();
        });

        changeColor();

        $('.js-item-select').find('.item-select__item').on('click', function () {
            var select = $(this).closest('.js-item-select');
            var text = $(this).find('.item-select__title').text();
            var color = $(this).find('.item-select__color').data('item-select-color');
            var value = select.find('.item-select__value');
            var input = select.find('.item-select__input');

            input.val(text);
            value.children('.item-select__color').data('item-select-color', color);
            changeColor();

            if (select.hasClass('item-select--count')) {
                if ($(this).hasClass('item-select__item--header')) {
                    value.children('.item-select__title').removeAttr('style').text('Выбрать');
                    input.css('display', 'none');
                } else {
                    input.removeAttr('style');
                    value.children('.item-select__title').css('display', 'none');
                }
            }
        });
    }

    /*
    * Contacts.js
    */

    //Card Adress Map
    if ($('#contacts-map').length > 0) {
        var init = function init() {
            myMap = new ymaps.Map('contacts-map', {
                center: [55.73226853, 37.6209191],
                zoom: 16
            });

            myMap.behaviors.disable(['scrollZoom']);

            myMap.controls.remove('searchControl').remove('typeSelector').add('routeEditor');

            myPin = new ymaps.GeoObjectCollection({}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/general/map-pin.svg',
                iconImageSize: [30, 42],
                iconImageOffset: [-3, -42]
            });

            myPlacemark = new ymaps.Placemark([55.73226853, 37.6209191], {
                balloonContentHeader: '<span class="map-pin__title">BAZAAR-TEX</span>',
                balloonContentBody: '<span class="map-pin__place">ул. Большая Полянка, 51А/9, Московский р-н</span>'
            });

            myPin.add(myPlacemark);
            myMap.geoObjects.add(myPin);
        };

        ymaps.ready(init);
        var myMap, myPlacemark, myPin;
    }

    /*
    * Components.js
    */

    //Accordeon
    if ($('.js-accordeon').length > 0) {
        var accorderon = $('.js-accordeon');

        accorderon.find('.accordeon__item').not(':first').find('.accordeon__content').slideUp();
        accorderon.find('.accordeon__item:first').addClass('is-open').find('.accordeon__content').slideDown();

        accorderon.find('.accordeon__title').on('click', function () {
            if ($(this).parent().hasClass('is-open')) {
                $(this).parent().removeClass('is-open').find('.accordeon__content').slideUp();
            } else {
                $(this).parent().addClass('is-open').find('.accordeon__content').slideDown();
            }
        });
        if (accorderon.hasClass('lk__accordeon')) {
            $(this).find('.accordeon__title').on('click', function () {
                if ($(this).parent().hasClass('is-open')) {
                    $(this).find('.user-order__info').text('скрыть');
                } else {
                    $(this).find('.user-order__info').text('подробнее');
                }
            });
        }
    }

    //checkbox
    $(document).on('click', '.js-checkbox', function () {
        if ($(this).find('input').is(':checked')) {
            $(this).addClass('is-checked');
        } else {
            $(this).removeClass('is-checked');
        }
    });

    //checkbox--pseudo
    $(document).on('click', '.js-checkbox--pseudo', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
        } else {
            $(this).addClass('is-checked');
        }
    });

    //dropdown
    if ($('.js-dropdown').length > 0) {
        $(document).on('click', '.js-dropdown', function () {
            if ($(this).hasClass('is-active')) {
                $(this).removeClass('is-active');
            } else {
                $('.js-dropdown').removeClass('is-active');
                $(this).addClass('is-active');
            }
        });
        $(document).on('click', function (e) {
            if ($(e.target).closest('.js-dropdown').length) return;
            $('.js-dropdown').removeClass('is-active');
            e.stopPropagation();
        });
    }

    /*
    *Lk.js
    */

    //Sticky Block https://github.com/abouolia/sticky-sidebar
    if ($('.js-stiky-block').length > 0 && $(window).width() > 768) {
        var sidebar = new StickySidebar('.js-stiky-block', {
            topSpacing: 135,
            bottomSpacing: 10,
            containerSelector: '.stiky-content',
            innerWrapperSelector: '.stiky-block__inner'
        });
    }
});

/*
    * Functions.js
    */

//PushUp
function pushUp(text) {
    var text = text || 'Товар добавлен в корзину';
    var pushContainer = $('<div>').addClass('bz-pushUp');
    var pushUpClose = $('<i class="fal fa-times"></i>').addClass('bz-pushUp__close js-pushUp--close');
    pushContainer.appendTo($('body'));
    pushContainer.text(text);
    pushUpClose.appendTo(pushContainer);

    raf(function () {
        pushContainer.addClass('is-active');
    });

    setTimeout(function () {
        pushContainer.removeClass('is-active');
    }, 3500);

    setTimeout(function () {
        pushContainer.remove();
    }, 4000);

    $(document).on('click', '.js-pushUp--close', function () {
        pushContainer.removeClass('is-active');
        setTimeout(function () {
            pushContainer.remove();
        }, 300);
    });
}

//RequestAnimationFrame
function raf(fn) {
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            fn();
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsIm5vdCIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImluaXQiLCJteU1hcCIsInltYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsImJlaGF2aW9ycyIsImRpc2FibGUiLCJjb250cm9scyIsIm15UGluIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwiYmFsbG9vbkNvbnRlbnRIZWFkZXIiLCJiYWxsb29uQ29udGVudEJvZHkiLCJnZW9PYmplY3RzIiwiYWNjb3JkZXJvbiIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJpcyIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwicHVzaFVwIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwiYXBwZW5kVG8iLCJyYWYiLCJzZXRUaW1lb3V0IiwiZm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXOztBQUV6QkYsTUFBRUcsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFXO0FBQzVCSixVQUFFLE1BQUYsRUFBVUssV0FBVixDQUFzQixTQUF0Qjs7QUFFQTtBQUNBLFlBQUlDLFlBQVlOLEVBQUUsWUFBRixDQUFoQjtBQUNBLFlBQUlNLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEJELHNCQUFVRSxVQUFWLENBQXFCO0FBQ2pCQyw2QkFBYSxTQURJO0FBRWpCQyxrQ0FBa0IsS0FGRDtBQUdqQjtBQUNBQyx5QkFBUyxLQUpRO0FBS2pCQyx1QkFBTyxHQUxVO0FBTWpCQyw2QkFBYSxLQU5JO0FBT2pCQyw4QkFBYyxNQVBHO0FBUWpCQyxvQ0FBb0I7QUFSSCxhQUFyQjtBQVVBVCxzQkFBVVUsU0FBVixDQUFvQixZQUFXO0FBQzNCaEIsa0JBQUUsSUFBRixFQUNLaUIsYUFETCxHQUVLQyxNQUZMO0FBR0gsYUFKRDtBQUtIO0FBQ0osS0F0QkQ7O0FBd0JBO0FBQ0EsUUFBSWxCLEVBQUUsWUFBRixFQUFnQk8sTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUJQLFVBQUUsWUFBRixFQUFnQm1CLE9BQWhCLENBQXdCO0FBQ3BCQyx5QkFBYXBCLEVBQUUsSUFBRixFQUFRcUIsSUFBUixDQUFh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YzFHLE1BQWQ7QUFDSCxTQUZELEVBRUcsR0FGSDtBQUdILEtBTEQ7QUFNSDs7QUFFRDtBQUNBLFNBQVM2RyxHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDYjdLLFdBQU84SyxxQkFBUCxDQUE2QixZQUFXO0FBQ3BDOUssZUFBTzhLLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsU0FGRDtBQUdILEtBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxuICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnOTktOTktOTk5OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbk9mZnNldCgpIHtcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xuICAgIH1cbiAgICBtYWluT2Zmc2V0KCk7XG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgODAwKTtcbiAgICB9KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCcgfSwgMzAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vRm9vdGVyIG1lZGlhIDw9IDQ4MCB0cmFuc2Zvcm0gYWNjb3JkZW9uXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xuICAgICAgICBmb290ZXJcbiAgICAgICAgICAgIC5maW5kKCcuZm9vdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKTtcbiAgICB9XG5cbiAgICAvL0hhbWJ1cmdlciBidG5cbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcbiAgICAgICAgICAgICAgICAnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnXG4gICAgICAgICAgICApLmxlbmd0aFxuICAgICAgICApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgICAgICAvL01vYmlsZSBOYXZcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xuXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCh0aXRsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcblxuICAgICAgICBzZWFyY2hCdG5TaG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgODUpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXG4gICAgICAgICAgICAuaGlkZSgpO1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1Nob3cgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgfSk7XG4gICAgLy9IaWRlIFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnByZXYoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgIH0pO1xuXG4gICAgLy9idG4gZmF2b3JpdGVcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICogU2xpZGVyLmpzXG4gICAgKi9cblxuICAgIC8vIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgLy9TbGlkZXIgTmV3XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgQ2FyZFxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQnLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgUHJvbW9cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL1NsaWRlciBSZWxhdGVkXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogOCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogQ2F0YWxvZy5qc1xuICAgICovXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNvbG9yLWl0ZW0nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcbiAgICAgICAgbGV0IGltZyA9IGl0ZW0uZmluZCgnLnByb2R1Y3QtaXRlbV9faW1hZ2UnKTtcbiAgICBcbiAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQ2hhbmdlclxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9fcmVzZXQnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2pzLXNjcm9sbCcpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0tcHJpY2UnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJyk7XG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XG4gICAgICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcbiAgICAgICAgdmFyIHNwYW5zID0gWyQoJyNqc1ByaWNlU3RhcnQnKSwgJCgnI2pzUHJpY2VFbmQnKV07XG4gICAgICAgIHZhciBzdGFydFByaWNlO1xuICAgICAgICB2YXIgZW5kUHJpY2U7XG4gICAgXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBhbGxQcmljZVN0YXJ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBbc3RhcnRQcmljZSwgZW5kUHJpY2VdLFxuICAgICAgICAgICAgY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgbWluOiBhbGxQcmljZVN0YXJ0LFxuICAgICAgICAgICAgICAgIG1heDogYWxsUHJpY2VFbmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHZhbHVlc1toYW5kbGVdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH0pO1xuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICB9KTtcbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXJkLmpzXG4gICAgKi9cblxuICAgIC8vY2FyZCB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS50YWJzKCk7XG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCgnLmpzLXRhYicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7XG4gICAgfVxuICAgIFxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykucmVzaXplKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy/QotCw0LHRi1xuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xuICAgICAgICAgICAgdmFyIHRhYlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuICAgIFxuICAgICAgICAkKCcuanMtdGFiJylcbiAgICAgICAgICAgIC51bndyYXAoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKVxuICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcbiAgICBcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuICAgIFxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLXBsdXMnKVxuICAgICAgICAgICAgLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLW1pbnVzJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcbiAgICBcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodGV4dCk7XG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUNvbG9yKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb250YWN0cy5qc1xuICAgICovXG5cbiAgICAvL0NhcmQgQWRyZXNzIE1hcFxuICAgIGlmICgkKCcjY29udGFjdHMtbWFwJykubGVuZ3RoID4gMCkge1xuICAgICAgICB5bWFwcy5yZWFkeShpbml0KTtcbiAgICAgICAgdmFyIG15TWFwLCBteVBsYWNlbWFyaywgbXlQaW47XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ2NvbnRhY3RzLW1hcCcsIHtcbiAgICAgICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXG4gICAgICAgICAgICAgICAgem9vbTogMTZcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xuICAgIFxuICAgICAgICAgICAgbXlNYXAuY29udHJvbHNcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxuICAgICAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XG4gICAgXG4gICAgICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzAsIDQyXSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIFxuICAgICAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sIHtcbiAgICAgICAgICAgICAgICBiYWxsb29uQ29udGVudEhlYWRlcjpcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj5CQVpBQVItVEVYPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRCb2R5OlxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX19wbGFjZVwiPtGD0LsuINCR0L7Qu9GM0YjQsNGPINCf0L7Qu9GP0L3QutCwLCA1MdCQLzksINCc0L7RgdC60L7QstGB0LrQuNC5INGALdC9PC9zcGFuPidcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcbiAgICAgICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb21wb25lbnRzLmpzXG4gICAgKi9cblxuICAgIC8vQWNjb3JkZW9uXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBhY2NvcmRlcm9uID0gJCgnLmpzLWFjY29yZGVvbicpO1xuICAgIFxuICAgICAgICBhY2NvcmRlcm9uLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKS5ub3QoJzpmaXJzdCcpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XG4gICAgICAgIGFjY29yZGVyb24uZmluZCgnLmFjY29yZGVvbl9faXRlbTpmaXJzdCcpLmFkZENsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlRG93bigpO1xuICAgIFxuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFjY29yZGVyb24uaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiAgICAqIEZ1bmN0aW9ucy5qc1xuICAgICovXG5cbi8vUHVzaFVwXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2J6LXB1c2hVcCcpO1xuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuICAgICAgICAnYnotcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuICAgICk7XG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9LCAzNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xufVxuXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuZnVuY3Rpb24gcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4iXX0=
