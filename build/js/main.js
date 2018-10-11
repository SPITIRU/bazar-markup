'use strict';

$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    }
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

$(document).ready(function () {
    //Bootsstrap lightbox gallary
    $(document).on('click', '[data-toggle="lightbox"]', function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });

    //Custom Select https://select2.org/
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

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
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

    //Change form title
    $(document).on('click', '.js-form-title', function () {
        var text = $(this).data('title');

        $('.js-form-title').removeClass('is-active');
        $(this).addClass('is-active');
        $(this).closest('.form').find('.form__btn').text(text);
    });

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }
    mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html, body').animate({
            scrollTop: destination - 90 + 'px'
        }, 300);
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
        $(document).on('click', '.js-main-nav-link--forward', function (e) {
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

    // Initialize/Destroy EasyZoom


    $('.js-easy-zoom').on('click', function (e) {

        if ($(window).width() >= 768) {

            var $easyzoom = $(this).easyZoom(),
                api = $easyzoom.data('easyZoom');

            e.preventDefault();

            if (!$(this).hasClass('is-ready')) {

                api._init();

                api.show();
            } else {

                api.teardown();
            };
        };
    }).find('a').on('click', function (e) {

        e.preventDefault();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzY3JvbGxCYXIiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJob3JpenJhaWxlbmFibGVkIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJtb3VzZW92ZXIiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwiZG9jdW1lbnQiLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVra29MaWdodGJveCIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsImNsb3Nlc3QiLCJmaW5kIiwibWFpbk9mZnNldCIsImNzcyIsIm91dGVySGVpZ2h0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwic2Nyb2xsIiwiaGVpZ2h0IiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiYWNjb3JkZXJvbiIsIm5vdCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJmaWx0ZXIiLCJpcyIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiY2FyZFNsaWRlciIsIm1vZGFsU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsInNsaWRlclJlbGF0ZWRNb2RhbCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwidGFicyIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsIiRlYXN5em9vbSIsImVhc3lab29tIiwiYXBpIiwiX2luaXQiLCJ0ZWFyZG93biIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFm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RCxFQUlHLElBSkg7O0FBUUE5RSxNQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVc7O0FBRXBEd0osc0JBQWNuSixXQUFkLENBQTBCLFdBQTFCOztBQUVBdUosbUJBQVcsWUFBVzs7QUFFbEJKLDBCQUFjNUUsTUFBZDtBQUVILFNBSkQsRUFJRyxHQUpIO0FBTUgsS0FWRDtBQVlIOztBQUlEOztBQUVBLFNBQVMrRSxHQUFULENBQWFFLEVBQWIsRUFBaUI7O0FBRWI5SixXQUFPK0oscUJBQVAsQ0FBNkIsWUFBVzs7QUFFcEMvSixlQUFPK0oscUJBQVAsQ0FBNkIsWUFBVzs7QUFFcENEO0FBRUgsU0FKRDtBQU1ILEtBUkQ7QUFVSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcclxuICAgICkge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnd2ViJyk7XHJcbiAgICB9XHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuXHJcbiAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXHJcbiAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxyXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAvL0Jvb3Rzc3RyYXAgbGlnaHRib3ggZ2FsbGFyeVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZT1cImxpZ2h0Ym94XCJdJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5la2tvTGlnaHRib3goKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Quc2VsZWN0LXdpdGgtaWNvbicpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpYyxcclxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2Ugc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNvcnRpbmctaWNvbiBzb3J0aW5nLWljb24tLScgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxyXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxyXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL0NoYW5nZSBmb3JtIHRpdGxlXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWZvcm0tdGl0bGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxyXG4gICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfVxyXG4gICAgbWFpbk9mZnNldCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnXHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyXHJcbiAgICAgICAgICAgIC5maW5kKCcuZm9vdGVyLWl0ZW0nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXHJcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcbiAgICAgICAgICAgICAgICAnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnXHJcbiAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAvL01vYmlsZSBOYXZcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKFxyXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2tcclxuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgIShcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcclxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xyXG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuU2hvdy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAubGVuZ3RoXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxyXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXHJcbiAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgfSk7XHJcbiAgICAvL0hpZGUgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ2F0YWxvZy5qc1xyXG4gICAgICovXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jb2xvci1pdGVtJywgZnVuY3Rpb24oZSkge1xuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcblxyXG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcblxyXG4gICAgICAgIGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XG5cclxuICAgIFxuXHJcbiAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxyXG4gICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAvL0NoYW5nZXJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcblxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG5cclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuXHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcblxyXG4gICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKVxuXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XG5cclxuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG5cclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcblxyXG4gICAgfSBlbHNlIHtcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcblxyXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG5cclxuICAgICAgICAgICAgLnJlc2l6ZSgpO1xuXHJcbiAgICB9XG5cclxuICAgIFxuXHJcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxyXG4gICAgfSk7XG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcblxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuXHJcbiAgICB9KTtcblxyXG4gICAgXG5cclxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuXHJcbiAgICBpZiAoJCgnLmpzLXN0aWt5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuXHJcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5Jywge1xuXHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDg1LFxuXHJcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDIwLFxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuXHJcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWlubmVyJ1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG4gICAgXHJcblxyXG4gICAgLypcclxuICAgICAqIENvbXBvbmVudHMuanNcclxuICAgICAqL1xyXG5cclxuICAgIC8vQWNjb3JkZW9uXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgbGV0IGFjY29yZGVyb24gPSAkKCcuanMtYWNjb3JkZW9uJyk7XG5cclxuICAgIFxuXHJcbiAgICAgICAgYWNjb3JkZXJvblxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcblxyXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAuc2xpZGVVcCgpO1xuXHJcbiAgICAgICAgYWNjb3JkZXJvblxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtOmZpcnN0JylcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAuc2xpZGVEb3duKCk7XG5cclxuICAgIFxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgaWYgKFxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgKSB7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICAgICAgaWYgKGFjY29yZGVyb24uaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuXHJcbiAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCc6Zmlyc3QnKVxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cclxuICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfRgdC60YDRi9GC0YwnKTtcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSk7XG5cclxuICAgICAgICB9XG5cclxuICAgIH1cblxyXG4gICAgXG5cclxuICAgIC8vY2hlY2tib3hcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgaWYgKFxuXHJcbiAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcblxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXG5cclxuICAgICAgICApIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgIH1cblxyXG4gICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICB9XG5cclxuICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgLy9kcm9wZG93blxuXHJcbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcblxyXG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAgKkxrLmpzXHJcbiAgICAgKi9cclxuXHJcbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcblxyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcblxyXG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcblxyXG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG5cclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG5cclxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG5cclxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG4gICAgXHJcbn0pO1xyXG5cclxuLypcclxuICogU2xpZGVyLmpzXHJcbiAqL1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cclxuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG5cclxuXG5cclxuICAgIC8vU2xpZGVyIE5ld1xuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuXHJcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIF1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuXG5cclxuICAgIC8vU2xpZGVyIENhcmRcblxyXG4gICAgaWYgKFxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLmxlbmd0aCA+IDAgJiZcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuXHJcbiAgICApIHtcblxyXG4gICAgICAgIGNhcmRTbGlkZXIoKTtcblxyXG4gICAgfVxuXHJcblxuXHJcbiAgICBpZiAoXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykubGVuZ3RoID4gMCAmJlxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5sZW5ndGggPiAwXG5cclxuICAgICkge1xuXHJcbiAgICAgICAgbW9kYWxTbGlkZXIoKTtcblxyXG4gICAgfVxuXHJcblxuXHJcbiAgICAvL1NsaWRlciBQcm9tb1xuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWVcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuXG5cclxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICBzbGlkZXJSZWxhdGVkKCk7XG5cclxuICAgIH1cblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICBzbGlkZXJSZWxhdGVkTW9kYWwoKTtcblxyXG4gICAgfVxuXHJcbn0pO1xuXHJcblxuXHJcbi8vQ2FyZFNsaWRlckZ1bmN0aW9uXG5cclxuZnVuY3Rpb24gY2FyZFNsaWRlcigpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG5cclxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXG5cclxuICAgICAgICBkb3RzOiB0cnVlLFxuXHJcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG5mdW5jdGlvbiBtb2RhbFNsaWRlcigpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnNsaWNrKHtcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJyxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG5cclxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5zbGljayh7XG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcsXG5cclxuICAgICAgICBkb3RzOiB0cnVlLFxuXHJcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG4vL3NsaWRlclJlbGF0ZWRcblxyXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkKCkge1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuXHJcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuXHJcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIHNwZWVkOiA1MDAsXG5cclxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG5cclxuICAgICAgICBkb3RzOiBmYWxzZSxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxuXHJcbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWRNb2RhbCgpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnNsaWNrKHtcblxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcblxyXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBzcGVlZDogNTAwLFxuXHJcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgZG90czogZmFsc2UsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cclxuXHJcbi8qXHJcbiAqIENhcmQuanNcclxuICovXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy9jYXJkIHByb3BlcnRpZXMgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLCAuanMtY2FyZC10YWItcmVsYXRlZC0tbW9kYWwnKS50YWJzKCk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXJlbGF0ZWQtdGFiJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQtLW1vZGFsJylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJylcclxuXHJcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcclxuXHJcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYicsIHRhYnMpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYi1tb2RhbCcsIHRhYnMpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykucmVzaXplKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcclxuXHJcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoJy5qcy10YWIsIC5qcy10YWItbW9kYWwnKVxyXG5cclxuICAgICAgICAgICAgLnVud3JhcCgpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXHJcblxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXHJcblxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJylcclxuXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcblxyXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy9DYXJkIEl0ZW0gU2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ29sb3IoKTtcclxuXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWl0ZW0tc2VsZWN0LWl0ZW0nLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICBsZXQgdGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgIC50ZXh0KCk7XHJcblxyXG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcclxuXHJcbiAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcclxuXHJcbiAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcclxuXHJcblxyXG5cclxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIC8vIEluaXRpYWxpemUvRGVzdHJveSBFYXN5Wm9vbVxyXG5cclxuXHJcblxyXG4gICAgJCgnLmpzLWVhc3ktem9vbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZWFzeXpvb20gPSAkKHRoaXMpLmVhc3lab29tKCksXHJcblxyXG4gICAgICAgICAgICAgICAgYXBpID0gJGVhc3l6b29tLmRhdGEoJ2Vhc3lab29tJyk7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtcmVhZHknKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGFwaS5faW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFwaS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGFwaS50ZWFyZG93bigpO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbi8vU2VsZWN0IEl0ZW0gY2hhbmdlQ29sb3JcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xyXG5cclxuICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXHJcblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXHJcblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vVGFic1xyXG5cclxuZnVuY3Rpb24gdGFicyhlKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xyXG5cclxuICAgICAgICB2YXIgZGF0YVRhYiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcblxyXG4gICAgICAgIHZhciB0YWJDb250ZW50ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLnRhYl9fY29udGVudCcpO1xyXG5cclxuICAgICAgICB2YXIgdGFiVGl0bGUgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX190aXRsZScpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLypcclxuICogRnVuY3Rpb25zLmpzXHJcbiAqL1xyXG5cclxuLy9QdXNoVXBcblxyXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuXHJcbiAgICB2YXIgdGV4dCA9IHRleHQgfHwgJ9Ci0L7QstCw0YAg0LTQvtCx0LDQstC70LXQvSDQsiDQutC+0YDQt9C40L3Rgyc7XG5cclxuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygncHVzaFVwJyk7XG5cclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuXHJcbiAgICAgICAgJ3B1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcblxyXG4gICAgKTtcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuXHJcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XG5cclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xuXHJcblxuXHJcbiAgICByYWYoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgfSk7XG5cclxuXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgfSwgMzUwMCk7XG5cclxuXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuXHJcbiAgICB9LCA0MDAwKTtcblxyXG5cblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcblxyXG4gICAgICAgIH0sIDMwMCk7XG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuXHJcbmZ1bmN0aW9uIHJhZihmbikge1xuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBmbigpO1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cclxuIl19
