'use strict';

$(document).ready(function () {

    $(window).on("load", function () {
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
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: "+7 (999) 999-99-99",
            clearIncomplete: true
        });
    }

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href    
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
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
    $("img").on("dragstart", function (event) {
        event.preventDefault();
    });

    //Footer media <= 480 transform accordeon
    if ($(window).width() <= 480) {
        var footer = $('.js-footer');
        footer.find('.footer-item').addClass('accordeon__item').wrapAll('<div class="accordeon js-accordeon">');
        footer.find('.footer-item__content').addClass('accordeon__content').css('display', 'none');
        footer.find('.footer-item__title').addClass('accordeon__title');
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

    if ($(window).width() <= 480) {
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
            } else if (navItem.hasClass('is-active') && !navItemDropdown.hasClass('is-active') && !$(this).hasClass('nav-dropdown__title--link')) {
                navItemDropdown.addClass('is-active');
                mainDropdown.css('overflow', 'hidden');
            } else if (navItem.hasClass('is-active') && !navItemDropdown2.hasClass('is-active') && $(this).hasClass('nav-dropdown__title--link')) {
                navItem.removeClass('is-active');
                navItemDropdown.find('.nav-dropdown__title--temp').remove();
            } else if (navItem.hasClass('is-active') && navItemDropdown2.hasClass('is-active') && $(this).hasClass('nav-dropdown__title--link')) {
                navItemDropdown2.removeClass('is-active');
                mainDropdown.removeAttr('style');
            }
        });

        //Mobile Search
        var search = $('.js-search');
        var searchBtnShow = $('.js-mobile-search--show');

        $('.js-mobile-search--show').on('click', function () {
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

    $('.js-bz-slider--card').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        arrows: false,

        fade: true,

        asNavFor: '.js-bz-slider--card-nav',

        responsive: [{

            breakpoint: 481,

            settings: {

                dots: true

            }

        }]

    });

    $('.js-bz-slider--card-nav').slick({

        slidesToShow: 6,

        slidesToScroll: 1,

        asNavFor: '.js-bz-slider--card',

        dots: true,

        centerMode: true,

        focusOnSelect: true,

        responsive: [{

            breakpoint: 1025,

            settings: {

                centerMode: false

            }

        }, {

            breakpoint: 481,

            settings: "unslick"

        }]

    });

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

    $('.js-product-item').find('.color__item').on('click', function (e) {

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

        var arrParams;

        var sUrl;

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

                'min': allPriceStart,

                'max': allPriceEnd

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

    //Табы

    function tabs(e) {

        var target = e.target;

        if (target.className == 'tab__title') {

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

        $('.js-item-select').on('click', function () {

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

        $('.js-item-select-control--plus').on('click', function (e) {

            var select = $(this).closest('.js-item-select');

            var input = select.find('.item-select__input');

            var value = select.find('.item-select__value');

            var curentVal = parseInt(input.val());

            var count = parseInt(input.val()) + 1 + ' ' + 'м';

            input.removeAttr('style').val(count);

            if (curentVal > 0) {

                input.change();
            } else {

                input.val(1 + 'м');
            }

            value.children('.item-select__title').css('display', 'none');

            e.stopPropagation();
        });

        $('.js-item-select-control--minus').on('click', function () {

            var select = $(this).closest('.js-item-select');

            var input = select.find('.item-select__input');

            var value = select.find('.item-select__value');

            var curentVal = parseInt(input.val());

            var count = parseInt(input.val()) - 1 + ' ' + 'м';

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
    }

    /*
    * Components.js
    */

    //Accordeon

    if ($('.js-accordeon').length > 0) {

        $('.js-accordeon').find('.accordeon__title').on('click', function () {

            if ($(this).parent().hasClass('is-open')) {

                $(this).parent().removeClass('is-open').find('.accordeon__content').css('display', 'none');
            } else {

                $(this).parent().addClass('is-open').find('.accordeon__content').removeAttr('style');
            }
        });
    }

    //checkbox

    $(document).on('click', '.js-checkbox', function () {

        if ($(this).find('input').is(':checked')) {

            $(this).addClass('is-checked');
        } else {

            $(this).removeClass('is-checked');
        }
    });

    $(document).on('click', '.js-checkbox--pseudo', function () {

        if ($(this).hasClass('is-checked')) {

            $(this).removeClass('is-checked');
        } else {

            $(this).addClass('is-checked');
        }
    });
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImNlbnRlck1vZGUiLCJmb2N1c09uU2VsZWN0IiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsInZhbHVlcyIsImhhbmRsZSIsInRhYnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJ0YWJUcmFuc2Zvcm0iLCJ0YWIiLCJ1bndyYXAiLCJ3cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCJjdXJlbnRWYWwiLCJjb3VudCIsImNoYW5nZSIsImlzIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBWTs7QUFFMUJGLE1BQUVHLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBWTtBQUM3QkosVUFBRSxNQUFGLEVBQVVLLFdBQVYsQ0FBc0IsU0FBdEI7QUFDQTtBQUNBLFlBQUlDLFlBQVlOLEVBQUUsWUFBRixDQUFoQjtBQUNBLFlBQUlNLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEJELHNCQUFVRSxVQUFWLENBQXFCO0FBQ2pCQyw2QkFBYSxTQURJO0FBRWpCQyxrQ0FBa0IsS0FGRDtBQUdqQjtBQUNBQyx5QkFBUyxLQUpRO0FBS2pCQyx1QkFBTyxHQUxVO0FBTWpCQyw2QkFBYSxLQU5JO0FBT2pCQyw4QkFBYyxNQVBHO0FBUWpCQyxvQ0FBb0I7QUFSSCxhQUFyQjtBQVVBVCxzQkFBVVUsU0FBVixDQUFvQixZQUFZO0FBQzVCaEIsa0JBQUUsSUFBRixFQUFRaUIsYUFBUixHQUF3QkMsTUFBeEI7QUFDSCxhQUZEO0FBR0g7QUFDSixLQW5CRDs7QUFxQkE7QUFDQSxRQUFJbEIsRUFBRSxZQUFGLEVBQWdCTyxNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM1QlAsVUFBRSxZQUFGLEVBQWdCbUIsT0FBaEIsQ0FBd0I7QUFDcEJDLHlCQUFhcEIsRUFBRSxJQUFGLEVBQVFxQixJQUFSLENBQWEsYUFBYjtBQURPLFNBQXhCOztBQUlBckIsVUFBRSxzQkFBRixFQUEwQm1CLE9BQTFCLENBQWtDO0FBQzlCRyxxQ0FBeUIsQ0FBQztBQURJLFNBQWxDO0FBR0g7O0FBRUQ7QUFDQSxRQUFJdEIsRUFBRSxnQkFBRixFQUFvQk8sTUFBcEIsR0FBNkIsQ0FBakMsRUFBb0M7QUFDaENQLFVBQUUsZ0JBQUYsRUFBb0J1QixTQUFwQixDQUE4QjtBQUMxQkMsa0JBQU0sb0JBRG9CO0FBRTFCQyw2QkFBaUI7QUFGUyxTQUE5QjtBQUlIOztBQUVELGFBQVNDLFVBQVQsR0FBc0I7QUFDbEIxQixVQUFFLE9BQUYsRUFBVzJCLEdBQVgsQ0FBZSxhQUFmLEVBQThCM0IsRUFBRSxTQUFGLEVBQWE0QixXQUFiLEVBQTlCO0FBQ0g7QUFDRDVCLE1BQUVHLE1BQUYsRUFBVWUsTUFBVixDQUFpQlEsVUFBakI7O0FBR0E7QUFDQTFCLE1BQUUsWUFBRixFQUFnQkksRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsVUFBVXlCLENBQVYsRUFBYTtBQUNyQ0EsVUFBRUMsY0FBRjtBQUNBOUIsVUFBRSxZQUFGLEVBQWdCK0IsT0FBaEIsQ0FBd0IsRUFBQ0MsV0FBVyxDQUFaLEVBQXhCLEVBQXdDLEdBQXhDO0FBQ0gsS0FIRDs7QUFLQTtBQUNBaEMsTUFBRSxVQUFGLEVBQWNpQyxLQUFkLENBQW9CLFlBQVk7QUFDNUIsWUFBSUMsZUFBZWxDLEVBQUUsSUFBRixFQUFRbUMsSUFBUixDQUFhLE1BQWIsQ0FBbkI7QUFDQSxZQUFJQyxjQUFjcEMsRUFBRWtDLFlBQUYsRUFBZ0JHLE1BQWhCLEdBQXlCQyxHQUEzQztBQUNBdEMsVUFBRSxZQUFGLEVBQWdCK0IsT0FBaEIsQ0FBd0IsRUFBQ0MsV0FBV0ksY0FBYyxFQUFkLEdBQW1CLElBQS9CLEVBQXhCLEVBQThELEdBQTlEO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FMRDtBQU1BcEMsTUFBRUcsTUFBRixFQUFVb0MsTUFBVixDQUFpQixZQUFVO0FBQ3ZCLFlBQUl2QyxFQUFFLElBQUYsRUFBUWdDLFNBQVIsS0FBc0JoQyxFQUFFLElBQUYsRUFBUXdDLE1BQVIsRUFBMUIsRUFBNEM7QUFDeEN4QyxjQUFFLFlBQUYsRUFBZ0J5QyxRQUFoQixDQUF5QixZQUF6QjtBQUNBLGdCQUFJekMsRUFBRSxPQUFGLEVBQVcwQyxRQUFYLENBQW9CLFNBQXBCLEtBQWtDMUMsRUFBRUcsTUFBRixFQUFVd0MsS0FBVixNQUFxQixHQUEzRCxFQUFnRTtBQUM1RDNDLGtCQUFFLFlBQUYsRUFBZ0IyQixHQUFoQixDQUFvQixRQUFwQixFQUE4QixFQUE5QjtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKLFNBUEQsTUFPTztBQUNIM0IsY0FBRSxZQUFGLEVBQWdCSyxXQUFoQixDQUE0QixZQUE1QjtBQUNBTCxjQUFFLFlBQUYsRUFBZ0I0QyxVQUFoQixDQUEyQixPQUEzQjtBQUNIO0FBQ0osS0FaRDs7QUFjQTtBQUNBNUMsTUFBRSxLQUFGLEVBQVNJLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFVBQVV5QyxLQUFWLEVBQWlCO0FBQUNBLGNBQU1mLGNBQU47QUFBdUIsS0FBbEU7O0FBRUE7QUFDQSxRQUFHOUIsRUFBRUcsTUFBRixFQUFVd0MsS0FBVixNQUFxQixHQUF4QixFQUE2QjtBQUN6QixZQUFJRyxTQUFTOUMsRUFBRSxZQUFGLENBQWI7QUFDQThDLGVBQU9DLElBQVAsQ0FBWSxjQUFaLEVBQTRCTixRQUE1QixDQUFxQyxpQkFBckMsRUFBd0RPLE9BQXhELENBQWdFLHNDQUFoRTtBQUNBRixlQUFPQyxJQUFQLENBQVksdUJBQVosRUFBcUNOLFFBQXJDLENBQThDLG9CQUE5QyxFQUFvRWQsR0FBcEUsQ0FBd0UsU0FBeEUsRUFBbUYsTUFBbkY7QUFDQW1CLGVBQU9DLElBQVAsQ0FBWSxxQkFBWixFQUFtQ04sUUFBbkMsQ0FBNEMsa0JBQTVDO0FBQ0g7O0FBRUQ7QUFDQXpDLE1BQUUsZUFBRixFQUFtQkksRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBVztBQUN0Q0osVUFBRSxJQUFGLEVBQVFpRCxXQUFSLENBQW9CLElBQXBCO0FBQ0FqRCxVQUFFLGNBQUYsRUFBa0JpRCxXQUFsQixDQUE4QixTQUE5QjtBQUNBakQsVUFBRSxhQUFGLEVBQWlCaUQsV0FBakIsQ0FBNkIsV0FBN0I7QUFDQWhELGlCQUFTaUQsZUFBVCxDQUF5QkMsS0FBekIsQ0FBK0JDLFFBQS9CLEdBQTBDbkQsU0FBU2lELGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixLQUE0QyxFQUE1QyxHQUFpRCxRQUFqRCxHQUE0RCxFQUF0RztBQUNBLGVBQU8sS0FBUDtBQUNILEtBTkQ7QUFPQztBQUNEcEQsTUFBRUMsUUFBRixFQUFZZ0MsS0FBWixDQUFrQixVQUFTSixDQUFULEVBQVk7QUFDMUIsWUFBSTdCLEVBQUU2QixFQUFFd0IsTUFBSixFQUFZQyxPQUFaLENBQW9CLHVEQUFwQixFQUE2RS9DLE1BQWpGLEVBQXlGO0FBQ3pGUCxVQUFFLGVBQUYsRUFBbUJLLFdBQW5CLENBQStCLElBQS9CO0FBQ0FMLFVBQUUsY0FBRixFQUFrQkssV0FBbEIsQ0FBOEIsU0FBOUI7QUFDQUwsVUFBRSxhQUFGLEVBQWlCSyxXQUFqQixDQUE2QixXQUE3QjtBQUNBSixpQkFBU2lELGVBQVQsQ0FBeUJDLEtBQXpCLEdBQWlDLEVBQWpDO0FBQ0F0QixVQUFFMEIsZUFBRjtBQUNILEtBUEQ7O0FBVUEsUUFBR3ZELEVBQUVHLE1BQUYsRUFBVXdDLEtBQVYsTUFBcUIsR0FBeEIsRUFBNkI7QUFDekI7QUFDQTNDLFVBQUUsY0FBRixFQUFrQndELFNBQWxCLENBQTRCLFdBQTVCO0FBQ0F4RCxVQUFFLDRCQUFGLEVBQWdDSSxFQUFoQyxDQUFtQyxPQUFuQyxFQUE0QyxVQUFTeUIsQ0FBVCxFQUFZO0FBQ3BEQSxjQUFFQyxjQUFGO0FBQ0EsZ0JBQUkyQixVQUFVekQsRUFBRSxJQUFGLEVBQVFzRCxPQUFSLENBQWdCLGlCQUFoQixDQUFkO0FBQ0EsZ0JBQUlJLGtCQUFrQjFELEVBQUUsSUFBRixFQUFRc0QsT0FBUixDQUFnQixxQkFBaEIsQ0FBdEI7QUFDQSxnQkFBSUssbUJBQW1CRixRQUFRVixJQUFSLENBQWEscUJBQWIsQ0FBdkI7QUFDQSxnQkFBSWEsZUFBZTVELEVBQUUsSUFBRixFQUFRc0QsT0FBUixDQUFnQixxQkFBaEIsQ0FBbkI7O0FBRUEsZ0JBQUlPLFFBQVE3RCxFQUFFLElBQUYsRUFBUThELElBQVIsRUFBWjtBQUNBLGdCQUFJQyxRQUFRL0QsRUFBRSw0REFBRixDQUFaOztBQUVBLGdCQUFJLENBQUN5RCxRQUFRZixRQUFSLENBQWlCLFdBQWpCLENBQUQsSUFBa0MsQ0FBQzFDLEVBQUUsSUFBRixFQUFRMEMsUUFBUixDQUFpQiwyQkFBakIsQ0FBdkMsRUFBc0Y7QUFDbEZlLHdCQUFRaEIsUUFBUixDQUFpQixXQUFqQjtBQUNBc0Isc0JBQU1DLFdBQU4sQ0FBa0JQLFFBQVFWLElBQVIsQ0FBYSw0QkFBYixDQUFsQixFQUE4RGUsSUFBOUQsQ0FBbUVELEtBQW5FO0FBQ0gsYUFIRCxNQUdPLElBQUlKLFFBQVFmLFFBQVIsQ0FBaUIsV0FBakIsS0FBaUMsQ0FBQ2dCLGdCQUFnQmhCLFFBQWhCLENBQXlCLFdBQXpCLENBQWxDLElBQTJFLENBQUMxQyxFQUFFLElBQUYsRUFBUTBDLFFBQVIsQ0FBaUIsMkJBQWpCLENBQWhGLEVBQStIO0FBQ2xJZ0IsZ0NBQWdCakIsUUFBaEIsQ0FBeUIsV0FBekI7QUFDQW1CLDZCQUFhakMsR0FBYixDQUFpQixVQUFqQixFQUE2QixRQUE3QjtBQUNILGFBSE0sTUFHQSxJQUFJOEIsUUFBUWYsUUFBUixDQUFpQixXQUFqQixLQUFpQyxDQUFDaUIsaUJBQWlCakIsUUFBakIsQ0FBMEIsV0FBMUIsQ0FBbEMsSUFBNEUxQyxFQUFFLElBQUYsRUFBUTBDLFFBQVIsQ0FBaUIsMkJBQWpCLENBQWhGLEVBQStIO0FBQ2xJZSx3QkFBUXBELFdBQVIsQ0FBb0IsV0FBcEI7QUFDQXFELGdDQUFnQlgsSUFBaEIsQ0FBcUIsNEJBQXJCLEVBQW1Ea0IsTUFBbkQ7QUFDSCxhQUhNLE1BR0EsSUFBSVIsUUFBUWYsUUFBUixDQUFpQixXQUFqQixLQUFpQ2lCLGlCQUFpQmpCLFFBQWpCLENBQTBCLFdBQTFCLENBQWpDLElBQTJFMUMsRUFBRSxJQUFGLEVBQVEwQyxRQUFSLENBQWlCLDJCQUFqQixDQUEvRSxFQUE4SDtBQUNqSWlCLGlDQUFpQnRELFdBQWpCLENBQTZCLFdBQTdCO0FBQ0F1RCw2QkFBYWhCLFVBQWIsQ0FBd0IsT0FBeEI7QUFDSDtBQUNKLFNBdkJEOztBQXlCQztBQUNELFlBQUlzQixTQUFTbEUsRUFBRSxZQUFGLENBQWI7QUFDQSxZQUFJbUUsZ0JBQWdCbkUsRUFBRSx5QkFBRixDQUFwQjs7QUFFQUEsVUFBRSx5QkFBRixFQUE2QkksRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsWUFBVztBQUNoRCxnQkFBSThELE9BQU94QixRQUFQLENBQWdCLFlBQWhCLENBQUosRUFBbUM7QUFDL0J3Qix1QkFBTzdELFdBQVAsQ0FBbUIsWUFBbkI7QUFDQTZELHVCQUFPbkIsSUFBUCxDQUFZLGtCQUFaLEVBQWdDcUIsR0FBaEMsQ0FBb0MsRUFBcEM7QUFDQUYsdUJBQU9uQixJQUFQLENBQVksZUFBWixFQUE2QnBCLEdBQTdCLENBQWlDLFNBQWpDLEVBQTRDLE1BQTVDO0FBQ0gsYUFKRCxNQUlPO0FBQ0p1Qyx1QkFBT3pCLFFBQVAsQ0FBZ0IsWUFBaEI7QUFDRjtBQUNKLFNBUkQ7O0FBVUM7QUFDRHpDLFVBQUVDLFFBQUYsRUFBWWdDLEtBQVosQ0FBa0IsVUFBU1ksS0FBVCxFQUFnQjtBQUM5QixnQkFBSTdDLEVBQUU2QyxNQUFNUSxNQUFSLEVBQWdCQyxPQUFoQixDQUF3QixxQ0FBeEIsRUFBK0QvQyxNQUFuRSxFQUEyRTtBQUMzRTJELG1CQUFPN0QsV0FBUCxDQUFtQixZQUFuQjtBQUNBNkQsbUJBQU9uQixJQUFQLENBQVksa0JBQVosRUFBZ0NxQixHQUFoQyxDQUFvQyxFQUFwQztBQUNBRixtQkFBT25CLElBQVAsQ0FBWSxlQUFaLEVBQTZCcEIsR0FBN0IsQ0FBaUMsU0FBakMsRUFBNEMsTUFBNUM7QUFDQWtCLGtCQUFNVSxlQUFOO0FBQ0gsU0FORDtBQU9ILEtBbERELE1Ba0RPO0FBQ0gsWUFBSWMsYUFBYXJFLEVBQUUsY0FBRixDQUFqQjtBQUNBLFlBQUlzRSxrQkFBa0J0RSxFQUFFLGtDQUFGLEVBQXNDMkIsR0FBdEMsQ0FBMEMsUUFBMUMsRUFBb0QsRUFBcEQsRUFBd0RxQyxXQUF4RCxDQUFvRSxjQUFwRSxFQUFvRk8sSUFBcEYsRUFBdEI7QUFDQXZFLFVBQUVHLE1BQUYsRUFBVW9DLE1BQVYsQ0FBaUIsWUFBVztBQUN4QixnQkFBSXZDLEVBQUUsSUFBRixFQUFRZ0MsU0FBUixNQUF1QmhDLEVBQUUsbUJBQUYsRUFBdUI0QixXQUF2QixFQUEzQixFQUFpRTtBQUM3RHlDLDJCQUFXNUIsUUFBWCxDQUFvQixlQUFwQjtBQUNBNkIsZ0NBQWdCRSxJQUFoQjtBQUNILGFBSEQsTUFHTztBQUNISCwyQkFBV2hFLFdBQVgsQ0FBdUIsZUFBdkI7QUFDQWlFLGdDQUFnQkMsSUFBaEI7QUFDSDtBQUNKLFNBUkQ7QUFTSDs7QUFFRDtBQUNBdkUsTUFBRSwwQkFBRixFQUE4QkksRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVTtBQUNoREosVUFBRSxJQUFGLEVBQVEyQixHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNBM0IsVUFBRSxJQUFGLEVBQVF5RSxJQUFSLEdBQWU5QyxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCO0FBQ0EzQixVQUFFLElBQUYsRUFBUTBFLE1BQVIsR0FBaUIzQixJQUFqQixDQUFzQix3QkFBdEIsRUFBZ0RaLElBQWhELENBQXFELE1BQXJELEVBQTZELE1BQTdEO0FBQ0gsS0FKRDtBQUtBO0FBQ0FuQyxNQUFFLDBCQUFGLEVBQThCSSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFVO0FBQ2hESixVQUFFLElBQUYsRUFBUTJCLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBQ0EzQixVQUFFLElBQUYsRUFBUTJFLElBQVIsR0FBZWhELEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsT0FBOUI7QUFDQTNCLFVBQUUsSUFBRixFQUFRMEUsTUFBUixHQUFpQjNCLElBQWpCLENBQXNCLG9CQUF0QixFQUE0Q1osSUFBNUMsQ0FBaUQsTUFBakQsRUFBeUQsVUFBekQ7QUFDSCxLQUpEOztBQU1BO0FBQ0FuQyxNQUFFLHNCQUFGLEVBQTBCSSxFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUFTeUIsQ0FBVCxFQUFZO0FBQzlDLFlBQUksQ0FBQzdCLEVBQUUsSUFBRixFQUFRMEMsUUFBUixDQUFpQixZQUFqQixDQUFMLEVBQXFDO0FBQ2xDMUMsY0FBRSxJQUFGLEVBQVF5QyxRQUFSLENBQWlCLFlBQWpCO0FBQ0YsU0FGRCxNQUVPO0FBQ0h6QyxjQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixZQUFwQjtBQUNIO0FBQ0R3QixVQUFFQyxjQUFGO0FBQ0gsS0FQRDs7QUFTQTs7OztBQUlBOztBQUVBOztBQUVBLFFBQUk5QixFQUFFLG9CQUFGLEVBQXdCTyxNQUF4QixHQUFpQyxDQUFyQyxFQUF3Qzs7QUFFcENQLFVBQUUsb0JBQUYsRUFBd0I0RSxLQUF4QixDQUE4Qjs7QUFFMUJDLHVCQUFXLHlCQUZlOztBQUkxQkMsdUJBQVcseUJBSmU7O0FBTTFCQyxvQkFBUSxJQU5rQjs7QUFRMUJDLHNCQUFVLElBUmdCOztBQVUxQkMsMEJBQWMsQ0FWWTs7QUFZMUJDLDRCQUFnQixDQVpVOztBQWMxQkMsbUJBQU8sSUFkbUI7O0FBZ0IxQkMsMkJBQWUsSUFoQlc7O0FBa0IxQkMsc0JBQVUsSUFsQmdCOztBQW9CMUJDLGtCQUFNLEtBcEJvQjs7QUFzQjFCOztBQUVBQyx3QkFBWSxDQUFDOztBQUlUQyw0QkFBWSxJQUpIOztBQU1UQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTkQsYUFBRCxFQWNUOztBQUlDTyw0QkFBWSxHQUpiOztBQU1DQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlgsYUFkUyxFQTRCVDs7QUFJQ08sNEJBQVksR0FKYjs7QUFNQ0MsMEJBQVU7O0FBRU5SLGtDQUFjLENBRlI7O0FBSU5JLDhCQUFVLEtBSko7O0FBTU5LLG1DQUFlLEtBTlQ7O0FBUU5YLDRCQUFROztBQVJGOztBQU5YLGFBNUJTLEVBZ0RUOztBQUlDUyw0QkFBWSxHQUpiOztBQU1DQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlgsYUFoRFMsRUE4RFQ7O0FBSUNPLDRCQUFZLEdBSmI7O0FBTUNDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFOWCxhQTlEUzs7QUF4QmMsU0FBOUI7QUF3R0g7O0FBSUQ7O0FBRUFqRixNQUFFLHFCQUFGLEVBQXlCNEUsS0FBekIsQ0FBK0I7O0FBRTNCSyxzQkFBYyxDQUZhOztBQUkzQkMsd0JBQWdCLENBSlc7O0FBTTNCSCxnQkFBUSxLQU5tQjs7QUFRM0JZLGNBQU0sSUFScUI7O0FBVTNCQyxrQkFBVSx5QkFWaUI7O0FBWTNCTCxvQkFBWSxDQUFDOztBQUlUQyx3QkFBWSxHQUpIOztBQU1UQyxzQkFBVTs7QUFFTkgsc0JBQU07O0FBRkE7O0FBTkQsU0FBRDs7QUFaZSxLQUEvQjs7QUE4QkF0RixNQUFFLHlCQUFGLEVBQTZCNEUsS0FBN0IsQ0FBbUM7O0FBRS9CSyxzQkFBYyxDQUZpQjs7QUFJL0JDLHdCQUFnQixDQUplOztBQU0vQlUsa0JBQVUscUJBTnFCOztBQVEvQk4sY0FBTSxJQVJ5Qjs7QUFVL0JPLG9CQUFZLElBVm1COztBQVkvQkMsdUJBQWUsSUFaZ0I7O0FBYy9CUCxvQkFBWSxDQUFDOztBQUlUQyx3QkFBWSxJQUpIOztBQU1UQyxzQkFBVTs7QUFFTkksNEJBQVk7O0FBRk47O0FBTkQsU0FBRCxFQWNWOztBQUlFTCx3QkFBWSxHQUpkOztBQU1FQyxzQkFBVTs7QUFOWixTQWRVOztBQWRtQixLQUFuQzs7QUE0Q0E7O0FBRUEsUUFBSXpGLEVBQUUsc0JBQUYsRUFBMEJPLE1BQTFCLEdBQW1DLENBQXZDLEVBQTBDOztBQUV0Q1AsVUFBRSxzQkFBRixFQUEwQjRFLEtBQTFCLENBQWdDOztBQUU1QkMsdUJBQVcsK0JBRmlCOztBQUk1QkMsdUJBQVcsK0JBSmlCOztBQU01QkMsb0JBQVEsSUFOb0I7O0FBUTVCQyxzQkFBVSxJQVJrQjs7QUFVNUJDLDBCQUFjLENBVmM7O0FBWTVCQyw0QkFBZ0IsQ0FaWTs7QUFjNUJDLG1CQUFPLEdBZHFCOztBQWdCNUJDLDJCQUFlLElBaEJhOztBQWtCNUJDLHNCQUFVLElBbEJrQjs7QUFvQjVCQyxrQkFBTTs7QUFwQnNCLFNBQWhDO0FBd0JIOztBQUlEOztBQUVBLFFBQUl0RixFQUFFLHdCQUFGLEVBQTRCTyxNQUE1QixHQUFxQyxDQUF6QyxFQUE0Qzs7QUFFeENQLFVBQUUsd0JBQUYsRUFBNEI0RSxLQUE1QixDQUFrQzs7QUFFOUJHLG9CQUFRLElBRnNCOztBQUk5QkMsc0JBQVUsSUFKb0I7O0FBTTlCQywwQkFBYyxDQU5nQjs7QUFROUJDLDRCQUFnQixDQVJjOztBQVU5QkMsbUJBQU8sR0FWdUI7O0FBWTlCQywyQkFBZSxJQVplOztBQWM5QkMsc0JBQVUsSUFkb0I7O0FBZ0I5QkMsa0JBQU0sS0FoQndCOztBQWtCOUJDLHdCQUFZLENBQUM7O0FBSVRDLDRCQUFZLElBSkg7O0FBTVRDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFORCxhQUFELEVBY1Y7O0FBSUVPLDRCQUFZLEdBSmQ7O0FBTUVDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFOWixhQWRVLEVBMEJWOztBQUlFTyw0QkFBWSxHQUpkOztBQU1FQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlosYUExQlUsRUFzQ1Y7O0FBSUVPLDRCQUFZLEdBSmQ7O0FBTUVDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFOWixhQXRDVTs7QUFsQmtCLFNBQWxDO0FBd0VIOztBQUVEOzs7O0FBSUFqRixNQUFFLGtCQUFGLEVBQXNCK0MsSUFBdEIsQ0FBMkIsY0FBM0IsRUFBMkMzQyxFQUEzQyxDQUE4QyxPQUE5QyxFQUF1RCxVQUFTeUIsQ0FBVCxFQUFZOztBQUVsRSxZQUFJa0UsT0FBTy9GLEVBQUUsSUFBRixFQUFRc0QsT0FBUixDQUFnQixrQkFBaEIsQ0FBWDs7QUFFQSxZQUFJMEMsUUFBUWhHLEVBQUUsSUFBRixFQUFRcUIsSUFBUixDQUFhLE9BQWIsQ0FBWjs7QUFFQSxZQUFJNEUsTUFBTUYsS0FBS2hELElBQUwsQ0FBVSxzQkFBVixDQUFWOztBQUlBa0QsWUFBSTlELElBQUosQ0FBUyxLQUFULEVBQWdCNkQsS0FBaEI7O0FBRUFuRSxVQUFFQyxjQUFGO0FBRUEsS0FkRDs7QUFrQkE7O0FBRUE5QixNQUFFLGFBQUYsRUFBaUIrQyxJQUFqQixDQUFzQixnQkFBdEIsRUFBd0MzQyxFQUF4QyxDQUEyQyxPQUEzQyxFQUFvRCxZQUFXOztBQUU5RCxZQUFJSixFQUFFLElBQUYsRUFBUTBDLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQzs7QUFFbkM7QUFFQSxTQUpELE1BSU87O0FBRU4xQyxjQUFFLGFBQUYsRUFBaUIrQyxJQUFqQixDQUFzQixnQkFBdEIsRUFBd0MxQyxXQUF4QyxDQUFvRCxZQUFwRDs7QUFFQUwsY0FBRSxJQUFGLEVBQVF5QyxRQUFSLENBQWlCLFlBQWpCOztBQUVBO0FBRUE7QUFFRCxLQWhCRDs7QUFvQkF6QyxNQUFFLGFBQUYsRUFBaUIrQyxJQUFqQixDQUFzQixpQkFBdEIsRUFBeUMzQyxFQUF6QyxDQUE0QyxPQUE1QyxFQUFxRCxVQUFTeUIsQ0FBVCxFQUFZOztBQUVoRSxZQUFJa0UsT0FBTy9GLEVBQUUsSUFBRixFQUFRMEUsTUFBUixDQUFlLGdCQUFmLENBQVg7O0FBRUEsWUFBSXFCLEtBQUtyRCxRQUFMLENBQWMsWUFBZCxDQUFKLEVBQWdDOztBQUUvQnFELGlCQUFLMUYsV0FBTCxDQUFpQixZQUFqQjtBQUVBOztBQUVEd0IsVUFBRTBCLGVBQUY7QUFFQSxLQVpEOztBQWdCQXZELE1BQUUseUJBQUYsRUFBNkIrQyxJQUE3QixDQUFrQywwQkFBbEMsRUFBOERtRCxJQUE5RCxDQUFtRSxZQUFXOztBQUU3RSxZQUFJQyxXQUFXbkcsRUFBRSxJQUFGLEVBQVErQyxJQUFSLENBQWEsd0JBQWIsQ0FBZjs7QUFFQSxZQUFJaUQsUUFBUUcsU0FBUzlFLElBQVQsQ0FBYyxjQUFkLENBQVo7O0FBRUE4RSxpQkFBU3hFLEdBQVQsQ0FBYSxrQkFBYixFQUFpQ3FFLEtBQWpDO0FBRUEsS0FSRDs7QUFZQSxRQUFHaEcsRUFBRUcsTUFBRixFQUFVd0MsS0FBVixNQUFxQixHQUF4QixFQUE2Qjs7QUFFNUIzQyxVQUFFLHlCQUFGLEVBQTZCK0MsSUFBN0IsQ0FBa0MsMEJBQWxDLEVBQThEMUMsV0FBOUQsQ0FBMEUsV0FBMUU7QUFFQTs7QUFJRCxRQUFJTCxFQUFFLCtCQUFGLEVBQW1DTyxNQUFuQyxHQUE0QyxDQUFoRCxFQUFtRDs7QUFJL0MsWUFBSTZGLFNBQVNuRyxTQUFTb0csY0FBVCxDQUF3QiwwQkFBeEIsQ0FBYjs7QUFFQSxZQUFJQyxnQkFBZ0J0RyxFQUFFLDJCQUFGLEVBQStCcUIsSUFBL0IsQ0FBb0MsT0FBcEMsQ0FBcEI7O0FBRUEsWUFBSWtGLGNBQWN2RyxFQUFFLDJCQUFGLEVBQStCcUIsSUFBL0IsQ0FBb0MsS0FBcEMsQ0FBbEI7O0FBRUEsWUFBSW1GLFFBQVEsQ0FBQ3hHLEVBQUUsZUFBRixDQUFELEVBQXFCQSxFQUFFLGFBQUYsQ0FBckIsQ0FBWjs7QUFFQSxZQUFJeUcsVUFBSjs7QUFFQSxZQUFJQyxRQUFKOztBQUVBLFlBQUlDLFNBQUo7O0FBRUEsWUFBSUMsSUFBSjs7QUFJQSxZQUFJSixNQUFNLENBQU4sRUFBUzFDLElBQVQsTUFBbUIsRUFBdkIsRUFBMkI7O0FBRXZCMkMseUJBQWFILGFBQWI7QUFFSCxTQUpELE1BSU87O0FBRUhHLHlCQUFhSSxTQUFTTCxNQUFNLENBQU4sRUFBUzFDLElBQVQsRUFBVCxDQUFiO0FBRUg7O0FBSUQsWUFBSTBDLE1BQU0sQ0FBTixFQUFTMUMsSUFBVCxNQUFtQixFQUF2QixFQUEyQjs7QUFFdkI0Qyx1QkFBV0gsV0FBWDtBQUVILFNBSkQsTUFJTzs7QUFFSEcsdUJBQVdHLFNBQVNMLE1BQU0sQ0FBTixFQUFTMUMsSUFBVCxFQUFULENBQVg7QUFFSDs7QUFNRGdELG1CQUFXQyxNQUFYLENBQWtCWCxNQUFsQixFQUEwQjs7QUFFdEJZLG1CQUFPLENBQUNQLFVBQUQsRUFBYUMsUUFBYixDQUZlOztBQUl0Qk8scUJBQVMsSUFKYTs7QUFNdEJDLG1CQUFPOztBQUVILHVCQUFPWixhQUZKOztBQUlILHVCQUFPQzs7QUFKSjs7QUFOZSxTQUExQjs7QUFnQkFILGVBQU9VLFVBQVAsQ0FBa0IxRyxFQUFsQixDQUFxQixRQUFyQixFQUErQixVQUFVK0csTUFBVixFQUFrQkMsTUFBbEIsRUFBMEI7O0FBRXJEWixrQkFBTVksTUFBTixFQUFjdEQsSUFBZCxDQUFvQnFELE9BQU9DLE1BQVAsQ0FBcEI7QUFFSCxTQUpEO0FBTUg7O0FBSUQ7O0FBRUFwSCxNQUFFLDBCQUFGLEVBQThCSSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFXOztBQUVwREosVUFBRSxvQkFBRixFQUF3QnlDLFFBQXhCLENBQWlDLFlBQWpDOztBQUVBeEMsaUJBQVNpRCxlQUFULENBQXlCQyxLQUF6QixDQUErQkMsUUFBL0IsR0FBMEMsUUFBMUM7QUFFQSxLQU5EOztBQVFBcEQsTUFBRSwwQkFBRixFQUE4QkksRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVzs7QUFFcERKLFVBQUUsb0JBQUYsRUFBd0JLLFdBQXhCLENBQW9DLFlBQXBDOztBQUVBSixpQkFBU2lELGVBQVQsQ0FBeUJDLEtBQXpCLEdBQWlDLEVBQWpDO0FBRUEsS0FORDs7QUFRQTs7OztBQUlBOztBQUVBbkQsTUFBRSxzQkFBRixFQUEwQnFILElBQTFCOztBQUVBckgsTUFBRSxzQkFBRixFQUEwQitDLElBQTFCLENBQStCLGFBQS9CLEVBQThDM0MsRUFBOUMsQ0FBaUQsT0FBakQsRUFBMEQsWUFBVzs7QUFFakVKLFVBQUUsSUFBRixFQUFRc0QsT0FBUixDQUFnQixzQkFBaEIsRUFBd0NQLElBQXhDLENBQTZDLHdCQUE3QyxFQUF1RTZCLEtBQXZFLENBQTZFLGFBQTdFO0FBRUgsS0FKRDs7QUFRQSxRQUFLNUUsRUFBRSxTQUFGLEVBQWFPLE1BQWIsR0FBc0IsQ0FBdEIsSUFBMkJQLEVBQUVHLE1BQUYsRUFBVXdDLEtBQVYsS0FBb0IsR0FBcEQsRUFBeUQ7O0FBRXJEMUMsaUJBQVNxSCxhQUFULENBQXVCLFNBQXZCLEVBQWtDQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNERGLElBQTVEO0FBRUg7O0FBSUQ7O0FBRUEsYUFBU0EsSUFBVCxDQUFjeEYsQ0FBZCxFQUFpQjs7QUFFYixZQUFJd0IsU0FBU3hCLEVBQUV3QixNQUFmOztBQUVBLFlBQUlBLE9BQU9tRSxTQUFQLElBQW9CLFlBQXhCLEVBQXNDOztBQUVsQyxnQkFBSUMsVUFBYXBFLE9BQU9xRSxZQUFQLENBQW9CLFVBQXBCLENBQWpCOztBQUVBLGdCQUFJQyxhQUFhMUgsU0FBUzJILGdCQUFULENBQTBCLGVBQTFCLENBQWpCOztBQUVBLGdCQUFJQyxXQUFhNUgsU0FBUzJILGdCQUFULENBQTBCLGFBQTFCLENBQWpCOztBQUVBLGlCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsU0FBU3RILE1BQTdCLEVBQXFDdUgsR0FBckMsRUFBMEM7O0FBRXRDRCx5QkFBU0MsQ0FBVCxFQUFZQyxTQUFaLENBQXNCOUQsTUFBdEIsQ0FBNkIsV0FBN0I7QUFFSDs7QUFFRFosbUJBQU8wRSxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixXQUFyQjs7QUFFQSxpQkFBSyxJQUFJRixJQUFJLENBQWIsRUFBZ0JBLElBQUlILFdBQVdwSCxNQUEvQixFQUF1Q3VILEdBQXZDLEVBQTRDOztBQUV4QyxvQkFBSUwsV0FBV0ssQ0FBZixFQUFrQjs7QUFFZEgsK0JBQVdHLENBQVgsRUFBYzNFLEtBQWQsQ0FBb0I4RSxPQUFwQixHQUE4QixPQUE5QjtBQUVILGlCQUpELE1BSUs7O0FBRUROLCtCQUFXRyxDQUFYLEVBQWMzRSxLQUFkLENBQW9COEUsT0FBcEIsR0FBOEIsTUFBOUI7QUFFSDtBQUVKO0FBRUo7QUFFSjs7QUFJRDs7QUFFQSxhQUFTQyxZQUFULEdBQXVCOztBQUVuQixZQUFJQyxNQUFNbkksRUFBRSxvQkFBRixDQUFWOztBQUlBQSxVQUFFLFNBQUYsRUFBYW9JLE1BQWIsR0FBc0IzRixRQUF0QixDQUErQix5Q0FBL0IsRUFBMEVwQyxXQUExRSxDQUFzRixhQUF0Rjs7QUFFQThILFlBQUlwRixJQUFKLENBQVMsYUFBVCxFQUF3Qk4sUUFBeEIsQ0FBaUMsa0JBQWpDLEVBQXFEcEMsV0FBckQsQ0FBaUUsc0JBQWpFLEVBQXlGZ0ksSUFBekYsQ0FBOEYsK0JBQTlGOztBQUlBRixZQUFJcEYsSUFBSixDQUFTLHdCQUFULEVBQW1DSCxVQUFuQyxDQUE4QyxPQUE5QyxFQUF1RG9CLFdBQXZELENBQW1FLGdCQUFuRSxFQUFxRlUsTUFBckYsR0FBOEZqQyxRQUE5RixDQUF1RyxTQUF2Rzs7QUFFQTBGLFlBQUlwRixJQUFKLENBQVMsd0JBQVQsRUFBbUNwQixHQUFuQyxDQUF1QyxTQUF2QyxFQUFrRCxNQUFsRCxFQUEwRHFDLFdBQTFELENBQXNFLGdCQUF0RTs7QUFJQW1FLFlBQUlwRixJQUFKLENBQVMsZUFBVCxFQUEwQk4sUUFBMUIsQ0FBbUMsb0JBQW5DLEVBQXlEcEMsV0FBekQsQ0FBcUUsb0NBQXJFOztBQUVBOEgsWUFBSXBGLElBQUosQ0FBUyxpQkFBVCxFQUE0QmtCLE1BQTVCO0FBRUg7O0FBSUQsUUFBR2pFLEVBQUVHLE1BQUYsRUFBVXdDLEtBQVYsTUFBcUIsR0FBeEIsRUFBNkI7O0FBRXpCdUY7QUFFSDs7QUFJRCxRQUFJbEksRUFBRSxpQkFBRixFQUFxQk8sTUFBckIsR0FBOEIsQ0FBbEMsRUFBb0M7QUFBQSxZQW9DdkIrSCxXQXBDdUIsR0FvQ2hDLFNBQVNBLFdBQVQsR0FBdUI7O0FBRW5CdEksY0FBRSxpQkFBRixFQUFxQmtHLElBQXJCLENBQTBCLFlBQVc7O0FBRWpDLG9CQUFJQyxXQUFXbkcsRUFBRSxJQUFGLEVBQVErQyxJQUFSLENBQWEscUJBQWIsQ0FBZjs7QUFFQSxvQkFBSWlELFFBQVFHLFNBQVM5RSxJQUFULENBQWMsbUJBQWQsQ0FBWjs7QUFFQThFLHlCQUFTeEUsR0FBVCxDQUFhLGtCQUFiLEVBQWlDcUUsS0FBakM7QUFFSCxhQVJELEVBUUdqRCxJQVJILENBUVEsb0JBUlIsRUFROEJtRCxJQVI5QixDQVFtQyxZQUFXOztBQUUxQyxvQkFBSUMsV0FBV25HLEVBQUUsSUFBRixFQUFRK0MsSUFBUixDQUFhLHFCQUFiLENBQWY7O0FBRUEsb0JBQUlpRCxRQUFRRyxTQUFTOUUsSUFBVCxDQUFjLG1CQUFkLENBQVo7O0FBRUE4RSx5QkFBU3hFLEdBQVQsQ0FBYSxrQkFBYixFQUFpQ3FFLEtBQWpDO0FBRUgsYUFoQkQ7QUFrQkgsU0F4RCtCOztBQUloQ2hHLFVBQUUsaUJBQUYsRUFBcUJJLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7O0FBRXhDLGdCQUFJSixFQUFFLElBQUYsRUFBUTBDLFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQzs7QUFFL0IxQyxrQkFBRSxpQkFBRixFQUFxQkssV0FBckIsQ0FBaUMsV0FBakM7O0FBRUFMLGtCQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixXQUFwQjtBQUVILGFBTkQsTUFNTzs7QUFFSEwsa0JBQUUsaUJBQUYsRUFBcUJLLFdBQXJCLENBQWlDLFdBQWpDOztBQUVBTCxrQkFBRSxJQUFGLEVBQVF5QyxRQUFSLENBQWlCLFdBQWpCO0FBRUg7QUFFSixTQWhCRDs7QUFvQkF6QyxVQUFFQyxRQUFGLEVBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVN5QixDQUFULEVBQVk7O0FBRWhDLGdCQUFJN0IsRUFBRTZCLEVBQUV3QixNQUFKLEVBQVlDLE9BQVosQ0FBb0IsaUJBQXBCLEVBQXVDL0MsTUFBM0MsRUFBbUQ7O0FBRW5EUCxjQUFFLGlCQUFGLEVBQXFCSyxXQUFyQixDQUFpQyxXQUFqQzs7QUFFQXdCLGNBQUUwQixlQUFGO0FBRUgsU0FSRDs7QUFnQ0MrRTs7QUFJRHRJLFVBQUUsaUJBQUYsRUFBcUIrQyxJQUFyQixDQUEwQixvQkFBMUIsRUFBZ0QzQyxFQUFoRCxDQUFtRCxPQUFuRCxFQUE0RCxZQUFXOztBQUVuRSxnQkFBSW1JLFNBQVN2SSxFQUFFLElBQUYsRUFBUXNELE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWI7O0FBRUEsZ0JBQUlRLE9BQU85RCxFQUFFLElBQUYsRUFBUStDLElBQVIsQ0FBYSxxQkFBYixFQUFvQ2UsSUFBcEMsRUFBWDs7QUFFQSxnQkFBSWtDLFFBQVFoRyxFQUFFLElBQUYsRUFBUStDLElBQVIsQ0FBYSxxQkFBYixFQUFvQzFCLElBQXBDLENBQXlDLG1CQUF6QyxDQUFaOztBQUVBLGdCQUFJbUgsUUFBUUQsT0FBT3hGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJMEYsUUFBUUYsT0FBT3hGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUlBMEYsa0JBQU1yRSxHQUFOLENBQVVOLElBQVY7O0FBRUEwRSxrQkFBTUUsUUFBTixDQUFlLHFCQUFmLEVBQXNDckgsSUFBdEMsQ0FBMkMsbUJBQTNDLEVBQWdFMkUsS0FBaEU7O0FBRUFzQzs7QUFJQSxnQkFBSUMsT0FBTzdGLFFBQVAsQ0FBZ0Isb0JBQWhCLENBQUosRUFBMkM7O0FBRXZDLG9CQUFJMUMsRUFBRSxJQUFGLEVBQVEwQyxRQUFSLENBQWlCLDJCQUFqQixDQUFKLEVBQW1EOztBQUVoRDhGLDBCQUFNRSxRQUFOLENBQWUscUJBQWYsRUFBc0M5RixVQUF0QyxDQUFpRCxPQUFqRCxFQUEwRGtCLElBQTFELENBQStELFNBQS9EOztBQUVBMkUsMEJBQU05RyxHQUFOLENBQVUsU0FBVixFQUFxQixNQUFyQjtBQUVILGlCQU5BLE1BTU07O0FBRUw4RywwQkFBTTdGLFVBQU4sQ0FBaUIsT0FBakI7O0FBRUE0RiwwQkFBTUUsUUFBTixDQUFlLHFCQUFmLEVBQXNDL0csR0FBdEMsQ0FBMEMsU0FBMUMsRUFBcUQsTUFBckQ7QUFFRDtBQUVIO0FBRUosU0F4Q0Q7O0FBNENBM0IsVUFBRSwrQkFBRixFQUFtQ0ksRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0MsVUFBU3lCLENBQVQsRUFBWTs7QUFFdkQsZ0JBQUkwRyxTQUFTdkksRUFBRSxJQUFGLEVBQVFzRCxPQUFSLENBQWdCLGlCQUFoQixDQUFiOztBQUVBLGdCQUFJbUYsUUFBUUYsT0FBT3hGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJeUYsUUFBUUQsT0FBT3hGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJNEYsWUFBWTlCLFNBQVM0QixNQUFNckUsR0FBTixFQUFULENBQWhCOztBQUVBLGdCQUFJd0UsUUFBUS9CLFNBQVM0QixNQUFNckUsR0FBTixFQUFULElBQXdCLENBQXhCLEdBQTRCLEdBQTVCLEdBQWtDLEdBQTlDOztBQUlBcUUsa0JBQU03RixVQUFOLENBQWlCLE9BQWpCLEVBQTBCd0IsR0FBMUIsQ0FBOEJ3RSxLQUE5Qjs7QUFJQSxnQkFBSUQsWUFBWSxDQUFoQixFQUFtQjs7QUFFZkYsc0JBQU1JLE1BQU47QUFFSCxhQUpELE1BSU87O0FBRUhKLHNCQUFNckUsR0FBTixDQUFVLElBQUksR0FBZDtBQUVIOztBQUlEb0Usa0JBQU1FLFFBQU4sQ0FBZSxxQkFBZixFQUFzQy9HLEdBQXRDLENBQTBDLFNBQTFDLEVBQXFELE1BQXJEOztBQUVBRSxjQUFFMEIsZUFBRjtBQUVILFNBbENEOztBQXNDQXZELFVBQUUsZ0NBQUYsRUFBb0NJLEVBQXBDLENBQXVDLE9BQXZDLEVBQWdELFlBQVk7O0FBRXhELGdCQUFJbUksU0FBU3ZJLEVBQUUsSUFBRixFQUFRc0QsT0FBUixDQUFnQixpQkFBaEIsQ0FBYjs7QUFFQSxnQkFBSW1GLFFBQVFGLE9BQU94RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQSxnQkFBSXlGLFFBQVFELE9BQU94RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQSxnQkFBSTRGLFlBQVk5QixTQUFTNEIsTUFBTXJFLEdBQU4sRUFBVCxDQUFoQjs7QUFFQSxnQkFBSXdFLFFBQVEvQixTQUFTNEIsTUFBTXJFLEdBQU4sRUFBVCxJQUF3QixDQUF4QixHQUE0QixHQUE1QixHQUFrQyxHQUE5Qzs7QUFJQSxnQkFBSXVFLFlBQVksQ0FBaEIsRUFBbUI7O0FBRWZDLHdCQUFRQSxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCQSxLQUF4Qjs7QUFFQUgsc0JBQU1yRSxHQUFOLENBQVV3RSxLQUFWOztBQUVBSCxzQkFBTUksTUFBTjs7QUFFQU4sdUJBQU9sSSxXQUFQLENBQW1CLFVBQW5CO0FBRUgsYUFWRCxNQVVPOztBQUVIbUksc0JBQU1FLFFBQU4sQ0FBZSxxQkFBZixFQUFzQzlGLFVBQXRDLENBQWlELE9BQWpEOztBQUVBNkYsc0JBQU05RyxHQUFOLENBQVUsU0FBVixFQUFxQixNQUFyQjs7QUFFQTRHLHVCQUFPbEksV0FBUCxDQUFtQixXQUFuQjtBQUVIOztBQUVELG1CQUFPLEtBQVA7QUFFSCxTQXBDRDtBQXNDSDs7QUFFRDs7OztBQUlBOztBQUVBLFFBQUlMLEVBQUUsZUFBRixFQUFtQk8sTUFBbkIsR0FBNEIsQ0FBaEMsRUFBbUM7O0FBRWxDUCxVQUFFLGVBQUYsRUFBbUIrQyxJQUFuQixDQUF3QixtQkFBeEIsRUFBNkMzQyxFQUE3QyxDQUFnRCxPQUFoRCxFQUF5RCxZQUFVOztBQUUvRCxnQkFBR0osRUFBRSxJQUFGLEVBQVEwRSxNQUFSLEdBQWlCaEMsUUFBakIsQ0FBMEIsU0FBMUIsQ0FBSCxFQUF3Qzs7QUFFcEMxQyxrQkFBRSxJQUFGLEVBQVEwRSxNQUFSLEdBQWlCckUsV0FBakIsQ0FBNkIsU0FBN0IsRUFBd0MwQyxJQUF4QyxDQUE2QyxxQkFBN0MsRUFBb0VwQixHQUFwRSxDQUF3RSxTQUF4RSxFQUFtRixNQUFuRjtBQUVILGFBSkQsTUFJSzs7QUFFRDNCLGtCQUFFLElBQUYsRUFBUTBFLE1BQVIsR0FBaUJqQyxRQUFqQixDQUEwQixTQUExQixFQUFxQ00sSUFBckMsQ0FBMEMscUJBQTFDLEVBQWlFSCxVQUFqRSxDQUE0RSxPQUE1RTtBQUVIO0FBRUosU0FaRDtBQWNBOztBQUlEOztBQUVBNUMsTUFBRUMsUUFBRixFQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixjQUF4QixFQUF3QyxZQUFXOztBQUUvQyxZQUFJSixFQUFFLElBQUYsRUFBUStDLElBQVIsQ0FBYSxPQUFiLEVBQXNCK0YsRUFBdEIsQ0FBeUIsVUFBekIsQ0FBSixFQUEwQzs7QUFFdkM5SSxjQUFFLElBQUYsRUFBUXlDLFFBQVIsQ0FBaUIsWUFBakI7QUFFSCxTQUpBLE1BSU07O0FBRUh6QyxjQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixZQUFwQjtBQUVIO0FBRUgsS0FaRDs7QUFnQkFMLE1BQUVDLFFBQUYsRUFBWUcsRUFBWixDQUFlLE9BQWYsRUFBd0Isc0JBQXhCLEVBQWdELFlBQVc7O0FBRXZELFlBQUdKLEVBQUUsSUFBRixFQUFRMEMsUUFBUixDQUFpQixZQUFqQixDQUFILEVBQWtDOztBQUU5QjFDLGNBQUUsSUFBRixFQUFRSyxXQUFSLENBQW9CLFlBQXBCO0FBRUgsU0FKRCxNQUlLOztBQUVETCxjQUFFLElBQUYsRUFBUXlDLFFBQVIsQ0FBaUIsWUFBakI7QUFFSDtBQUVKLEtBWkQ7QUFjSCxDQWwvQkQ7O0FBby9CSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICBtYXNrOiBcIis3ICg5OTkpIDk5OS05OS05OVwiLFxyXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfW1haW5PZmZzZXQoKTtcclxuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XHJcbiAgICBcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmICAgIFxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J30sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7ICAgIFxyXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJChcImltZ1wiKS5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtldmVudC5wcmV2ZW50RGVmYXVsdCgpfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbScpLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93JykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgLy9Nb2JpbGUgTmF2XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcclxuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KTsgICAgIFxyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7ICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpLmNzcygnaGVpZ2h0JywgODUpLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKS5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLnByZXYoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIFNsaWRlci5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xyXG5cclxuICAgIC8vU2xpZGVyIE5ld1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgQ2FyZFxyXG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxyXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH1dXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXHJcblxyXG4gICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBcInVuc2xpY2tcIlxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9XVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFByb21vXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ2F0YWxvZy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAkKCcuanMtcHJvZHVjdC1pdGVtJykuZmluZCgnLmNvbG9yX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuXHJcbiAgICBcdGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICBcdGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHRpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG5cclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2hhbmdlclxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fSBlbHNlIHtcclxuXHJcbiAgICBcdFx0JCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX3Jlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcclxuXHJcbiAgICBcdGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgIFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xyXG5cclxuICAgIFx0dmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcblxyXG4gICAgXHRjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XHJcblxyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGVuZFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgYXJyUGFyYW1zO1xyXG5cclxuICAgICAgICB2YXIgc1VybDtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByYW5nZToge1xyXG5cclxuICAgICAgICAgICAgICAgICdtaW4nOiBhbGxQcmljZVN0YXJ0LFxyXG5cclxuICAgICAgICAgICAgICAgICdtYXgnOiBhbGxQcmljZUVuZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWx1ZXMsIGhhbmRsZSkge1xyXG5cclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogQ2FyZC5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL2NhcmQgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykuZmluZCgnLnRhYl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoICQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpOyAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy/QotCw0LHRi1xyXG5cclxuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFUYWIgICAgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiVGl0bGUgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX3RpdGxlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICB9IFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpe1xyXG5cclxuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy10YWInKS51bndyYXAoKS5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJykud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJykucmVtb3ZlQXR0cignc3R5bGUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCl7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7ICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pOyBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICB9KTsgICAgICAgIFxyXG5cclxuICAgICAgICB9Y2hhbmdlQ29sb3IoKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaW5wdXQudmFsKHRleHQpO1xyXG5cclxuICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUNvbG9yKCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLnJlbW92ZUF0dHIoJ3N0eWxlJykudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7ICAgIFxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tcGx1cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpICsgMSArICcgJyArICfQvCc7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpLnZhbChjb3VudCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyZW50VmFsID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNoYW5nZSgpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoMSArICfQvCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdC1jb250cm9sLS1taW51cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpIC0gMSArICcgJyArICfQvCc7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyZW50VmFsID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbChjb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2hhbmdlKCk7ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtY2xvc2UnKTsgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxyXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWFjY29yZGVvbicpLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdCAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgXHQgICAgfWVsc2V7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICBcdCAgICB9ICAgXHJcblxyXG4gICAgXHR9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9jaGVja2JveFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIEZ1bmN0aW9ucy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAiXX0=
