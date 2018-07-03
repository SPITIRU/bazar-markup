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
        sliderRelated();
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

    $(document).on('click', '.js-related-tab', function () {
        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    // $('.js-card-tab-related')
    //     .find('.tab__title')
    //     .on('click', function() {
    //         $(this)
    //             .closest('.js-card-tab-related')
    //             .find('.js-bz-slider--related')
    //             .slick('setPosition');
    //     });

    if ($(window).width() > 480) {
        $(document).on('click', '.js-tab', tabs);
    }

    $('#preview').on('shown.bs.modal', function (e) {
        $('.js-bz-slider--card').resize();
    });

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

        // itemSelect
        //     .not('.js-item-select-control--plus')
        //     .not('.js-item-select-control--minus')
        //     .on('click', function() {
        //         if ($(this).hasClass('is-active')) {
        //             $('.js-item-select').removeClass('is-active');
        //             $(this).removeClass('is-active');
        //         } else {
        //             $('.js-item-select').removeClass('is-active');
        //             $(this).addClass('is-active');
        //         }
        //     });

        $(document).on('click', '.js-item-select', function () {
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

        $(document).on('click', '.js-item-select-item', function () {
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

//sliderRelated
function sliderRelated() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJibG9jayIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwic2VhcmNoIiwic2VhcmNoQnRuU2hvdyIsInZhbCIsImhlYWRlck1haW4iLCJoZWFkZXJNYWluQ2xvbmUiLCJoaWRlIiwic2hvdyIsIm5leHQiLCJwYXJlbnQiLCJwcmV2Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwiYWxsUHJpY2VTdGFydCIsImFsbFByaWNlRW5kIiwic3BhbnMiLCJzdGFydFByaWNlIiwiZW5kUHJpY2UiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsImhhbmRsZSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwidGFicyIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImFjY29yZGVyb24iLCJub3QiLCJzbGlkZVVwIiwic2xpZGVEb3duIiwiaXMiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2UiLCJhcHBlbmRUbyIsInJhZiIsInNldFRpbWVvdXQiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJmYWRlIiwiYXNOYXZGb3IiLCJmb2N1c09uU2VsZWN0IiwiY2VudGVyTW9kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekJGLE1BQUVHLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QkosVUFBRSxNQUFGLEVBQVVLLFdBQVYsQ0FBc0IsU0FBdEI7O0FBRUE7QUFDQSxZQUFJQyxZQUFZTixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxZQUFJTSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxzQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMsNkJBQWEsU0FESTtBQUVqQkMsa0NBQWtCLEtBRkQ7QUFHakI7QUFDQUMseUJBQVMsS0FKUTtBQUtqQkMsdUJBQU8sR0FMVTtBQU1qQkMsNkJBQWEsS0FOSTtBQU9qQkMsOEJBQWMsTUFQRztBQVFqQkMsb0NBQW9CO0FBUkgsYUFBckI7QUFVQVQsc0JBQVVVLFNBQVYsQ0FBb0IsWUFBVztBQUMzQmhCLGtCQUFFLElBQUYsRUFDS2lCLGFBREwsR0FFS0MsTUFGTDtBQUdILGFBSkQ7QUFLSDtBQUNKLEtBdEJEOztBQXdCQTtBQUNBLFFBQUlsQixFQUFFLFlBQUYsRUFBZ0JPLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQUEsWUFjbkJZLFVBZG1CLEdBYzVCLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3JCQyxvQkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSxnQkFBSSxDQUFDRixJQUFJRyxFQUFULEVBQWE7QUFDVCx1QkFBT0gsSUFBSUksSUFBWDtBQUNIO0FBQ0QsZ0JBQUlDLFdBQVd6QixFQUFFb0IsSUFBSU0sT0FBTixFQUFlQyxJQUFmLENBQW9CLE9BQXBCLENBQWY7QUFDQSxnQkFBSSxDQUFDRixRQUFMLEVBQWU7QUFDWCx1QkFBT0wsSUFBSUks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O0FBRmQsU0FiUSxFQW1CUjtBQUNJTyx3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUNOUiw4QkFBYztBQURSO0FBRmQsU0FuQlE7QUFUa0IsS0FBbEM7QUFvQ0giLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNlbGVjdC5zZWxlY3Qtd2l0aC1pY29uJykuc2VsZWN0Mih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpYyxcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2Ugc2VsZWN0Jyk7XG4gICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XG4gICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNvcnRpbmctaWNvbiBzb3J0aW5nLWljb24tLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwIHx8ICQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICc5OS05OS05OTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xuICAgIH0pO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4JyB9LCAzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xuICAgIH1cblxuICAgIC8vSGFtYnVyZ2VyIGJ0blxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxuICAgICAgICAgICAgICAgICcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdydcbiAgICAgICAgICAgICkubGVuZ3RoXG4gICAgICAgIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIC8vTW9iaWxlIE5hdlxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xuXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcbiAgICAgICAgICAgIC5oaWRlKCk7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICB9KTtcbiAgICAvL0hpZGUgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgfSk7XG5cbiAgICAvL2J0biBmYXZvcml0ZVxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBTbGlkZXIuanNcbiAgICAqL1xuXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICAvL1NsaWRlciBOZXdcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL1NsaWRlciBDYXJkXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgY2FyZFNsaWRlcigpO1xuICAgIH1cbiAgICBcbiAgICAvL1NsaWRlciBQcm9tb1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZCgpO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXRhbG9nLmpzXG4gICAgKi9cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY29sb3ItaXRlbScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xuICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xuICAgIFxuICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9DaGFuZ2VyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAucmVzaXplKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XG4gICAgICAgIHZhciBlbmRQcmljZTtcbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXG4gICAgICAgICAgICAgICAgbWF4OiBhbGxQcmljZUVuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XG4gICAgICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQodmFsdWVzW2hhbmRsZV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgIH0pO1xuICAgIFxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuICAgIGlmICgkKCcuanMtc3Rpa3knKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDg1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMjAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWlubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogQ2FyZC5qc1xuICAgICovXG5cbiAgICAvL2NhcmQgdGFic1xuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xuICAgIFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcmVsYXRlZC10YWInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgLy8gICAgIC5maW5kKCcudGFiX190aXRsZScpXG4gICAgLy8gICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICQodGhpcylcbiAgICAvLyAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgIC8vICAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcbiAgICAvLyAgICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgLy8gICAgIH0pO1xuICAgIFxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYicsIHRhYnMpO1xuICAgIH1cbiAgICBcbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnJlc2l6ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuICAgIFxuICAgICAgICAkKCcuanMtdGFiJylcbiAgICAgICAgICAgIC51bndyYXAoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKVxuICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcbiAgICBcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuICAgIFxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBpdGVtU2VsZWN0XG4gICAgICAgIC8vICAgICAubm90KCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tcGx1cycpXG4gICAgICAgIC8vICAgICAubm90KCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tbWludXMnKVxuICAgICAgICAvLyAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSk7XG4gICAgXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNoYW5nZUNvbG9yKCk7XG4gICAgXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QtaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcbiAgICBcbiAgICAgICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcbiAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICBjaGFuZ2VDb2xvcigpO1xuICAgIFxuICAgICAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb250YWN0cy5qc1xuICAgICovXG5cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb21wb25lbnRzLmpzXG4gICAgKi9cblxuICAgIC8vQWNjb3JkZW9uXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBhY2NvcmRlcm9uID0gJCgnLmpzLWFjY29yZGVvbicpO1xuICAgIFxuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW06Zmlyc3QnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICBcbiAgICAgICAgYWNjb3JkZXJvbi5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFjY29yZGVyb24uaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiAgICAqIEZ1bmN0aW9ucy5qc1xuICAgICovXG5cbi8vUHVzaFVwXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3B1c2hVcCcpO1xuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuICAgICAgICAncHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuICAgICk7XG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9LCAzNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xufVxuXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuZnVuY3Rpb24gcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vL9Ci0LDQsdGLXG5mdW5jdGlvbiB0YWJzKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgIHZhciB0YWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX3RpdGxlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vL0NhcmRTbGlkZXJGdW5jdGlvblxuZnVuY3Rpb24gY2FyZFNsaWRlcigpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2Jykuc2xpY2soe1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQnLFxuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG4vL3NsaWRlclJlbGF0ZWRcbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWQoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuIl19
