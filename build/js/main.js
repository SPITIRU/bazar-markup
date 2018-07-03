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
        var addUserPic = function addUserPic(opt) {
            console.log('image select');
            if (!opt.id) {
                return opt.text;
            }
            var optimage = $(opt.element).data('image');
            if (!optimage) {
                return opt.text;
            } else {
                var $opt = $('<span class="sorting-icon sorting-icon--' + optimage + '">' + $(opt.element).text() + '</span>');
                return $opt;
            }
        };

        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select.select-with-icon').select2({
            templateResult: addUserPic,
            minimumResultsForSearch: -1
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
        cardSlider();
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
    } else {
        $('.js-catalog-filter-item').find('.catalog-filter__content').getNiceScroll().resize();
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

    //Sticky Block https://github.com/abouolia/sticky-sidebar
    if ($('.js-stiky').length > 0 && $(window).width() > 768) {
        var sidebar = new StickySidebar('.js-stiky', {
            topSpacing: 85,
            bottomSpacing: 20,
            containerSelector: '.stiky-content',
            innerWrapperSelector: '.stiky-inner'
        });
    }

    /*
    * Card.js
    */

    //card tabs
    $('.js-card-tab-related').tabs();
    $('.js-card-tab-related').find('.tab__title').on('click', function () {
        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    if ($('.js-tab').length > 0 && $(window).width() > 480) {
        document.addEventListener('click', function (e) {
            if (e.target && e.target.className == 'js-tab') {
                tabs;
            }
        });
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
            $(document).find('.js-item-select').each(function () {
                var colorBox = $(this).find('.item-select__color');
                var color = colorBox.data('item-select-color');
                colorBox.css('background-color', color);
            }).find('.item-select__item').each(function () {
                var colorBox = $(this).find('.item-select__color');
                var color = colorBox.data('item-select-color');
                colorBox.css('background-color', color);
            });
        };

        var itemSelect = $(document).find('.js-item-select');

        itemSelect.not('.js-item-select-control--plus').not('.js-item-select-control--minus').on('click', function () {
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

        itemSelect.find('.item-select__item').on('click', function () {
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
    var pushContainer = $('<div>').addClass('pushUp');
    var pushUpClose = $('<i class="fal fa-times"></i>').addClass('pushUp__close js-pushUp--close');
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

//CardSliderFunction
function cardSlider() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJibG9jayIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwic2VhcmNoIiwic2VhcmNoQnRuU2hvdyIsInZhbCIsImhlYWRlck1haW4iLCJoZWFkZXJNYWluQ2xvbmUiLCJoaWRlIiwic2hvdyIsIm5leHQiLCJwYXJlbnQiLCJwcmV2Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJ0YWJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJ0YWJUcmFuc2Zvcm0iLCJ0YWIiLCJ1bndyYXAiLCJ3cmFwIiwiY2hhbmdlQ29sb3IiLCJpdGVtU2VsZWN0Iiwibm90Iiwic2VsZWN0IiwidmFsdWUiLCJpbnB1dCIsImNoaWxkcmVuIiwiYWNjb3JkZXJvbiIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJpcyIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFmIiwic2V0VGltZW91dCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImNlbnRlck1vZGUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCRixNQUFFRyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUJKLFVBQUUsTUFBRixFQUFVSyxXQUFWLENBQXNCLFNBQXRCOztBQUVBO0FBQ0EsWUFBSUMsWUFBWU4sRUFBRSxZQUFGLENBQWhCO0FBQ0EsWUFBSU0sVUFBVUMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN0QkQsc0JBQVVFLFVBQVYsQ0FBcUI7QUFDakJDLDZCQUFhLFNBREk7QUFFakJDLGtDQUFrQixLQUZEO0FBR2pCO0FBQ0FDLHlCQUFTLEtBSlE7QUFLakJDLHVCQUFPLEdBTFU7QUFNakJDLDZCQUFhLEtBTkk7QUFPakJDLDhCQUFjLE1BUEc7QUFRakJDLG9DQUFvQjtBQVJILGFBQXJCO0FBVUFULHNCQUFVVSxTQUFWLENBQW9CLFlBQVc7QUFDM0JoQixrQkFBRSxJQUFGLEVBQ0tpQixhQURMLEdBRUtDLE1BRkw7QUFHSCxhQUpEO0FBS0g7QUFDSixLQXRCRDs7QUF3QkE7QUFDQSxRQUFJbEIsRUFBRSxZQUFGLEVBQWdCTyxNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUFBLFlBY25CWSxVQWRtQixHQWM1QixTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QjtBQUNyQkMsb0JBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsZ0JBQUksQ0FBQ0YsSUFBSUcsRUFBVCxFQUFhO0FBQ1QsdUJBQU9ILElBQUlJLElBQVg7QUFDSDtBQUNELGdCQUFJQyxXQUFXekIsRUFBRW9CLElBQUlNLE9BQU4sRUFBZUMsSUFBZixDQUFvQixPQUFwQixDQUFmO0FBQ0EsZ0JBQUksQ0FBQ0YsUUFBTCxFQUFlO0FB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L0JDLHdCQUFnQixDQUZlO0FBRy9CMEUsa0JBQVUscUJBSHFCO0FBSS9CdEUsY0FBTSxJQUp5QjtBQUsvQjtBQUNBdUUsdUJBQWUsSUFOZ0I7QUFPL0J0RSxvQkFBWSxDQUNSO0FBQ0lDLHdCQUFZLElBRGhCO0FBRUlDLHNCQUFVO0FBQ05xRSw0QkFBWTtBQUROO0FBRmQsU0FEUSxFQU9SO0FBQ0l0RSx3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUZkLFNBUFE7QUFQbUIsS0FBbkM7QUFvQkgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNlbGVjdC5zZWxlY3Qtd2l0aC1pY29uJykuc2VsZWN0Mih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpYyxcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2Ugc2VsZWN0Jyk7XG4gICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XG4gICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNvcnRpbmctaWNvbiBzb3J0aW5nLWljb24tLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwIHx8ICQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICc5OS05OS05OTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xuICAgIH0pO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4JyB9LCAzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xuICAgIH1cblxuICAgIC8vSGFtYnVyZ2VyIGJ0blxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxuICAgICAgICAgICAgICAgICcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdydcbiAgICAgICAgICAgICkubGVuZ3RoXG4gICAgICAgIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIC8vTW9iaWxlIE5hdlxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xuXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcbiAgICAgICAgICAgIC5oaWRlKCk7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICB9KTtcbiAgICAvL0hpZGUgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgfSk7XG5cbiAgICAvL2J0biBmYXZvcml0ZVxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBTbGlkZXIuanNcbiAgICAqL1xuXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICAvL1NsaWRlciBOZXdcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL1NsaWRlciBDYXJkXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgY2FyZFNsaWRlcigpO1xuICAgIH1cbiAgICBcbiAgICAvL1NsaWRlciBQcm9tb1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXRhbG9nLmpzXG4gICAgKi9cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY29sb3ItaXRlbScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xuICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xuICAgIFxuICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9DaGFuZ2VyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAucmVzaXplKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XG4gICAgICAgIHZhciBlbmRQcmljZTtcbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXG4gICAgICAgICAgICAgICAgbWF4OiBhbGxQcmljZUVuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XG4gICAgICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQodmFsdWVzW2hhbmRsZV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgIH0pO1xuICAgIFxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuICAgIGlmICgkKCcuanMtc3Rpa3knKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDg1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMjAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWlubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogQ2FyZC5qc1xuICAgICovXG5cbiAgICAvL2NhcmQgdGFic1xuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAgICAgLmZpbmQoJy50YWJfX3RpdGxlJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKVxuICAgICAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSA9PSAnanMtdGFiJykge1xuICAgICAgICAgICAgICAgIHRhYnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnJlc2l6ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0KLQsNCx0YtcbiAgICBmdW5jdGlvbiB0YWJzKGUpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgICAgICB2YXIgZGF0YVRhYiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XG4gICAgICAgICAgICB2YXIgdGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX2NvbnRlbnQnKTtcbiAgICAgICAgICAgIHZhciB0YWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX3RpdGxlJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cbiAgICBmdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKSB7XG4gICAgICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcbiAgICBcbiAgICAgICAgJCgnLmpzLXRhYicpXG4gICAgICAgICAgICAudW53cmFwKClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZXMnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX3RpdGxlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJylcbiAgICAgICAgICAgIC53cmFwKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uX19pdGVtXCI+Jyk7XG4gICAgXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJylcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcbiAgICBcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGl0ZW1TZWxlY3QgPSAkKGRvY3VtZW50KS5maW5kKCcuanMtaXRlbS1zZWxlY3QnKTtcbiAgICBcbiAgICAgICAgaXRlbVNlbGVjdFxuICAgICAgICAgICAgLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLXBsdXMnKVxuICAgICAgICAgICAgLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLW1pbnVzJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XG4gICAgICAgICAgICAkKGRvY3VtZW50KVxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcbiAgICBcbiAgICAgICAgaXRlbVNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKVxuICAgICAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XG4gICAgXG4gICAgICAgICAgICBpbnB1dC52YWwodGV4dCk7XG4gICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgY2hhbmdlQ29sb3IoKTtcbiAgICBcbiAgICAgICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogQ29udGFjdHMuanNcbiAgICAqL1xuXG4gICAgXG5cbiAgICAvKlxuICAgICogQ29tcG9uZW50cy5qc1xuICAgICovXG5cbiAgICAvL0FjY29yZGVvblxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgYWNjb3JkZXJvbiA9ICQoJy5qcy1hY2NvcmRlb24nKTtcbiAgICBcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgIGFjY29yZGVyb25cbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtOmZpcnN0JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuc2xpZGVEb3duKCk7XG4gICAgXG4gICAgICAgIGFjY29yZGVyb24uZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhY2NvcmRlcm9uLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9jaGVja2JveFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9jaGVja2JveC0tcHNldWRvXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vZHJvcGRvd25cbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqTGsuanNcbiAgICAqL1xuXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTM1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWJsb2NrX19pbm5lcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG5cbi8qXG4gICAgKiBGdW5jdGlvbnMuanNcbiAgICAqL1xuXG4vL1B1c2hVcFxuZnVuY3Rpb24gcHVzaFVwKHRleHQpIHtcbiAgICB2YXIgdGV4dCA9IHRleHQgfHwgJ9Ci0L7QstCw0YAg0LTQvtCx0LDQstC70LXQvSDQsiDQutC+0YDQt9C40L3Rgyc7XG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdwdXNoVXAnKTtcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcbiAgICAgICAgJ3B1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcbiAgICApO1xuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XG5cbiAgICByYWYoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSwgMzUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH0sIDQwMDApO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbn1cblxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbmZ1bmN0aW9uIHJhZihmbikge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy9DYXJkU2xpZGVyRnVuY3Rpb25cbmZ1bmN0aW9uIGNhcmRTbGlkZXIoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuIl19
