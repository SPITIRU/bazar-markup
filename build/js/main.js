'use strict';

$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    }
    $('body').removeClass('loading');
});

$(document).ready(function () {
    $(window).on('load', function () {
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
    * Components.js
    */

    //Accordeon
    if ($('.js-accordeon').length > 0) {
        var accorderon = $('.js-accordeon');

        accorderon.find('.accordeon__item').not(':first').find('.accordeon__content').slideUp();
        accorderon.find('.accordeon__item:first').addClass('is-open').find('.accordeon__content').slideDown();

        $(document).on('click', '.accordeon__title', function () {
            if ($(this).parent().hasClass('is-open')) {
                $(this).parent().removeClass('is-open').find('.accordeon__content').slideUp();
            } else {
                $(this).parent().addClass('is-open').find('.accordeon__content').slideDown();
            }
        });
        if (accorderon.hasClass('lk__accordeon')) {
            $(this).find('.accordeon__item').filter(':first').removeClass('is-open').find('.accordeon__content').slideUp();
            $(this).find('.accordeon__title').on('click', function () {
                if ($(this).parent().hasClass('is-open')) {
                    $(this).find('.user-order__info').text('подробнее');
                } else {
                    $(this).find('.user-order__info').text('скрыть');
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
* Slider.js
*/

$(document).ready(function () {
    //Slick Slider https://kenwheeler.github.io/slick/

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

    if ($('.js-bz-slider--card-modal').length > 0 && $('.js-bz-slider--card-nav-modal').length > 0) {
        modalSlider();
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
    if ($('.js-bz-slider--related-modal').length > 0) {
        sliderRelatedModal();
    }
});

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

function modalSlider() {
    $('.js-bz-slider--card-modal').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-bz-slider--card-nav-modal',
        responsive: [{
            breakpoint: 481,
            settings: {
                dots: true,
                fade: false
            }
        }]
    });
    $('.js-bz-slider--card-nav-modal').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.js-bz-slider--card-modal',
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

function sliderRelatedModal() {
    $('.js-bz-slider--related-modal').slick({
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
* Card.js
*/

$(document).ready(function () {
    //card properties tabs
    $('.js-card-tab-related, .js-card-tab-related--modal').tabs();

    $(document).on('click', '.js-related-tab', function () {
        $(this).closest('.js-card-tab-related--modal').find('.js-bz-slider--related-modal').slick('setPosition');
        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    if ($(window).width() > 480) {
        $(document).on('click', '.js-tab', tabs);
        $(document).on('click', '.js-tab-modal', tabs);
    }

    zoom();

    $('#preview').on('shown.bs.modal', function (e) {
        $('.js-bz-slider--card-modal').resize();
        $('.js-bz-slider--related-modal').resize();

        if ($(window).width() <= 480) {
            tabTransform();
        }
    });

    //tabs ---> accordeon
    function tabTransform() {
        var tab = $('.js-tab--transform');

        $('.js-tab, .js-tab-modal').unwrap().addClass('accordeon accordeon--other js-accordeon').removeClass('tab__titles');
        tab.find('.tab__title').addClass('accordeon__title').removeClass('tab__title is-active').wrap('<div class="accordeon__item">');

        tab.find('[data-tab-content="0"]').removeAttr('style').insertAfter('[data-tab="0"]').parent().addClass('is-open');
        tab.find('[data-tab-content="1"]').css('display', 'none').insertAfter('[data-tab="1"]');

        tab.find('.tab__content').addClass('accordeon__content').removeClass('tab__content tab__content--product');
        tab.find('.tab__contentes').remove();
    }

    if ($(window).width() <= 480) {
        tabTransform();
    }

    //Card Item Select
    changeColor();

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
});

//Select Item changeColor
function changeColor() {
    $('.js-item-select').each(function () {
        var colorBox = $(this).find('.item-select__color');
        var color = colorBox.data('item-select-color');
        colorBox.css('background-color', color);
    }).find('.item-select__item').each(function () {
        var colorBox = $(this).find('.item-select__color');
        var color = colorBox.data('item-select-color');
        colorBox.css('background-color', color);
    });
}

//Tabs
function tabs(e) {
    var target = e.target;
    if (target.className == 'tab__title') {
        var dataTab = target.getAttribute('data-tab');
        var tabContent = $(this).parent().find('.tab__content');
        var tabTitle = $(this).parent().find('.tab__title');
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

//Zoom
function zoom() {
    if ($(window).width() > 480) {
        $('.js-zoom').okzoom({
            width: 200,
            height: 200,
            round: true,
            background: '#fff',
            // backgroundRepeat: 'repeat',
            scaleWidth: 700,
            shadow: '0 0 5px #000',
            border: '1px solid black'
        });
    }
}

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkb2N1bWVudCIsInJlYWR5Iiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiYWNjb3JkZXJvbiIsIm5vdCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJmaWx0ZXIiLCJpcyIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiY2FyZFNsaWRlciIsIm1vZGFsU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsInNsaWRlclJlbGF0ZWRNb2RhbCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwidGFicyIsInpvb20iLCJ0YWJUcmFuc2Zvcm0iLCJ0YWIiLCJ1bndyYXAiLCJ3cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJva3pvb20iLCJyb3VuZCIsImJhY2tncm91bmQiLCJzY2FsZVdpZHRoIiwic2hhZG93IiwiYm9yZGVyIiwicHVzaFVwIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwiYXBwZW5kVG8i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SiwwQkFBYzlFLE1BQWQ7QUFDSCxTQUZELEVBRUcsR0FGSDtBQUdILEtBTEQ7QUFNSDs7QUFFRDtBQUNBLFNBQVNpRixHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDYi9KLFdBQU9nSyxxQkFBUCxDQUE2QixZQUFXO0FBQ3BDaEssZUFBT2dLLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsU0FGRDtBQUdILEtBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKFxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWInKTtcbiAgICB9XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG59KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljLFxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBzZWxlY3QnKTtcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic29ydGluZy1pY29uIHNvcnRpbmctaWNvbi0tJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcbiAgICB9XG4gICAgbWFpbk9mZnNldCgpO1xuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgLy9IYW1idXJnZXIgYnRuXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xuICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgLy9Nb2JpbGUgTmF2XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcblxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKFxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSlcbiAgICAgICAgICAgICAgICAgICAgLnRleHQodGl0bGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaFxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XG5cbiAgICAgICAgc2VhcmNoQnRuU2hvdy5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKVxuICAgICAgICAgICAgLmhpZGUoKTtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TaG93IFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgIH0pO1xuICAgIC8vSGlkZSBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICB9KTtcblxuICAgIC8vYnRuIGZhdm9yaXRlXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAqIENhdGFsb2cuanNcbiAgICAqL1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jb2xvci1pdGVtJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XG4gICAgICAgIGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XG4gICAgXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NoYW5nZXJcbiAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICB9XG4gICAgXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgIH0pO1xuICAgIFxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuICAgIGlmICgkKCcuanMtc3Rpa3knKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDg1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMjAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWlubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogQ29tcG9uZW50cy5qc1xuICAgICovXG5cbiAgICAvL0FjY29yZGVvblxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgYWNjb3JkZXJvbiA9ICQoJy5qcy1hY2NvcmRlb24nKTtcbiAgICBcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgIGFjY29yZGVyb25cbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtOmZpcnN0JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuc2xpZGVEb3duKCk7XG4gICAgXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFjY29yZGVyb24uaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCc6Zmlyc3QnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQv9C+0LTRgNC+0LHQvdC10LUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfRgdC60YDRi9GC0YwnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vY2hlY2tib3hcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vY2hlY2tib3gtLXBzZXVkb1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2Ryb3Bkb3duXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKkxrLmpzXG4gICAgKi9cblxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuICAgIGlmICgkKCcuanMtc3Rpa3ktYmxvY2snKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEzNSxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1ibG9ja19faW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbn0pO1xuXG4vKlxuKiBTbGlkZXIuanNcbiovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG5cbiAgICAvL1NsaWRlciBOZXdcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2xpZGVyIENhcmRcbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICBjYXJkU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgbW9kYWxTbGlkZXIoKTtcbiAgICB9XG5cbiAgICAvL1NsaWRlciBQcm9tb1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzbGlkZXJSZWxhdGVkKCk7XG4gICAgfVxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzbGlkZXJSZWxhdGVkTW9kYWwoKTtcbiAgICB9XG59KTtcblxuLy9DYXJkU2xpZGVyRnVuY3Rpb25cbmZ1bmN0aW9uIGNhcmRTbGlkZXIoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbW9kYWxTbGlkZXIoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJyxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuLy9zbGlkZXJSZWxhdGVkXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogOCxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWRNb2RhbCgpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykuc2xpY2soe1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5cbi8qXG4qIENhcmQuanNcbiovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vY2FyZCBwcm9wZXJ0aWVzIHRhYnNcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCwgLmpzLWNhcmQtdGFiLXJlbGF0ZWQtLW1vZGFsJykudGFicygpO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1yZWxhdGVkLXRhYicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQtLW1vZGFsJylcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJylcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYicsIHRhYnMpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYi1tb2RhbCcsIHRhYnMpO1xuICAgIH1cblxuICAgIHpvb20oKTtcblxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykucmVzaXplKCk7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5yZXNpemUoKTtcblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy90YWJzIC0tLT4gYWNjb3JkZW9uXG4gICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XG5cbiAgICAgICAgJCgnLmpzLXRhYiwgLmpzLXRhYi1tb2RhbCcpXG4gICAgICAgICAgICAudW53cmFwKClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZXMnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX3RpdGxlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJylcbiAgICAgICAgICAgIC53cmFwKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uX19pdGVtXCI+Jyk7XG5cbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvL0NhcmQgSXRlbSBTZWxlY3RcbiAgICBjaGFuZ2VDb2xvcigpO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWl0ZW0tc2VsZWN0LWl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XG4gICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoKTtcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKVxuICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XG4gICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XG5cbiAgICAgICAgaW5wdXQudmFsKHRleHQpO1xuICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xuXG4gICAgICAgIGNoYW5nZUNvbG9yKCk7XG5cbiAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbi8vU2VsZWN0IEl0ZW0gY2hhbmdlQ29sb3JcbmZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xuICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pO1xufVxuXG4vL1RhYnNcbmZ1bmN0aW9uIHRhYnMoZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgdmFyIGRhdGFUYWIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xuICAgICAgICB2YXIgdGFiQ29udGVudCA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX2NvbnRlbnQnKTtcbiAgICAgICAgdmFyIHRhYlRpdGxlID0gJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vWm9vbVxuZnVuY3Rpb24gem9vbSgpIHtcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgJCgnLmpzLXpvb20nKS5va3pvb20oe1xuICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kUmVwZWF0OiAncmVwZWF0JyxcbiAgICAgICAgICAgIHNjYWxlV2lkdGg6IDcwMCxcbiAgICAgICAgICAgIHNoYWRvdzogJzAgMCA1cHggIzAwMCcsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKlxuKiBGdW5jdGlvbnMuanNcbiovXG5cbi8vUHVzaFVwXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3B1c2hVcCcpO1xuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuICAgICAgICAncHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuICAgICk7XG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9LCAzNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xufVxuXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuZnVuY3Rpb24gcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4iXX0=
