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
    // if ($('.js-phone-mask').length > 0) {
    //     $('.js-phone-mask').inputmask({
    //         mask: "+7 (999) 999-99-99",
    //         clearIncomplete: true
    //     })
    // }

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
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

    //Click event to scroll to section whith id like href    
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 90 + 'px' }, 300);
        return false;
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
            } else {
                search.addClass('is-visible');
            }
        });

        //Mobile Search when click outside
        $(document).click(function (event) {
            if ($(event.target).closest('.js-mobile-search--show, .js-search').length) return;
            search.removeClass('is-visible');
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

            if (curentVal > 0) {

                // count = count < 1 ? 1 : count;

                input.removeAttr('style').val(count);

                input.change();
            } else {

                input.val(5 + 'м');
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

            if (curentVal > 6) {

                count = count < 1 ? 1 : count;

                input.val(count);

                input.change();

                select.removeClass('is-close');
            } else if (curentVal == 5) {

                select.addClass('is-close');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiZmFkZSIsImFzTmF2Rm9yIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpdGVtIiwiY29sb3IiLCJpbWciLCJlYWNoIiwiY29sb3JCb3giLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJhbGxQcmljZUVuZCIsInNwYW5zIiwic3RhcnRQcmljZSIsImVuZFByaWNlIiwiYXJyUGFyYW1zIiwic1VybCIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJ2YWwiLCJjaGlsZHJlbiIsImN1cmVudFZhbCIsImNvdW50IiwiY2hhbmdlIiwiaXMiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFZOztBQUUxQkYsTUFBRUcsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFZO0FBQzdCSixVQUFFLE1BQUYsRUFBVUssV0FBVixDQUFzQixTQUF0QjtBQUNBO0FBQ0EsWUFBSUMsWUFBWU4sRUFBRSxZQUFGLENBQWhCO0FBQ0EsWUFBSU0sVUFBVUMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN0QkQsc0JBQVVFLFVBQVYsQ0FBcUI7QUFDakJDLDZCQUFhLFNBREk7QUFFakJDLGtDQUFrQixLQUZEO0FBR2pCO0FBQ0FDLHlCQUFTLEtBSlE7QUFLakJDLHVCQUFPLEdBTFU7QUFNakJDLDZCQUFhLEtBTkk7QUFPakJDLDhCQUFjLE1BUEc7QUFRakJDLG9DQUFvQjtBQVJILGFBQXJCO0FBVUFULHNCQUFVVSxTQUFWLENBQW9CLFlBQVk7QUFDNUJoQixrQkFBRSxJQUFGLEVBQVFpQixhQUFSLEdBQXdCQyxNQUF4QjtBQUNILGFBRkQ7QUFHSDtBQUNKLEtBbkJEOztBQXFCQTtBQUNBLFFBQUlsQixFQUFFLFlBQUYsRUFBZ0JPLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzVCUCxVQUFFLFlBQUYsRUFBZ0JtQixPQUFoQixDQUF3QjtBQUNwQkMseUJBQWFwQixFQUFFLElBQUYsRUFBUXFCLElBQVIsQ0FBYSxhQUFiO0FBRE8sU0FBeEI7O0FBSUFyQixVQUFFLHNCQUFGLEVBQTBCbUIsT0FBMUIsQ0FBa0M7QUFDOUJHLHFDQUF5QixDQUFDO0FBREksU0FBbEM7QUFHSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFTQyxVQUFULEdBQXNCO0FBQ2xCdkIsVUFBRSxPQUFGLEVBQVd3QixHQUFYLENBQWUsYUFBZixFQUE4QnhCLEVBQUUsU0FBRixFQUFheUIsV0FBYixFQUE5QjtBQUNIO0FBQ0R6QixNQUFFRyxNQUFGLEVBQVVlLE1BQVYsQ0FBaUJLLFVBQWpCOztBQUdBO0FBQ0F2QixNQUFFLFlBQUYsRUFBZ0JJLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVVzQixDQUFWLEVBQWE7QUFDckNBLFVBQUVDLGNBQUY7QUFDQTNCLFVBQUUsWUFBRixFQUFnQjRCLE9BQWhCLENBQXdCLEVBQUNDLFdBQVcsQ0FBWixFQUF4QixFQUF3QyxHQUF4QztBQUNILEtBSEQ7O0FBTUE3QixNQUFFRyxNQUFGLEVBQVUyQixNQUFWLENBQWlCLFlBQVU7QUFDdkIsWUFBSTlCLEVBQUUsSUFBRixFQUFRNkIsU0FBUixLQUFzQjdCLEVBQUUsSUFBRixFQUFRK0IsTUFBUixFQUExQixFQUE0QztBQUN4Qy9CLGNBQUUsWUFBRixFQUFnQmdDLFFBQWhCLENBQXlCLFlBQXpCO0FBQ0EsZ0JBQUloQyxFQUFFLE9BQUYsRUFBV2lDLFFBQVgsQ0FBb0IsU0FBcEIsS0FBa0NqQyxFQUFFRyxNQUFGLEVBQVUrQixLQUFWLE1BQXFCLEdBQTNELEVBQWdFO0FBQzVEbEMsa0JBQUUsWUFBRixFQUFnQndCLEdBQWhCLENBQW9CLFFBQXBCLEVBQThCLEVBQTlCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sS0FBUDtBQUNIO0FBQ0osU0FQRCxNQU9PO0FBQ0h4QixjQUFFLFlBQUYsRUFBZ0JLLFdBQWhCLENBQTRCLFlBQTVCO0FBQ0FMLGNBQUUsWUFBRixFQUFnQm1DLFVBQWhCLENBQTJCLE9BQTNCO0FBQ0g7QUFDSixLQVpEOztBQWNBO0FBQ0FuQyxNQUFFLFVBQUYsRUFBY29DLEtBQWQsQ0FBb0IsWUFBWTtBQUM1QixZQUFJQyxlQUFlckMsRUFBRSxJQUFGLEVBQVFzQyxJQUFSLENBQWEsTUFBYixDQUFuQjtBQUNBLFlBQUlDLGNBQWN2QyxFQUFFcUMsWUFBRixFQUFnQkcsTUFBaEIsR0FBeUJDLEdBQTNDO0FBQ0F6QyxVQUFFLFlBQUYsRUFBZ0I0QixPQUFoQixDQUF3QixFQUFDQyxXQUFXVSxjQUFjLEVBQWQsR0FBbUIsSUFBL0IsRUFBeEIsRUFBOEQsR0FBOUQ7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQUxEOztBQU9BO0FBQ0F2QyxNQUFFLEtBQUYsRUFBU0ksRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBVXNDLEtBQVYsRUFBaUI7QUFBQ0EsY0FBTWYsY0FBTjtBQUF1QixLQUFsRTs7QUFFQTtBQUNBLFFBQUczQixFQUFFRyxNQUFGLEVBQVUrQixLQUFWLE1BQXFCLEdBQXhCLEVBQTZCO0FBQ3pCLFlBQUlTLFNBQVMzQyxFQUFFLFlBQUYsQ0FBYjtBQUNBMkMsZUFBT0MsSUFBUCxDQUFZLGNBQVosRUFBNEJaLFFBQTVCLENBQXFDLGlCQUFyQyxFQUF3RGEsT0FBeEQsQ0FBZ0Usc0NBQWhFO0FBQ0FGLGVBQU9DLElBQVAsQ0FBWSx1QkFBWixFQUFxQ1osUUFBckMsQ0FBOEMsb0JBQTlDLEVBQW9FUixHQUFwRSxDQUF3RSxTQUF4RSxFQUFtRixNQUFuRjtBQUNBbUIsZUFBT0MsSUFBUCxDQUFZLHFCQUFaLEVBQW1DWixRQUFuQyxDQUE0QyxrQkFBNUM7QUFDSDs7QUFFRDtBQUNBaEMsTUFBRSxlQUFGLEVBQW1CSSxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUFXO0FBQ3RDSixVQUFFLElBQUYsRUFBUThDLFdBQVIsQ0FBb0IsSUFBcEI7QUFDQTlDLFVBQUUsY0FBRixFQUFrQjhDLFdBQWxCLENBQThCLFNBQTlCO0FBQ0E5QyxVQUFFLGFBQUYsRUFBaUI4QyxXQUFqQixDQUE2QixXQUE3QjtBQUNBN0MsaUJBQVM4QyxlQUFULENBQXlCQyxLQUF6QixDQUErQkMsUUFBL0IsR0FBMENoRCxTQUFTOEMsZUFBVCxDQUF5QkMsS0FBekIsQ0FBK0JDLFFBQS9CLEtBQTRDLEVBQTVDLEdBQWlELFFBQWpELEdBQTRELEVBQXRHO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FORDtBQU9DO0FBQ0RqRCxNQUFFQyxRQUFGLEVBQVltQyxLQUFaLENBQWtCLFVBQVNWLENBQVQsRUFBWTtBQUMxQixZQUFJMUIsRUFBRTBCLEVBQUV3QixNQUFKLEVBQVlDLE9BQVosQ0FBb0IsdURBQXBCLEVBQTZFNUMsTUFBakYsRUFBeUY7QUFDekZQLFVBQUUsZUFBRixFQUFtQkssV0FBbkIsQ0FBK0IsSUFBL0I7QUFDQUwsVUFBRSxjQUFGLEVBQWtCSyxXQUFsQixDQUE4QixTQUE5QjtBQUNBTCxVQUFFLGFBQUYsRUFBaUJLLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0FKLGlCQUFTOEMsZUFBVCxDQUF5QkMsS0FBekIsR0FBaUMsRUFBakM7QUFDQXRCLFVBQUUwQixlQUFGO0FBQ0gsS0FQRDs7QUFVQSxRQUFHcEQsRUFBRUcsTUFBRixFQUFVK0IsS0FBVixNQUFxQixHQUF4QixFQUE2QjtBQUN6QjtBQUNBbEMsVUFBRSxjQUFGLEVBQWtCcUQsU0FBbEIsQ0FBNEIsV0FBNUI7QUFDQXJELFVBQUUsNEJBQUYsRUFBZ0NJLEVBQWhDLENBQW1DLE9BQW5DLEVBQTRDLFVBQVNzQixDQUFULEVBQVk7QUFDcERBLGNBQUVDLGNBQUY7QUFDQSxnQkFBSTJCLFVBQVV0RCxFQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWQ7QUFDQSxnQkFBSUksa0JBQWtCdkQsRUFBRSxJQUFGLEVBQVFtRCxPQUFSLENBQWdCLHFCQUFoQixDQUF0QjtBQUNBLGdCQUFJSyxtQkFBbUJGLFFBQVFWLElBQVIsQ0FBYSxxQkFBYixDQUF2QjtBQUNBLGdCQUFJYSxlQUFlekQsRUFBRSxJQUFGLEVBQVFtRCxPQUFSLENBQWdCLHFCQUFoQixDQUFuQjs7QUFFQSxnQkFBSU8sUUFBUTFELEVBQUUsSUFBRixFQUFRMkQsSUFBUixFQUFaO0FBQ0EsZ0JBQUlDLFFBQVE1RCxFQUFFLDREQUFGLENBQVo7O0FBRUEsZ0JBQUksQ0FBQ3NELFFBQVFyQixRQUFSLENBQWlCLFdBQWpCLENBQUQsSUFBa0MsQ0FBQ2pDLEVBQUUsSUFBRixFQUFRaUMsUUFBUixDQUFpQiwyQkFBakIsQ0FBdkMsRUFBc0Y7QUFDbEZxQix3QkFBUXRCLFFBQVIsQ0FBaUIsV0FBakI7QUFDQTRCLHNCQUFNQyxXQUFOLENBQWtCUCxRQUFRVixJQUFSLENBQWEsNEJBQWIsQ0FBbEIsRUFBOERlLElBQTlELENBQW1FRCxLQUFuRTtBQUNILGFBSEQsTUFHTyxJQUFJSixRQUFRckIsUUFBUixDQUFpQixXQUFqQixLQUFpQyxDQUFDc0IsZ0JBQWdCdEIsUUFBaEIsQ0FBeUIsV0FBekIsQ0FBbEMsSUFBMkUsQ0FBQ2pDLEVBQUUsSUFBRixFQUFRaUMsUUFBUixDQUFpQiwyQkFBakIsQ0FBaEYsRUFBK0g7QUFDbElzQixnQ0FBZ0J2QixRQUFoQixDQUF5QixXQUF6QjtBQUNBeUIsNkJBQWFqQyxHQUFiLENBQWlCLFVBQWpCLEVBQTZCLFFBQTdCO0FBQ0gsYUFITSxNQUdBLElBQUk4QixRQUFRckIsUUFBUixDQUFpQixXQUFqQixLQUFpQyxDQUFDdUIsaUJBQWlCdkIsUUFBakIsQ0FBMEIsV0FBMUIsQ0FBbEMsSUFBNEVqQyxFQUFFLElBQUYsRUFBUWlDLFFBQVIsQ0FBaUIsMkJBQWpCLENBQWhGLEVBQStIO0FBQ2xJcUIsd0JBQVFqRCxXQUFSLENBQW9CLFdBQXBCO0FBQ0FrRCxnQ0FBZ0JYLElBQWhCLENBQXFCLDRCQUFyQixFQUFtRGtCLE1BQW5EO0FBQ0gsYUFITSxNQUdBLElBQUlSLFFBQVFyQixRQUFSLENBQWlCLFdBQWpCLEtBQWlDdUIsaUJBQWlCdkIsUUFBakIsQ0FBMEIsV0FBMUIsQ0FBakMsSUFBMkVqQyxFQUFFLElBQUYsRUFBUWlDLFFBQVIsQ0FBaUIsMkJBQWpCLENBQS9FLEVBQThIO0FBQ2pJdUIsaUNBQWlCbkQsV0FBakIsQ0FBNkIsV0FBN0I7QUFDQW9ELDZCQUFhdEIsVUFBYixDQUF3QixPQUF4QjtBQUNIO0FBQ0osU0F2QkQ7O0FBeUJDO0FBQ0QsWUFBSTRCLFNBQVMvRCxFQUFFLFlBQUYsQ0FBYjtBQUNBLFlBQUlnRSxnQkFBZ0JoRSxFQUFFLHlCQUFGLENBQXBCOztBQUVBQSxVQUFFLHlCQUFGLEVBQTZCSSxFQUE3QixDQUFnQyxPQUFoQyxFQUF5QyxZQUFXO0FBQ2hELGdCQUFJMkQsT0FBTzlCLFFBQVAsQ0FBZ0IsWUFBaEIsQ0FBSixFQUFtQztBQUMvQjhCLHVCQUFPMUQsV0FBUCxDQUFtQixZQUFuQjtBQUNILGFBRkQsTUFFTztBQUNKMEQsdUJBQU8vQixRQUFQLENBQWdCLFlBQWhCO0FBQ0Y7QUFDSixTQU5EOztBQVFDO0FBQ0RoQyxVQUFFQyxRQUFGLEVBQVltQyxLQUFaLENBQWtCLFVBQVNNLEtBQVQsRUFBZ0I7QUFDOUIsZ0JBQUkxQyxFQUFFMEMsTUFBTVEsTUFBUixFQUFnQkMsT0FBaEIsQ0FBd0IscUNBQXhCLEVBQStENUMsTUFBbkUsRUFBMkU7QUFDM0V3RCxtQkFBTzFELFdBQVAsQ0FBbUIsWUFBbkI7QUFDQXFDLGtCQUFNVSxlQUFOO0FBQ0gsU0FKRDtBQUtILEtBOUNELE1BOENPO0FBQ0gsWUFBSWEsYUFBYWpFLEVBQUUsY0FBRixDQUFqQjtBQUNBLFlBQUlrRSxrQkFBa0JsRSxFQUFFLGtDQUFGLEVBQXNDd0IsR0FBdEMsQ0FBMEMsUUFBMUMsRUFBb0QsRUFBcEQsRUFBd0RxQyxXQUF4RCxDQUFvRSxjQUFwRSxFQUFvRk0sSUFBcEYsRUFBdEI7QUFDQW5FLFVBQUVHLE1BQUYsRUFBVTJCLE1BQVYsQ0FBaUIsWUFBVztBQUN4QixnQkFBSTlCLEVBQUUsSUFBRixFQUFRNkIsU0FBUixNQUF1QjdCLEVBQUUsbUJBQUYsRUFBdUJ5QixXQUF2QixFQUEzQixFQUFpRTtBQUM3RHdDLDJCQUFXakMsUUFBWCxDQUFvQixlQUFwQjtBQUNBa0MsZ0NBQWdCRSxJQUFoQjtBQUNILGFBSEQsTUFHTztBQUNISCwyQkFBVzVELFdBQVgsQ0FBdUIsZUFBdkI7QUFDQTZELGdDQUFnQkMsSUFBaEI7QUFDSDtBQUNKLFNBUkQ7QUFTSDs7QUFFRDtBQUNBbkUsTUFBRSwwQkFBRixFQUE4QkksRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVTtBQUNoREosVUFBRSxJQUFGLEVBQVF3QixHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNBeEIsVUFBRSxJQUFGLEVBQVFxRSxJQUFSLEdBQWU3QyxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCO0FBQ0F4QixVQUFFLElBQUYsRUFBUXNFLE1BQVIsR0FBaUIxQixJQUFqQixDQUFzQix3QkFBdEIsRUFBZ0ROLElBQWhELENBQXFELE1BQXJELEVBQTZELE1BQTdEO0FBQ0gsS0FKRDtBQUtBO0FBQ0F0QyxNQUFFLDBCQUFGLEVBQThCSSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFVO0FBQ2hESixVQUFFLElBQUYsRUFBUXdCLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBQ0F4QixVQUFFLElBQUYsRUFBUXVFLElBQVIsR0FBZS9DLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsT0FBOUI7QUFDQXhCLFVBQUUsSUFBRixFQUFRc0UsTUFBUixHQUFpQjFCLElBQWpCLENBQXNCLG9CQUF0QixFQUE0Q04sSUFBNUMsQ0FBaUQsTUFBakQsRUFBeUQsVUFBekQ7QUFDSCxLQUpEOztBQU1BO0FBQ0F0QyxNQUFFLHNCQUFGLEVBQTBCSSxFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUFTc0IsQ0FBVCxFQUFZO0FBQzlDLFlBQUksQ0FBQzFCLEVBQUUsSUFBRixFQUFRaUMsUUFBUixDQUFpQixZQUFqQixDQUFMLEVBQXFDO0FBQ2xDakMsY0FBRSxJQUFGLEVBQVFnQyxRQUFSLENBQWlCLFlBQWpCO0FBQ0YsU0FGRCxNQUVPO0FBQ0hoQyxjQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixZQUFwQjtBQUNIO0FBQ0RxQixVQUFFQyxjQUFGO0FBQ0gsS0FQRDs7QUFTQTs7OztBQUlBOztBQUVBOztBQUVBLFFBQUkzQixFQUFFLG9CQUFGLEVBQXdCTyxNQUF4QixHQUFpQyxDQUFyQyxFQUF3Qzs7QUFFcENQLFVBQUUsb0JBQUYsRUFBd0J3RSxLQUF4QixDQUE4Qjs7QUFFMUJDLHVCQUFXLHlCQUZlOztBQUkxQkMsdUJBQVcseUJBSmU7O0FBTTFCQyxvQkFBUSxJQU5rQjs7QUFRMUJDLHNCQUFVLElBUmdCOztBQVUxQkMsMEJBQWMsQ0FWWTs7QUFZMUJDLDRCQUFnQixDQVpVOztBQWMxQkMsbUJBQU8sSUFkbUI7O0FBZ0IxQkMsMkJBQWUsSUFoQlc7O0FBa0IxQkMsc0JBQVUsSUFsQmdCOztBQW9CMUJDLGtCQUFNLEtBcEJvQjs7QUFzQjFCOztBQUVBQyx3QkFBWSxDQUFDOztBQUlUQyw0QkFBWSxJQUpIOztBQU1UQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTkQsYUFBRCxFQWNUOztBQUlDTyw0QkFBWSxHQUpiOztBQU1DQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlgsYUFkUyxFQTRCVDs7QUFJQ08sNEJBQVksR0FKYjs7QUFNQ0MsMEJBQVU7O0FBRU5SLGtDQUFjLENBRlI7O0FBSU5JLDhCQUFVLEtBSko7O0FBTU5LLG1DQUFlLEtBTlQ7O0FBUU5YLDRCQUFROztBQVJGOztBQU5YLGFBNUJTLEVBZ0RUOztBQUlDUyw0QkFBWSxHQUpiOztBQU1DQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlgsYUFoRFMsRUE4RFQ7O0FBSUNPLDRCQUFZLEdBSmI7O0FBTUNDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFOWCxhQTlEUzs7QUF4QmMsU0FBOUI7QUF3R0g7O0FBSUQ7O0FBRUE3RSxNQUFFLHFCQUFGLEVBQXlCd0UsS0FBekIsQ0FBK0I7O0FBRTNCSyxzQkFBYyxDQUZhOztBQUkzQkMsd0JBQWdCLENBSlc7O0FBTTNCSCxnQkFBUSxLQU5tQjs7QUFRM0JZLGNBQU0sSUFScUI7O0FBVTNCQyxrQkFBVSx5QkFWaUI7O0FBWTNCTCxvQkFBWSxDQUFDOztBQUlUQyx3QkFBWSxHQUpIOztBQU1UQyxzQkFBVTs7QUFFTkgsc0JBQU07O0FBRkE7O0FBTkQsU0FBRDs7QUFaZSxLQUEvQjs7QUE4QkFsRixNQUFFLHlCQUFGLEVBQTZCd0UsS0FBN0IsQ0FBbUM7O0FBRS9CSyxzQkFBYyxDQUZpQjs7QUFJL0JDLHdCQUFnQixDQUplOztBQU0vQlUsa0JBQVUscUJBTnFCOztBQVEvQk4sY0FBTSxJQVJ5Qjs7QUFVL0JPLG9CQUFZLElBVm1COztBQVkvQkMsdUJBQWUsSUFaZ0I7O0FBYy9CUCxvQkFBWSxDQUFDOztBQUlUQyx3QkFBWSxJQUpIOztBQU1UQyxzQkFBVTs7QUFFTkksNEJBQVk7O0FBRk47O0FBTkQsU0FBRCxFQWNWOztBQUlFTCx3QkFBWSxHQUpkOztBQU1FQyxzQkFBVTs7QUFOWixTQWRVOztBQWRtQixLQUFuQzs7QUE0Q0E7O0FBRUEsUUFBSXJGLEVBQUUsc0JBQUYsRUFBMEJPLE1BQTFCLEdBQW1DLENBQXZDLEVBQTBDOztBQUV0Q1AsVUFBRSxzQkFBRixFQUEwQndFLEtBQTFCLENBQWdDOztBQUU1QkMsdUJBQVcsK0JBRmlCOztBQUk1QkMsdUJBQVcsK0JBSmlCOztBQU01QkMsb0JBQVEsSUFOb0I7O0FBUTVCQyxzQkFBVSxJQVJrQjs7QUFVNUJDLDBCQUFjLENBVmM7O0FBWTVCQyw0QkFBZ0IsQ0FaWTs7QUFjNUJDLG1CQUFPLEdBZHFCOztBQWdCNUJDLDJCQUFlLElBaEJhOztBQWtCNUJDLHNCQUFVLElBbEJrQjs7QUFvQjVCQyxrQkFBTTs7QUFwQnNCLFNBQWhDO0FBd0JIOztBQUlEOztBQUVBLFFBQUlsRixFQUFFLHdCQUFGLEVBQTRCTyxNQUE1QixHQUFxQyxDQUF6QyxFQUE0Qzs7QUFFeENQLFVBQUUsd0JBQUYsRUFBNEJ3RSxLQUE1QixDQUFrQzs7QUFFOUJHLG9CQUFRLElBRnNCOztBQUk5QkMsc0JBQVUsSUFKb0I7O0FBTTlCQywwQkFBYyxDQU5nQjs7QUFROUJDLDRCQUFnQixDQVJjOztBQVU5QkMsbUJBQU8sR0FWdUI7O0FBWTlCQywyQkFBZSxJQVplOztBQWM5QkMsc0JBQVUsSUFkb0I7O0FBZ0I5QkMsa0JBQU0sS0FoQndCOztBQWtCOUJDLHdCQUFZLENBQUM7O0FBSVRDLDRCQUFZLElBSkg7O0FBTVRDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFORCxhQUFELEVBY1Y7O0FBSUVPLDRCQUFZLEdBSmQ7O0FBTUVDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFOWixhQWRVLEVBMEJWOztBQUlFTyw0QkFBWSxHQUpkOztBQU1FQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlosYUExQlUsRUFzQ1Y7O0FBSUVPLDRCQUFZLEdBSmQ7O0FBTUVDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFOWixhQXRDVTs7QUFsQmtCLFNBQWxDO0FBd0VIOztBQUVEOzs7O0FBSUE3RSxNQUFFLGtCQUFGLEVBQXNCNEMsSUFBdEIsQ0FBMkIsY0FBM0IsRUFBMkN4QyxFQUEzQyxDQUE4QyxPQUE5QyxFQUF1RCxVQUFTc0IsQ0FBVCxFQUFZOztBQUVsRSxZQUFJaUUsT0FBTzNGLEVBQUUsSUFBRixFQUFRbUQsT0FBUixDQUFnQixrQkFBaEIsQ0FBWDs7QUFFQSxZQUFJeUMsUUFBUTVGLEVBQUUsSUFBRixFQUFRcUIsSUFBUixDQUFhLE9BQWIsQ0FBWjs7QUFFQSxZQUFJd0UsTUFBTUYsS0FBSy9DLElBQUwsQ0FBVSxzQkFBVixDQUFWOztBQUlBaUQsWUFBSXZELElBQUosQ0FBUyxLQUFULEVBQWdCc0QsS0FBaEI7O0FBRUFsRSxVQUFFQyxjQUFGO0FBRUEsS0FkRDs7QUFrQkE7O0FBRUEzQixNQUFFLGFBQUYsRUFBaUI0QyxJQUFqQixDQUFzQixnQkFBdEIsRUFBd0N4QyxFQUF4QyxDQUEyQyxPQUEzQyxFQUFvRCxZQUFXOztBQUU5RCxZQUFJSixFQUFFLElBQUYsRUFBUWlDLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQzs7QUFFbkM7QUFFQSxTQUpELE1BSU87O0FBRU5qQyxjQUFFLGFBQUYsRUFBaUI0QyxJQUFqQixDQUFzQixnQkFBdEIsRUFBd0N2QyxXQUF4QyxDQUFvRCxZQUFwRDs7QUFFQUwsY0FBRSxJQUFGLEVBQVFnQyxRQUFSLENBQWlCLFlBQWpCOztBQUVBO0FBRUE7QUFFRCxLQWhCRDs7QUFvQkFoQyxNQUFFLGFBQUYsRUFBaUI0QyxJQUFqQixDQUFzQixpQkFBdEIsRUFBeUN4QyxFQUF6QyxDQUE0QyxPQUE1QyxFQUFxRCxVQUFTc0IsQ0FBVCxFQUFZOztBQUVoRSxZQUFJaUUsT0FBTzNGLEVBQUUsSUFBRixFQUFRc0UsTUFBUixDQUFlLGdCQUFmLENBQVg7O0FBRUEsWUFBSXFCLEtBQUsxRCxRQUFMLENBQWMsWUFBZCxDQUFKLEVBQWdDOztBQUUvQjBELGlCQUFLdEYsV0FBTCxDQUFpQixZQUFqQjtBQUVBOztBQUVEcUIsVUFBRTBCLGVBQUY7QUFFQSxLQVpEOztBQWdCQXBELE1BQUUseUJBQUYsRUFBNkI0QyxJQUE3QixDQUFrQywwQkFBbEMsRUFBOERrRCxJQUE5RCxDQUFtRSxZQUFXOztBQUU3RSxZQUFJQyxXQUFXL0YsRUFBRSxJQUFGLEVBQVE0QyxJQUFSLENBQWEsd0JBQWIsQ0FBZjs7QUFFQSxZQUFJZ0QsUUFBUUcsU0FBUzFFLElBQVQsQ0FBYyxjQUFkLENBQVo7O0FBRUEwRSxpQkFBU3ZFLEdBQVQsQ0FBYSxrQkFBYixFQUFpQ29FLEtBQWpDO0FBRUEsS0FSRDs7QUFZQSxRQUFHNUYsRUFBRUcsTUFBRixFQUFVK0IsS0FBVixNQUFxQixHQUF4QixFQUE2Qjs7QUFFNUJsQyxVQUFFLHlCQUFGLEVBQTZCNEMsSUFBN0IsQ0FBa0MsMEJBQWxDLEVBQThEdkMsV0FBOUQsQ0FBMEUsV0FBMUU7QUFFQTs7QUFJRCxRQUFJTCxFQUFFLCtCQUFGLEVBQW1DTyxNQUFuQyxHQUE0QyxDQUFoRCxFQUFtRDs7QUFJL0MsWUFBSXlGLFNBQVMvRixTQUFTZ0csY0FBVCxDQUF3QiwwQkFBeEIsQ0FBYjs7QUFFQSxZQUFJQyxnQkFBZ0JsRyxFQUFFLDJCQUFGLEVBQStCcUIsSUFBL0IsQ0FBb0MsT0FBcEMsQ0FBcEI7O0FBRUEsWUFBSThFLGNBQWNuRyxFQUFFLDJCQUFGLEVBQStCcUIsSUFBL0IsQ0FBb0MsS0FBcEMsQ0FBbEI7O0FBRUEsWUFBSStFLFFBQVEsQ0FBQ3BHLEVBQUUsZUFBRixDQUFELEVBQXFCQSxFQUFFLGFBQUYsQ0FBckIsQ0FBWjs7QUFFQSxZQUFJcUcsVUFBSjs7QUFFQSxZQUFJQyxRQUFKOztBQUVBLFlBQUlDLFNBQUo7O0FBRUEsWUFBSUMsSUFBSjs7QUFJQSxZQUFJSixNQUFNLENBQU4sRUFBU3pDLElBQVQsTUFBbUIsRUFBdkIsRUFBMkI7O0FBRXZCMEMseUJBQWFILGFBQWI7QUFFSCxTQUpELE1BSU87O0FBRUhHLHlCQUFhSSxTQUFTTCxNQUFNLENBQU4sRUFBU3pDLElBQVQsRUFBVCxDQUFiO0FBRUg7O0FBSUQsWUFBSXlDLE1BQU0sQ0FBTixFQUFTekMsSUFBVCxNQUFtQixFQUF2QixFQUEyQjs7QUFFdkIyQyx1QkFBV0gsV0FBWDtBQUVILFNBSkQsTUFJTzs7QUFFSEcsdUJBQVdHLFNBQVNMLE1BQU0sQ0FBTixFQUFTekMsSUFBVCxFQUFULENBQVg7QUFFSDs7QUFNRCtDLG1CQUFXQyxNQUFYLENBQWtCWCxNQUFsQixFQUEwQjs7QUFFdEJZLG1CQUFPLENBQUNQLFVBQUQsRUFBYUMsUUFBYixDQUZlOztBQUl0Qk8scUJBQVMsSUFKYTs7QUFNdEJDLG1CQUFPOztBQUVILHVCQUFPWixhQUZKOztBQUlILHVCQUFPQzs7QUFKSjs7QUFOZSxTQUExQjs7QUFnQkFILGVBQU9VLFVBQVAsQ0FBa0J0RyxFQUFsQixDQUFxQixRQUFyQixFQUErQixVQUFVMkcsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEI7O0FBRXJEWixrQkFBTVksTUFBTixFQUFjckQsSUFBZCxDQUFvQm9ELE9BQU9DLE1BQVAsQ0FBcEI7QUFFSCxTQUpEO0FBTUg7O0FBSUQ7O0FBRUFoSCxNQUFFLDBCQUFGLEVBQThCSSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFXOztBQUVwREosVUFBRSxvQkFBRixFQUF3QmdDLFFBQXhCLENBQWlDLFlBQWpDOztBQUVBL0IsaUJBQVM4QyxlQUFULENBQXlCQyxLQUF6QixDQUErQkMsUUFBL0IsR0FBMEMsUUFBMUM7QUFFQSxLQU5EOztBQVFBakQsTUFBRSwwQkFBRixFQUE4QkksRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVzs7QUFFcERKLFVBQUUsb0JBQUYsRUFBd0JLLFdBQXhCLENBQW9DLFlBQXBDOztBQUVBSixpQkFBUzhDLGVBQVQsQ0FBeUJDLEtBQXpCLEdBQWlDLEVBQWpDO0FBRUEsS0FORDs7QUFRQTs7OztBQUlBOztBQUVBaEQsTUFBRSxzQkFBRixFQUEwQmlILElBQTFCOztBQUVBakgsTUFBRSxzQkFBRixFQUEwQjRDLElBQTFCLENBQStCLGFBQS9CLEVBQThDeEMsRUFBOUMsQ0FBaUQsT0FBakQsRUFBMEQsWUFBVzs7QUFFakVKLFVBQUUsSUFBRixFQUFRbUQsT0FBUixDQUFnQixzQkFBaEIsRUFBd0NQLElBQXhDLENBQTZDLHdCQUE3QyxFQUF1RTRCLEtBQXZFLENBQTZFLGFBQTdFO0FBRUgsS0FKRDs7QUFRQSxRQUFLeEUsRUFBRSxTQUFGLEVBQWFPLE1BQWIsR0FBc0IsQ0FBdEIsSUFBMkJQLEVBQUVHLE1BQUYsRUFBVStCLEtBQVYsS0FBb0IsR0FBcEQsRUFBeUQ7O0FBRXJEakMsaUJBQVNpSCxhQUFULENBQXVCLFNBQXZCLEVBQWtDQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNERGLElBQTVEO0FBRUg7O0FBSUQ7O0FBRUEsYUFBU0EsSUFBVCxDQUFjdkYsQ0FBZCxFQUFpQjs7QUFFYixZQUFJd0IsU0FBU3hCLEVBQUV3QixNQUFmOztBQUVBLFlBQUlBLE9BQU9rRSxTQUFQLElBQW9CLFlBQXhCLEVBQXNDOztBQUVsQyxnQkFBSUMsVUFBYW5FLE9BQU9vRSxZQUFQLENBQW9CLFVBQXBCLENBQWpCOztBQUVBLGdCQUFJQyxhQUFhdEgsU0FBU3VILGdCQUFULENBQTBCLGVBQTFCLENBQWpCOztBQUVBLGdCQUFJQyxXQUFheEgsU0FBU3VILGdCQUFULENBQTBCLGFBQTFCLENBQWpCOztBQUVBLGlCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsU0FBU2xILE1BQTdCLEVBQXFDbUgsR0FBckMsRUFBMEM7O0FBRXRDRCx5QkFBU0MsQ0FBVCxFQUFZQyxTQUFaLENBQXNCN0QsTUFBdEIsQ0FBNkIsV0FBN0I7QUFFSDs7QUFFRFosbUJBQU95RSxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixXQUFyQjs7QUFFQSxpQkFBSyxJQUFJRixJQUFJLENBQWIsRUFBZ0JBLElBQUlILFdBQVdoSCxNQUEvQixFQUF1Q21ILEdBQXZDLEVBQTRDOztBQUV4QyxvQkFBSUwsV0FBV0ssQ0FBZixFQUFrQjs7QUFFZEgsK0JBQVdHLENBQVgsRUFBYzFFLEtBQWQsQ0FBb0I2RSxPQUFwQixHQUE4QixPQUE5QjtBQUVILGlCQUpELE1BSUs7O0FBRUROLCtCQUFXRyxDQUFYLEVBQWMxRSxLQUFkLENBQW9CNkUsT0FBcEIsR0FBOEIsTUFBOUI7QUFFSDtBQUVKO0FBRUo7QUFFSjs7QUFJRDs7QUFFQSxhQUFTQyxZQUFULEdBQXVCOztBQUVuQixZQUFJQyxNQUFNL0gsRUFBRSxvQkFBRixDQUFWOztBQUlBQSxVQUFFLFNBQUYsRUFBYWdJLE1BQWIsR0FBc0JoRyxRQUF0QixDQUErQix5Q0FBL0IsRUFBMEUzQixXQUExRSxDQUFzRixhQUF0Rjs7QUFFQTBILFlBQUluRixJQUFKLENBQVMsYUFBVCxFQUF3QlosUUFBeEIsQ0FBaUMsa0JBQWpDLEVBQXFEM0IsV0FBckQsQ0FBaUUsc0JBQWpFLEVBQXlGNEgsSUFBekYsQ0FBOEYsK0JBQTlGOztBQUlBRixZQUFJbkYsSUFBSixDQUFTLHdCQUFULEVBQW1DVCxVQUFuQyxDQUE4QyxPQUE5QyxFQUF1RDBCLFdBQXZELENBQW1FLGdCQUFuRSxFQUFxRlMsTUFBckYsR0FBOEZ0QyxRQUE5RixDQUF1RyxTQUF2Rzs7QUFFQStGLFlBQUluRixJQUFKLENBQVMsd0JBQVQsRUFBbUNwQixHQUFuQyxDQUF1QyxTQUF2QyxFQUFrRCxNQUFsRCxFQUEwRHFDLFdBQTFELENBQXNFLGdCQUF0RTs7QUFJQWtFLFlBQUluRixJQUFKLENBQVMsZUFBVCxFQUEwQlosUUFBMUIsQ0FBbUMsb0JBQW5DLEVBQXlEM0IsV0FBekQsQ0FBcUUsb0NBQXJFOztBQUVBMEgsWUFBSW5GLElBQUosQ0FBUyxpQkFBVCxFQUE0QmtCLE1BQTVCO0FBRUg7O0FBSUQsUUFBRzlELEVBQUVHLE1BQUYsRUFBVStCLEtBQVYsTUFBcUIsR0FBeEIsRUFBNkI7O0FBRXpCNEY7QUFFSDs7QUFJRCxRQUFJOUgsRUFBRSxpQkFBRixFQUFxQk8sTUFBckIsR0FBOEIsQ0FBbEMsRUFBb0M7QUFBQSxZQW9DdkIySCxXQXBDdUIsR0FvQ2hDLFNBQVNBLFdBQVQsR0FBdUI7O0FBRW5CbEksY0FBRSxpQkFBRixFQUFxQjhGLElBQXJCLENBQTBCLFlBQVc7O0FBRWpDLG9CQUFJQyxXQUFXL0YsRUFBRSxJQUFGLEVBQVE0QyxJQUFSLENBQWEscUJBQWIsQ0FBZjs7QUFFQSxvQkFBSWdELFFBQVFHLFNBQVMxRSxJQUFULENBQWMsbUJBQWQsQ0FBWjs7QUFFQTBFLHlCQUFTdkUsR0FBVCxDQUFhLGtCQUFiLEVBQWlDb0UsS0FBakM7QUFFSCxhQVJELEVBUUdoRCxJQVJILENBUVEsb0JBUlIsRUFROEJrRCxJQVI5QixDQVFtQyxZQUFXOztBQUUxQyxvQkFBSUMsV0FBVy9GLEVBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLHFCQUFiLENBQWY7O0FBRUEsb0JBQUlnRCxRQUFRRyxTQUFTMUUsSUFBVCxDQUFjLG1CQUFkLENBQVo7O0FBRUEwRSx5QkFBU3ZFLEdBQVQsQ0FBYSxrQkFBYixFQUFpQ29FLEtBQWpDO0FBRUgsYUFoQkQ7QUFrQkgsU0F4RCtCOztBQUloQzVGLFVBQUUsaUJBQUYsRUFBcUJJLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7O0FBRXhDLGdCQUFJSixFQUFFLElBQUYsRUFBUWlDLFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQzs7QUFFL0JqQyxrQkFBRSxpQkFBRixFQUFxQkssV0FBckIsQ0FBaUMsV0FBakM7O0FBRUFMLGtCQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixXQUFwQjtBQUVILGFBTkQsTUFNTzs7QUFFSEwsa0JBQUUsaUJBQUYsRUFBcUJLLFdBQXJCLENBQWlDLFdBQWpDOztBQUVBTCxrQkFBRSxJQUFGLEVBQVFnQyxRQUFSLENBQWlCLFdBQWpCO0FBRUg7QUFFSixTQWhCRDs7QUFvQkFoQyxVQUFFQyxRQUFGLEVBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVNzQixDQUFULEVBQVk7O0FBRWhDLGdCQUFJMUIsRUFBRTBCLEVBQUV3QixNQUFKLEVBQVlDLE9BQVosQ0FBb0IsaUJBQXBCLEVBQXVDNUMsTUFBM0MsRUFBbUQ7O0FBRW5EUCxjQUFFLGlCQUFGLEVBQXFCSyxXQUFyQixDQUFpQyxXQUFqQzs7QUFFQXFCLGNBQUUwQixlQUFGO0FBRUgsU0FSRDs7QUFnQ0M4RTs7QUFJRGxJLFVBQUUsaUJBQUYsRUFBcUI0QyxJQUFyQixDQUEwQixvQkFBMUIsRUFBZ0R4QyxFQUFoRCxDQUFtRCxPQUFuRCxFQUE0RCxZQUFXOztBQUVuRSxnQkFBSStILFNBQVNuSSxFQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWI7O0FBRUEsZ0JBQUlRLE9BQU8zRCxFQUFFLElBQUYsRUFBUTRDLElBQVIsQ0FBYSxxQkFBYixFQUFvQ2UsSUFBcEMsRUFBWDs7QUFFQSxnQkFBSWlDLFFBQVE1RixFQUFFLElBQUYsRUFBUTRDLElBQVIsQ0FBYSxxQkFBYixFQUFvQ3ZCLElBQXBDLENBQXlDLG1CQUF6QyxDQUFaOztBQUVBLGdCQUFJK0csUUFBUUQsT0FBT3ZGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJeUYsUUFBUUYsT0FBT3ZGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUlBeUYsa0JBQU1DLEdBQU4sQ0FBVTNFLElBQVY7O0FBRUF5RSxrQkFBTUcsUUFBTixDQUFlLHFCQUFmLEVBQXNDbEgsSUFBdEMsQ0FBMkMsbUJBQTNDLEVBQWdFdUUsS0FBaEU7O0FBRUFzQzs7QUFJQSxnQkFBSUMsT0FBT2xHLFFBQVAsQ0FBZ0Isb0JBQWhCLENBQUosRUFBMkM7O0FBRXZDLG9CQUFJakMsRUFBRSxJQUFGLEVBQVFpQyxRQUFSLENBQWlCLDJCQUFqQixDQUFKLEVBQW1EOztBQUVoRG1HLDBCQUFNRyxRQUFOLENBQWUscUJBQWYsRUFBc0NwRyxVQUF0QyxDQUFpRCxPQUFqRCxFQUEwRHdCLElBQTFELENBQStELFNBQS9EOztBQUVBMEUsMEJBQU03RyxHQUFOLENBQVUsU0FBVixFQUFxQixNQUFyQjtBQUVILGlCQU5BLE1BTU07O0FBRUw2RywwQkFBTWxHLFVBQU4sQ0FBaUIsT0FBakI7O0FBRUFpRywwQkFBTUcsUUFBTixDQUFlLHFCQUFmLEVBQXNDL0csR0FBdEMsQ0FBMEMsU0FBMUMsRUFBcUQsTUFBckQ7QUFFRDtBQUVIO0FBRUosU0F4Q0Q7O0FBNENBeEIsVUFBRSwrQkFBRixFQUFtQ0ksRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0MsVUFBU3NCLENBQVQsRUFBWTs7QUFFdkQsZ0JBQUl5RyxTQUFTbkksRUFBRSxJQUFGLEVBQVFtRCxPQUFSLENBQWdCLGlCQUFoQixDQUFiOztBQUVBLGdCQUFJa0YsUUFBUUYsT0FBT3ZGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJd0YsUUFBUUQsT0FBT3ZGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJNEYsWUFBWS9CLFNBQVM0QixNQUFNQyxHQUFOLEVBQVQsQ0FBaEI7O0FBRUEsZ0JBQUlHLFFBQVFoQyxTQUFTNEIsTUFBTUMsR0FBTixFQUFULElBQXdCLENBQXhCLEdBQTRCLEdBQTVCLEdBQWtDLEdBQTlDOztBQUlBLGdCQUFJRSxZQUFZLENBQWhCLEVBQW1COztBQUVmOztBQUVBSCxzQkFBTWxHLFVBQU4sQ0FBaUIsT0FBakIsRUFBMEJtRyxHQUExQixDQUE4QkcsS0FBOUI7O0FBRUFKLHNCQUFNSyxNQUFOO0FBRUgsYUFSRCxNQVFPOztBQUVITCxzQkFBTUMsR0FBTixDQUFVLElBQUksR0FBZDtBQUVIOztBQUlERixrQkFBTUcsUUFBTixDQUFlLHFCQUFmLEVBQXNDL0csR0FBdEMsQ0FBMEMsU0FBMUMsRUFBcUQsTUFBckQ7O0FBRUFFLGNBQUUwQixlQUFGO0FBRUgsU0FsQ0Q7O0FBc0NBcEQsVUFBRSxnQ0FBRixFQUFvQ0ksRUFBcEMsQ0FBdUMsT0FBdkMsRUFBZ0QsWUFBWTs7QUFFeEQsZ0JBQUkrSCxTQUFTbkksRUFBRSxJQUFGLEVBQVFtRCxPQUFSLENBQWdCLGlCQUFoQixDQUFiOztBQUVBLGdCQUFJa0YsUUFBUUYsT0FBT3ZGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJd0YsUUFBUUQsT0FBT3ZGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUVBLGdCQUFJNEYsWUFBWS9CLFNBQVM0QixNQUFNQyxHQUFOLEVBQVQsQ0FBaEI7O0FBRUEsZ0JBQUlHLFFBQVFoQyxTQUFTNEIsTUFBTUMsR0FBTixFQUFULElBQXdCLENBQXhCLEdBQTRCLEdBQTVCLEdBQWtDLEdBQTlDOztBQUlBLGdCQUFJRSxZQUFZLENBQWhCLEVBQW1COztBQUVmQyx3QkFBUUEsUUFBUSxDQUFSLEdBQVksQ0FBWixHQUFnQkEsS0FBeEI7O0FBRUFKLHNCQUFNQyxHQUFOLENBQVVHLEtBQVY7O0FBRUFKLHNCQUFNSyxNQUFOOztBQUVBUCx1QkFBTzlILFdBQVAsQ0FBbUIsVUFBbkI7QUFFSCxhQVZELE1BVU8sSUFBR21JLGFBQWEsQ0FBaEIsRUFBbUI7O0FBRXRCTCx1QkFBT25HLFFBQVAsQ0FBZ0IsVUFBaEI7QUFFSCxhQUpNLE1BSUE7O0FBRUhvRyxzQkFBTUcsUUFBTixDQUFlLHFCQUFmLEVBQXNDcEcsVUFBdEMsQ0FBaUQsT0FBakQ7O0FBRUFrRyxzQkFBTTdHLEdBQU4sQ0FBVSxTQUFWLEVBQXFCLE1BQXJCOztBQUVBMkcsdUJBQU85SCxXQUFQLENBQW1CLFdBQW5CO0FBRUg7O0FBRUQsbUJBQU8sS0FBUDtBQUVILFNBeENEO0FBMENIOztBQUVEOzs7O0FBSUE7O0FBRUEsUUFBSUwsRUFBRSxlQUFGLEVBQW1CTyxNQUFuQixHQUE0QixDQUFoQyxFQUFtQzs7QUFFbENQLFVBQUUsZUFBRixFQUFtQjRDLElBQW5CLENBQXdCLG1CQUF4QixFQUE2Q3hDLEVBQTdDLENBQWdELE9BQWhELEVBQXlELFlBQVU7O0FBRS9ELGdCQUFHSixFQUFFLElBQUYsRUFBUXNFLE1BQVIsR0FBaUJyQyxRQUFqQixDQUEwQixTQUExQixDQUFILEVBQXdDOztBQUVwQ2pDLGtCQUFFLElBQUYsRUFBUXNFLE1BQVIsR0FBaUJqRSxXQUFqQixDQUE2QixTQUE3QixFQUF3Q3VDLElBQXhDLENBQTZDLHFCQUE3QyxFQUFvRXBCLEdBQXBFLENBQXdFLFNBQXhFLEVBQW1GLE1BQW5GO0FBRUgsYUFKRCxNQUlLOztBQUVEeEIsa0JBQUUsSUFBRixFQUFRc0UsTUFBUixHQUFpQnRDLFFBQWpCLENBQTBCLFNBQTFCLEVBQXFDWSxJQUFyQyxDQUEwQyxxQkFBMUMsRUFBaUVULFVBQWpFLENBQTRFLE9BQTVFO0FBRUg7QUFFSixTQVpEO0FBY0E7O0FBSUQ7O0FBRUFuQyxNQUFFQyxRQUFGLEVBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7O0FBRS9DLFlBQUlKLEVBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLE9BQWIsRUFBc0IrRixFQUF0QixDQUF5QixVQUF6QixDQUFKLEVBQTBDOztBQUV2QzNJLGNBQUUsSUFBRixFQUFRZ0MsUUFBUixDQUFpQixZQUFqQjtBQUVILFNBSkEsTUFJTTs7QUFFSGhDLGNBQUUsSUFBRixFQUFRSyxXQUFSLENBQW9CLFlBQXBCO0FBRUg7QUFFSCxLQVpEOztBQWdCQUwsTUFBRUMsUUFBRixFQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixzQkFBeEIsRUFBZ0QsWUFBVzs7QUFFdkQsWUFBR0osRUFBRSxJQUFGLEVBQVFpQyxRQUFSLENBQWlCLFlBQWpCLENBQUgsRUFBa0M7O0FBRTlCakMsY0FBRSxJQUFGLEVBQVFLLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSCxTQUpELE1BSUs7O0FBRURMLGNBQUUsSUFBRixFQUFRZ0MsUUFBUixDQUFpQixZQUFqQjtBQUVIO0FBRUosS0FaRDtBQWNILENBcC9CRDs7QUFzL0JJIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXHJcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIC8vIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAvLyAgICAgICAgIG1hc2s6IFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIsXHJcbiAgICAvLyAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFpbk9mZnNldCgpIHtcclxuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICB9bWFpbk9mZnNldCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcclxuICAgIFxyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxyXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA4MDApO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXsgICAgXHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmICAgIFxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J30sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TdG9wIGRyYWdcclxuICAgICQoXCJpbWdcIikub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7ZXZlbnQucHJldmVudERlZmF1bHQoKX0pO1xyXG5cclxuICAgIC8vRm9vdGVyIG1lZGlhIDw9IDQ4MCB0cmFuc2Zvcm0gYWNjb3JkZW9uXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW0nKS5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJykud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIC8vTW9iaWxlIE5hdlxyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XHJcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKCc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBibG9jay5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpLnRleHQodGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICBcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpOyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7ICAgICBcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaFxyXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XHJcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xyXG5cclxuICAgICAgICAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7ICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpLmNzcygnaGVpZ2h0JywgODUpLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKS5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLnByZXYoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIFNsaWRlci5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xyXG5cclxuICAgIC8vU2xpZGVyIE5ld1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgQ2FyZFxyXG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxyXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH1dXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXHJcblxyXG4gICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBcInVuc2xpY2tcIlxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9XVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFByb21vXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ2F0YWxvZy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAkKCcuanMtcHJvZHVjdC1pdGVtJykuZmluZCgnLmNvbG9yX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuXHJcbiAgICBcdGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICBcdGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHRpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG5cclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2hhbmdlclxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fSBlbHNlIHtcclxuXHJcbiAgICBcdFx0JCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX3Jlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcclxuXHJcbiAgICBcdGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgIFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xyXG5cclxuICAgIFx0dmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcblxyXG4gICAgXHRjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XHJcblxyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGVuZFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgYXJyUGFyYW1zO1xyXG5cclxuICAgICAgICB2YXIgc1VybDtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByYW5nZToge1xyXG5cclxuICAgICAgICAgICAgICAgICdtaW4nOiBhbGxQcmljZVN0YXJ0LFxyXG5cclxuICAgICAgICAgICAgICAgICdtYXgnOiBhbGxQcmljZUVuZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWx1ZXMsIGhhbmRsZSkge1xyXG5cclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogQ2FyZC5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL2NhcmQgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykuZmluZCgnLnRhYl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoICQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpOyAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy/QotCw0LHRi1xyXG5cclxuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFUYWIgICAgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiVGl0bGUgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX3RpdGxlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICB9IFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpe1xyXG5cclxuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy10YWInKS51bndyYXAoKS5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJykud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJykucmVtb3ZlQXR0cignc3R5bGUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCl7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7ICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pOyBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICB9KTsgICAgICAgIFxyXG5cclxuICAgICAgICB9Y2hhbmdlQ29sb3IoKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaW5wdXQudmFsKHRleHQpO1xyXG5cclxuICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUNvbG9yKCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLnJlbW92ZUF0dHIoJ3N0eWxlJykudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7ICAgIFxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tcGx1cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpICsgMSArICcgJyArICfQvCc7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyZW50VmFsID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJykudmFsKGNvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGFuZ2UoKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKDUgKyAn0LwnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tbWludXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cmVudFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKSAtIDEgKyAnICcgKyAn0LwnO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cmVudFZhbCA+IDYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IGNvdW50IDwgMSA/IDEgOiBjb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoY291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNoYW5nZSgpOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlJyk7ICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihjdXJlbnRWYWwgPT0gNSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdC5hZGRDbGFzcygnaXMtY2xvc2UnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENvbXBvbmVudHMuanNcclxuICAgICovXHJcblxyXG4gICAgLy9BY2NvcmRlb25cclxuXHJcbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBcdCQoJy5qcy1hY2NvcmRlb24nKS5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgXHQgICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgIFx0ICAgIH1lbHNle1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgXHQgICAgfSAgIFxyXG5cclxuICAgIFx0fSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vY2hlY2tib3hcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94JywgZnVuY3Rpb24gKCl7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0JykuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24gKCl7XHJcblxyXG4gICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSl7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBGdW5jdGlvbnMuanNcclxuICAgICovXHJcblxyXG4gICAgIl19
