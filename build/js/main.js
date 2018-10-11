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

        var $easyzoom = $(this).easyZoom(),
            api = $easyzoom.data('easyZoom');

        e.preventDefault();

        if (!$(this).hasClass('is-ready')) {

            api._init();

            api.show();
        } else {

            api.teardown();
        };
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzY3JvbGxCYXIiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJob3JpenJhaWxlbmFibGVkIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJtb3VzZW92ZXIiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwiZG9jdW1lbnQiLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVra29MaWdodGJveCIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsImNsb3Nlc3QiLCJmaW5kIiwibWFpbk9mZnNldCIsImNzcyIsIm91dGVySGVpZ2h0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwic2Nyb2xsIiwiaGVpZ2h0IiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiYWNjb3JkZXJvbiIsIm5vdCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJmaWx0ZXIiLCJpcyIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiY2FyZFNsaWRlciIsIm1vZGFsU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsInNsaWRlclJlbGF0ZWRNb2RhbCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwidGFicyIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsIiRlYXN5em9vbSIsImVhc3lab29tIiwiYXBpIiwiX2luaXQiLCJ0ZWFyZG93biIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFmIiwic2V0VGltZW91dCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7QUFDN0IsUUFDSSw2Q0FBNkNDLElBQTdDLENBQWtEQyxVQUFVQyxTQUE1RCxDQURKLEVBRUU7QUFDRUwsVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSCxLQUpELE1BSU87QUFDSE4sVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSDtBQUNETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0Qjs7QUFFQTtBQUNBLFFBQUlDLFlBQVlSLEVBQUUsWUFBRixDQUFoQjtBQUNBLFFBQUlRLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEJELGtCQUFVRSxVQUFWLENBQXFCO0FBQ2pCQyx5QkFBYSxTQURJO0FBRWpCQyw4QkFBa0IsS0FGRDtBQUdqQjtBQUNBQyxxQkFBUyxLQUpRO0FBS2pCQyxtQkFBTyxHQUxVO0FBTWpCQyx5QkFBYSxLQU5JO0FBT2pCQywwQkFBYyxNQVBHO0FBUWpCQyxnQ0FBb0I7QUFSSCxTQUFyQjtBQVVBVCxrQkFBVVUsU0FBVixDQUFvQixZQUFZO0FBQzVCbEIsY0FBRSxJQUFGLEVBQ0ttQixhQURMLEdBRUtDLE1BRkw7QUFHSCxTQUpEO0FBS0g7QUFDSixDQTdCRDs7QUErQkFwQixFQUFFcUIsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDMUI7QUFDQXRCLE1BQUVxQixRQUFGLEVBQVluQixFQUFaLENBQWUsT0FBZixFQUF3QiwwQkFBeEIsRUFBb0QsVUFBVXFCLENBQVYsRUFBYTtBQUM3REEsVUFBRUMsY0FBRjtBQUNBeEIsVUFBRSxJQUFGLEVBQVF5QixZQUFSO0FBQ0gsS0FIRDs7QUFLQTtBQUNBLFFBQUl6QixFQUFFLFlBQUYsRUFBZ0JTLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQUEsWUFjbkJpQixVQWRtQixHQWM1QixTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QjtBQUNyQkMsb0JBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsZ0JBQUksQ0FBQ0YsSUFBSUcsRUFBVCxFQUFhO0FBQ1QsdUJBQU9ILElBQUlJLElBQVg7QUFDSDtBQUNELGdCQUFJQyxXQUFXaEMsRUFBRTJCLElBQUlNLE9BQU4sRUFBZUMsSUFBZixDQUFvQixPQUFwQixDQUFmO0FBQ0EsZ0JBQUksQ0FBQ0YsUUFBTCxFQUFlO0FBQ1gsdUJBQU9MLElBQUlJLElBQVg7QUFDSCxhQUZELE1BRU87QUFDSCxvQkFBSUksT0FBT25DLEVBQ1AsNkNBQ0FnQyxRQURBLEdBRUEsSUFGQSxHQUdBaEMsRUFBRTJCLElBQUlNLE9BQU4sRUFBZUYsSUFBZixFQUhBLEdBSUEsU0FMTyxDQUFYO0FBT0EsdUJBQU9JLElBQVA7QUFDSDtBQUNKLFNBaEMyQjs7QUFDNUJuQyxVQUFFLFlBQUYsRUFBZ0JvQyxPQUFoQixDQUF3QjtBQUNwQkMseUJBQWFyQyxFQUFFLElBQUYsRUFBUWtDLElBQVIsQ0FBYSxhQUFiO0FBRE8sU0FBeEI7O0FBSUFsQyxVQUFFLDZCQUFGLEVBQWlDb0MsT0FBakMsQ0FBeUM7QUFDckNFLDRCQUFnQlosVUFEcUI7QUFFckNhLHFDQUF5QixDQUFDO0FBRlcsU0FBekM7O0FBS0F2QyxVQUFFLHNCQUFGLEVBQTBCb0MsT0FBMUIsQ0FBa0M7QUFDOUJHLHFDQUF5QixDQUFDO0FBREksU0FBbEM7QUF1Qkg7O0FBRUQ7QUFDQSxRQUFJdkMsRUFBRSxnQkFBRixFQUFvQlMsTUFBcEIsR0FBNkIsQ0FBN0IsSUFBa0NULEVBQUUsZUFBRixFQUFtQlMsTUFBbkIsR0FBNEIsQ0FBbEUsRUFBcUU7QUFDakVULFVBQUUsZ0JBQUYsRUFBb0J3QyxTQUFwQixDQUE4QjtBQUMxQkMsa0JBQU0sb0JBRG9CO0FBRTFCQyw2QkFBaUI7QUFGUyxTQUE5QjtBQUlBMUMsVUFBRSxlQUFGLEVBQW1Cd0MsU0FBbkIsQ0FBNkI7QUFDekJDLGtCQUFNLFlBRG1CO0FBRXpCQyw2QkFBaUI7QUFGUSxTQUE3QjtBQUlIOztBQUVEO0FBQ0ExQyxNQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsZ0JBQXhCLEVBQTBDLFlBQVk7QUFDbEQsWUFBSTZCLE9BQU8vQixFQUFFLElBQUYsRUFBUWtDLElBQVIsQ0FBYSxPQUFiLENBQVg7O0FBRUFsQyxVQUFFLGdCQUFGLEVBQW9CTyxXQUFwQixDQUFnQyxXQUFoQztBQUNBUCxVQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixXQUFqQjtBQUNBTixVQUFFLElBQUYsRUFDSzJDLE9BREwsQ0FDYSxPQURiLEVBRUtDLElBRkwsQ0FFVSxZQUZWLEVBR0tiLElBSEwsQ0FHVUEsSUFIVjtBQUlILEtBVEQ7O0FBV0EsYUFBU2MsVUFBVCxHQUFzQjtBQUNsQjdDLFVBQUUsT0FBRixFQUFXOEMsR0FBWCxDQUFlLGFBQWYsRUFBOEI5QyxFQUFFLFNBQUYsRUFBYStDLFdBQWIsRUFBOUI7QUFDSDtBQUNERjtBQUNBN0MsTUFBRUMsTUFBRixFQUFVbUIsTUFBVixDQUFpQnlCLFVBQWpCOztBQUVBO0FBQ0E3QyxNQUFFLFlBQUYsRUFBZ0JFLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVVxQixDQUFWLEVBQWE7QUFDckNBLFVBQUVDLGNBQUY7QUFDQXhCLFVBQUUsWUFBRixFQUFnQmdELE9BQWhCLENBQXdCO0FBQ3BCQyx1QkFBVztBQURTLFNBQXhCLEVBRUcsR0FGSDtBQUdILEtBTEQ7O0FBT0E7QUFDQWpELE1BQUUsVUFBRixFQUFja0QsS0FBZCxDQUFvQixZQUFZO0FBQzVCLFlBQUlDLGVBQWVuRCxFQUFFLElBQUYsRUFBUW9ELElBQVIsQ0FBYSxNQUFiLENBQW5CO0FBQ0EsWUFBSUMsY0FBY3JELEVBQUVtRCxZQUFGLEVBQWdCRyxNQUFoQixHQUF5QkMsR0FBM0M7QUFDQXZELFVBQUUsWUFBRixFQUFnQmdELE9BQWhCLENBQXdCO0FBQ3BCQyx1QkFBV0ksY0FBYyxFQUFkLEdBQW1CO0FBRFYsU0FBeEIsRUFFRyxHQUZIO0FBR0EsZUFBTyxLQUFQO0FBQ0gsS0FQRDtBQVFBckQsTUFBRUMsTUFBRixFQUFVdUQsTUFBVixDQUFpQixZQUFZO0FBQ3pCLFlBQUl4RCxFQUFFLElBQUYsRUFBUWlELFNBQVIsS0FBc0JqRCxFQUFFLElBQUYsRUFBUXlELE1BQVIsRUFBMUIsRUFBNEM7QUFDeEN6RCxjQUFFLFlBQUYsRUFBZ0JNLFFBQWhCLENBQXlCLFlBQXpCO0FBQ0EsZ0JBQUlOLEVBQUUsT0FBRixFQUFXMEQsUUFBWCxDQUFvQixTQUFwQixLQUFrQzFELEVBQUVDLE1BQUYsRUFBVTBELEtBQVYsTUFBcUIsR0FBM0QsRUFBZ0U7QUFDNUQzRCxrQkFBRSxZQUFGLEVBQWdCOEMsR0FBaEIsQ0FBb0IsUUFBcEIsRUFBOEIsRUFBOUI7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxLQUFQO0FBQ0g7QUFDSixTQVBELE1BT087QUFDSDlDLGNBQUUsWUFBRixFQUFnQk8sV0FBaEIsQ0FBNEIsWUFBNUI7QUFDQVAsY0FBRSxZQUFGLEVBQWdCNEQsVUFBaEIsQ0FBMkIsT0FBM0I7QUFDSDtBQUNKLEtBWkQ7O0FBY0E7QUFDQTVELE1BQUUsS0FBRixFQUFTRSxFQUFULENBQVksV0FBWixFQUF5QixVQUFVMkQsS0FBVixFQUFpQjtBQUN0Q0EsY0FBTXJDLGNBQU47QUFDSCxLQUZEOztBQUlBO0FBQ0EsUUFBSXhCLEVBQUVDLE1BQUYsRUFBVTBELEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUIsWUFBSUcsU0FBUzlELEVBQUUsWUFBRixDQUFiO0FBQ0E4RCxlQUNLbEIsSUFETCxDQUNVLGNBRFYsRUFFS3RDLFFBRkwsQ0FFYyxpQkFGZCxFQUdLeUQsT0FITCxDQUdhLHNDQUhiO0FBSUFELGVBQU9sQixJQUFQLENBQVkscUJBQVosRUFBbUN0QyxRQUFuQyxDQUE0QyxrQkFBNUM7QUFDQXdELGVBQU9sQixJQUFQLENBQVksdUJBQVosRUFBcUN0QyxRQUFyQyxDQUE4QyxvQkFBOUM7QUFDSDs7QUFFRDtBQUNBTixNQUFFLGVBQUYsRUFBbUJFLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVk7QUFDdkNGLFVBQUUsSUFBRixFQUFRZ0UsV0FBUixDQUFvQixJQUFwQjtBQUNBaEUsVUFBRSxjQUFGLEVBQWtCZ0UsV0FBbEIsQ0FBOEIsU0FBOUI7QUFDQWhFLFVBQUUsYUFBRixFQUFpQmdFLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0EzQyxpQkFBUzRDLGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixHQUNJOUMsU0FBUzRDLGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixLQUE0QyxFQUE1QyxHQUFpRCxRQUFqRCxHQUE0RCxFQURoRTtBQUVBLGVBQU8sS0FBUDtBQUNILEtBUEQ7QUFRQTtBQUNBbkUsTUFBRXFCLFFBQUYsRUFBWTZCLEtBQVosQ0FBa0IsVUFBVTNCLENBQVYsRUFBYTtBQUMzQixZQUNJdkIsRUFBRXVCLEVBQUU2QyxNQUFKLEVBQVl6QixPQUFaLENBQ0ksdURBREosRUFFRWxDLE1BSE4sRUFLSTtBQUNKVCxVQUFFLGVBQUYsRUFBbUJPLFdBQW5CLENBQStCLElBQS9CO0FBQ0FQLFVBQUUsY0FBRixFQUFrQk8sV0FBbEIsQ0FBOEIsU0FBOUI7QUFDQVAsVUFBRSxhQUFGLEVBQWlCTyxXQUFqQixDQUE2QixXQUE3QjtBQUNBYyxpQkFBUzRDLGVBQVQsQ0FBeUJDLEtBQXpCLEdBQWlDLEVBQWpDO0FBQ0EzQyxVQUFFOEMsZUFBRjtBQUNILEtBWkQ7O0FBY0EsUUFBSXJFLEVBQUVDLE1BQUYsRUFBVTBELEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUI7QUFDQTNELFVBQUUsY0FBRixFQUFrQnNFLFNBQWxCLENBQTRCLFdBQTVCO0FBQ0F0RSxVQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsNEJBQXhCLEVBQXNELFVBQVVxQixDQUFWLEVBQWE7QUFDL0RBLGNBQUVDLGNBQUY7QUFDQSxnQkFBSStDLFVBQVV2RSxFQUFFLElBQUYsRUFBUTJDLE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWQ7QUFDQSxnQkFBSTZCLGtCQUFrQnhFLEVBQUUsSUFBRixFQUFRMkMsT0FBUixDQUFnQixxQkFBaEIsQ0FBdEI7QUFDQSxnQkFBSThCLG1CQUFtQkYsUUFBUTNCLElBQVIsQ0FBYSxxQkFBYixDQUF2QjtBQUNBLGdCQUFJOEIsZUFBZTFFLEVBQUUsSUFBRixFQUFRMkMsT0FBUixDQUFnQixxQkFBaEIsQ0FBbkI7O0FBRUEsZ0JBQUlnQyxRQUFRM0UsRUFBRSxJQUFGLEVBQVErQixJQUFSLEVBQVo7QUFDQSxnQkFBSTZDLFFBQVE1RSxFQUNSLDREQURRLENBQVo7O0FBSUEsZ0JBQ0ksQ0FBQ3VFLFFBQVFiLFFBQVIsQ0FBaUIsV0FBakIsQ0FBRCxJQUNBLENBQUMxRCxFQUFFLElBQUYsRUFBUTBELFFBQVIsQ0FBaUIsMkJBQWpCLENBRkwsRUFHRTtBQUNFYSx3QkFBUWpFLFFBQVIsQ0FBaUIsV0FBakI7QUFDQXNFLHNCQUNLQyxXQURMLENBQ2lCTixRQUFRM0IsSUFBUixDQUFhLDRCQUFiLENBRGpCLEVBRUtiLElBRkwsQ0FFVTRDLEtBRlY7QUFHSCxhQVJELE1BUU8sSUFDSEosUUFBUWIsUUFBUixDQUFpQixXQUFqQixLQUNBLENBQUNjLGdCQUFnQmQsUUFBaEIsQ0FBeUIsV0FBekIsQ0FERCxJQUVBLEVBQ0kxRCxFQUFFLElBQUYsRUFBUTBELFFBQVIsQ0FBaUIsMkJBQWpCLEtBQ0ExRCxFQUFFLElBQUYsRUFBUTBELFFBQVIsQ0FBaUIsMkJBQWpCLENBRkosQ0FIRyxFQU9MO0FBQ0VjLGdDQUFnQmxFLFFBQWhCLENBQXlCLFdBQXpCO0FBQ0FvRSw2QkFBYTVCLEdBQWIsQ0FBaUIsVUFBakIsRUFBNkIsUUFBN0I7QUFDSCxhQVZNLE1BVUEsSUFDSHlCLFFBQVFiLFFBQVIsQ0FBaUIsV0FBakIsS0FDQSxDQUFDZSxpQkFBaUJmLFFBQWpCLENBQTBCLFdBQTFCLENBREQsS0FFQzFELEVBQUUsSUFBRixFQUFRMEQsUUFBUixDQUFpQiwyQkFBakIsS0FDRzFELEVBQUUsSUFBRixFQUFRMEQsUUFBUixDQUFpQiwyQkFBakIsQ0FISixDQURHLEVBS0w7QUFDRWEsd0JBQVFoRSxXQUFSLENBQW9CLFdBQXBCO0FBQ0FpRSxnQ0FBZ0I1QixJQUFoQixDQUFxQiw0QkFBckIsRUFBbURrQyxNQUFuRDtBQUNILGFBUk0sTUFRQSxJQUNIUCxRQUFRYixRQUFSLENBQWlCLFdBQWpCLEtBQ0FlLGlCQUFpQmYsUUFBakIsQ0FBMEIsV0FBMUIsQ0FEQSxLQUVDMUQsRUFBRSxJQUFGLEVBQVEwRCxRQUFSLENBQWlCLDJCQUFqQixLQUNHMUQsRUFBRSxJQUFGLEVBQVEwRCxRQUFSLENBQWlCLDJCQUFqQixDQUhKLENBREcsRUFLTDtBQUNFZSxpQ0FBaUJsRSxXQUFqQixDQUE2QixXQUE3QjtBQUNBbUUsNkJBQWFkLFVBQWIsQ0FBd0IsT0FBeEI7QUFDSDtBQUNKLFNBL0NEOztBQWlEQTtBQUNBLFlBQUltQixTQUFTL0UsRUFBRSxZQUFGLENBQWI7QUFDQSxZQUFJZ0YsZ0JBQWdCaEYsRUFBRSx5QkFBRixDQUFwQjs7QUFFQWdGLHNCQUFjOUUsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFZO0FBQ2xDLGdCQUFJNkUsT0FBT3JCLFFBQVAsQ0FBZ0IsWUFBaEIsQ0FBSixFQUFtQztBQUMvQnFCLHVCQUFPeEUsV0FBUCxDQUFtQixZQUFuQjtBQUNBd0UsdUJBQU9uQyxJQUFQLENBQVksa0JBQVosRUFBZ0NxQyxHQUFoQyxDQUFvQyxFQUFwQztBQUNBRix1QkFBT25DLElBQVAsQ0FBWSxlQUFaLEVBQTZCRSxHQUE3QixDQUFpQyxTQUFqQyxFQUE0QyxNQUE1QztBQUNILGFBSkQsTUFJTztBQUNIaUMsdUJBQU96RSxRQUFQLENBQWdCLFlBQWhCO0FBQ0g7QUFDSixTQVJEOztBQVVBO0FBQ0FOLFVBQUVxQixRQUFGLEVBQVk2QixLQUFaLENBQWtCLFVBQVVXLEtBQVYsRUFBaUI7QUFDL0IsZ0JBQ0k3RCxFQUFFNkQsTUFBTU8sTUFBUixFQUFnQnpCLE9BQWhCLENBQXdCLHFDQUF4QixFQUNDbEMsTUFGTCxFQUlJO0FBQ0pzRSxtQkFBT3hFLFdBQVAsQ0FBbUIsWUFBbkI7QUFDQXdFLG1CQUFPbkMsSUFBUCxDQUFZLGtCQUFaLEVBQWdDcUMsR0FBaEMsQ0FBb0MsRUFBcEM7QUFDQUYsbUJBQU9uQyxJQUFQLENBQVksZUFBWixFQUE2QkUsR0FBN0IsQ0FBaUMsU0FBakMsRUFBNEMsTUFBNUM7QUFDQWUsa0JBQU1RLGVBQU47QUFDSCxTQVZEO0FBV0gsS0E5RUQsTUE4RU87QUFDSCxZQUFJYSxhQUFhbEYsRUFBRSxjQUFGLENBQWpCO0FBQ0EsWUFBSW1GLGtCQUFrQm5GLEVBQUUsa0NBQUYsRUFDakI4QyxHQURpQixDQUNiLFFBRGEsRUFDSCxFQURHLEVBRWpCK0IsV0FGaUIsQ0FFTCxjQUZLLEVBR2pCTyxJQUhpQixFQUF0QjtBQUlBcEYsVUFBRUMsTUFBRixFQUFVdUQsTUFBVixDQUFpQixZQUFZO0FBQ3pCLGdCQUFJeEQsRUFBRSxJQUFGLEVBQVFpRCxTQUFSLE1BQXVCakQsRUFBRSxtQkFBRixFQUF1QitDLFdBQXZCLEVBQTNCLEVBQWlFO0FBQzdEbUMsMkJBQVc1RSxRQUFYLENBQW9CLGVBQXBCO0FBQ0E2RSxnQ0FBZ0JFLElBQWhCO0FBQ0gsYUFIRCxNQUdPO0FBQ0hILDJCQUFXM0UsV0FBWCxDQUF1QixlQUF2QjtBQUNBNEUsZ0NBQWdCQyxJQUFoQjtBQUNIO0FBQ0osU0FSRDtBQVNIOztBQUVEO0FBQ0FwRixNQUFFLDBCQUFGLEVBQThCRSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFZO0FBQ2xERixVQUFFLElBQUYsRUFBUThDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBQ0E5QyxVQUFFLElBQUYsRUFDS3NGLElBREwsR0FFS3hDLEdBRkwsQ0FFUyxTQUZULEVBRW9CLE9BRnBCO0FBR0E5QyxVQUFFLElBQUYsRUFDS3VGLE1BREwsR0FFSzNDLElBRkwsQ0FFVSx3QkFGVixFQUdLUSxJQUhMLENBR1UsTUFIVixFQUdrQixNQUhsQjtBQUlILEtBVEQ7QUFVQTtBQUNBcEQsTUFBRSwwQkFBRixFQUE4QkUsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBWTtBQUNsREYsVUFBRSxJQUFGLEVBQVE4QyxHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNBOUMsVUFBRSxJQUFGLEVBQ0t3RixJQURMLEdBRUsxQyxHQUZMLENBRVMsU0FGVCxFQUVvQixPQUZwQjtBQUdBOUMsVUFBRSxJQUFGLEVBQ0t1RixNQURMLEdBRUszQyxJQUZMLENBRVUsb0JBRlYsRUFHS1EsSUFITCxDQUdVLE1BSFYsRUFHa0IsVUFIbEI7QUFJSCxLQVREOztBQVdBO0FBQ0FwRCxNQUFFLHNCQUFGLEVBQTBCRSxFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUFVcUIsQ0FBVixFQUFhO0FBQy9DLFlBQUksQ0FBQ3ZCLEVBQUUsSUFBRixFQUFRMEQsUUFBUixDQUFpQixZQUFqQixDQUFMLEVBQXFDO0FBQ2pDMUQsY0FBRSxJQUFGLEVBQVFNLFFBQVIsQ0FBaUIsWUFBakI7QUFDSCxTQUZELE1BRU87QUFDSE4sY0FBRSxJQUFGLEVBQVFPLFdBQVIsQ0FBb0IsWUFBcEI7QUFDSDtBQUNEZ0IsVUFBRUMsY0FBRjtBQUNILEtBUEQ7O0FBU0E7Ozs7QUFJQXhCLE1BQUVxQixRQUFGLEVBQVluQixFQUFaLENBQWUsT0FBZixFQUF3QixnQkFBeEIsRUFBMEMsVUFBU3FCLENBQVQsRUFBWTs7QUFFbEQsWUFBSWtFLE9BQU96RixFQUFFLElBQUYsRUFBUTJDLE9BQVIsQ0FBZ0Isa0JBQWhCLENBQVg7O0FBRUEsWUFBSStDLFFBQVExRixFQUFFLElBQUYsRUFBUWtDLElBQVIsQ0FBYSxPQUFiLENBQVo7O0FBRUEsWUFBSXlELE1BQU1GLEtBQUs3QyxJQUFMLENBQVUsc0JBQVYsQ0FBVjs7QUFJQStDLFlBQUl2QyxJQUFKLENBQVMsS0FBVCxFQUFnQnNDLEtBQWhCOztBQUVBbkUsVUFBRUMsY0FBRjtBQUVILEtBZEQ7O0FBa0JBOztBQUVBeEIsTUFBRSxhQUFGLEVBRUs0QyxJQUZMLENBRVUsZ0JBRlYsRUFJSzFDLEVBSkwsQ0FJUSxPQUpSLEVBSWlCLFlBQVc7O0FBRXBCLFlBQUlGLEVBQUUsSUFBRixFQUFRMEQsUUFBUixDQUFpQixZQUFqQixDQUFKLEVBQW9DOztBQUVoQztBQUVILFNBSkQsTUFJTzs7QUFFSDFELGNBQUUsYUFBRixFQUVLNEMsSUFGTCxDQUVVLGdCQUZWLEVBSUtyQyxXQUpMLENBSWlCLFlBSmpCOztBQU1BUCxjQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixZQUFqQjs7QUFFQTtBQUVIO0FBRUosS0F4Qkw7O0FBNEJBTixNQUFFLGFBQUYsRUFFSzRDLElBRkwsQ0FFVSxpQkFGVixFQUlLMUMsRUFKTCxDQUlRLE9BSlIsRUFJaUIsVUFBU3FCLENBQVQsRUFBWTs7QUFFckIsWUFBSWtFLE9BQU96RixFQUFFLElBQUYsRUFBUXVGLE1BQVIsQ0FBZSxnQkFBZixDQUFYOztBQUVBLFlBQUlFLEtBQUsvQixRQUFMLENBQWMsWUFBZCxDQUFKLEVBQWlDOztBQUU3QitCLGlCQUFLbEYsV0FBTCxDQUFpQixZQUFqQjtBQUVIOztBQUVEZ0IsVUFBRThDLGVBQUY7QUFFSCxLQWhCTDs7QUFvQkFyRSxNQUFFLHlCQUFGLEVBRUs0QyxJQUZMLENBRVUsMEJBRlYsRUFJS2dELElBSkwsQ0FJVSxZQUFXOztBQUViLFlBQUlDLFdBQVc3RixFQUFFLElBQUYsRUFBUTRDLElBQVIsQ0FBYSx3QkFBYixDQUFmOztBQUVBLFlBQUk4QyxRQUFRRyxTQUFTM0QsSUFBVCxDQUFjLGNBQWQsQ0FBWjs7QUFFQTJELGlCQUFTL0MsR0FBVCxDQUFhLGtCQUFiLEVBQWlDNEMsS0FBakM7QUFFSCxLQVpMOztBQWdCQSxRQUFJMUYsRUFBRUMsTUFBRixFQUFVMEQsS0FBVixNQUFxQixHQUF6QixFQUE4Qjs7QUFFMUIzRCxVQUFFLHlCQUFGLEVBRUs0QyxJQUZMLENBRVUsMEJBRlYsRUFJS3JDLFdBSkwsQ0FJaUIsV0FKakI7QUFNSCxLQVJELE1BUU87O0FBRUhQLFVBQUUseUJBQUYsRUFFSzRDLElBRkwsQ0FFVSwwQkFGVixFQUlLekIsYUFKTCxHQU1LQyxNQU5MO0FBUUg7O0FBSUQ7O0FBRUFwQixNQUFFLDBCQUFGLEVBQThCRSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFXOztBQUVqREYsVUFBRSxvQkFBRixFQUF3Qk0sUUFBeEIsQ0FBaUMsWUFBakM7O0FBRUFlLGlCQUFTNEMsZUFBVCxDQUF5QkMsS0FBekIsQ0FBK0JDLFFBQS9CLEdBQTBDLFFBQTFDO0FBRUgsS0FORDs7QUFRQW5FLE1BQUUsMEJBQUYsRUFBOEJFLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVc7O0FBRWpERixVQUFFLG9CQUFGLEVBQXdCTyxXQUF4QixDQUFvQyxZQUFwQzs7QUFFQWMsaUJBQVM0QyxlQUFULENBQXlCQyxLQUF6QixHQUFpQyxFQUFqQztBQUVILEtBTkQ7O0FBVUE7O0FBRUEsUUFBSWxFLEVBQUUsV0FBRixFQUFlUyxNQUFmLEdBQXdCLENBQXhCLElBQTZCVCxFQUFFQyxNQUFGLEVBQVUwRCxLQUFWLEtBQW9CLEdBQXJELEVBQTBEOztBQUV0RCxZQUFJbUMsVUFBVSxJQUFJQyxhQUFKLENBQWtCLFdBQWxCLEVBQStCOztBQUV6Q0Msd0JBQVksRUFGNkI7O0FBSXpDQywyQkFBZSxFQUowQjs7QUFNekNDLCtCQUFtQixnQkFOc0I7O0FBUXpDQyxrQ0FBc0I7O0FBUm1CLFNBQS9CLENBQWQ7QUFZSDs7QUFJRDs7OztBQUlBOztBQUVBLFFBQUluRyxFQUFFLGVBQUYsRUFBbUJTLE1BQW5CLEdBQTRCLENBQWhDLEVBQW1DOztBQUUvQixZQUFJMkYsYUFBYXBHLEVBQUUsZUFBRixDQUFqQjs7QUFJQW9HLG1CQUVLeEQsSUFGTCxDQUVVLGtCQUZWLEVBSUt5RCxHQUpMLENBSVMsUUFKVCxFQU1LekQsSUFOTCxDQU1VLHFCQU5WLEVBUUswRCxPQVJMOztBQVVBRixtQkFFS3hELElBRkwsQ0FFVSx3QkFGVixFQUlLdEMsUUFKTCxDQUljLFNBSmQsRUFNS3NDLElBTkwsQ0FNVSxxQkFOVixFQVFLMkQsU0FSTDs7QUFZQXZHLFVBQUVxQixRQUFGLEVBQVluQixFQUFaLENBQWUsT0FBZixFQUF3QixtQkFBeEIsRUFBNkMsWUFBVzs7QUFFcEQsZ0JBRUlGLEVBQUUsSUFBRixFQUVLdUYsTUFGTCxHQUlLN0IsUUFKTCxDQUljLFNBSmQsQ0FGSixFQVFFOztBQUVFMUQsa0JBQUUsSUFBRixFQUVLdUYsTUFGTCxHQUlLaEYsV0FKTCxDQUlpQixTQUpqQixFQU1LcUMsSUFOTCxDQU1VLHFCQU5WLEVBUUswRCxPQVJMO0FBVUgsYUFwQkQsTUFvQk87O0FBRUh0RyxrQkFBRSxJQUFGLEVBRUt1RixNQUZMLEdBSUtqRixRQUpMLENBSWMsU0FKZCxFQU1Lc0MsSUFOTCxDQU1VLHFCQU5WLEVBUUsyRCxTQVJMO0FBVUg7QUFFSixTQXBDRDs7QUFzQ0EsWUFBSUgsV0FBVzFDLFFBQVgsQ0FBb0IsZUFBcEIsQ0FBSixFQUEwQzs7QUFFdEMxRCxjQUFFLElBQUYsRUFFSzRDLElBRkwsQ0FFVSxrQkFGVixFQUlLNEQsTUFKTCxDQUlZLFFBSlosRUFNS2pHLFdBTkwsQ0FNaUIsU0FOakIsRUFRS3FDLElBUkwsQ0FRVSxxQkFSVixFQVVLMEQsT0FWTDs7QUFZQXRHLGNBQUUsSUFBRixFQUVLNEMsSUFGTCxDQUVVLG1CQUZWLEVBSUsxQyxFQUpMLENBSVEsT0FKUixFQUlpQixZQUFXOztBQUVwQixvQkFFSUYsRUFBRSxJQUFGLEVBRUt1RixNQUZMLEdBSUs3QixRQUpMLENBSWMsU0FKZCxDQUZKLEVBUUU7O0FBRUUxRCxzQkFBRSxJQUFGLEVBRUs0QyxJQUZMLENBRVUsbUJBRlYsRUFJS2IsSUFKTCxDQUlVLFdBSlY7QUFNSCxpQkFoQkQsTUFnQk87O0FBRUgvQixzQkFBRSxJQUFGLEVBRUs0QyxJQUZMLENBRVUsbUJBRlYsRUFJS2IsSUFKTCxDQUlVLFFBSlY7QUFNSDtBQUVKLGFBaENMO0FBa0NIO0FBRUo7O0FBSUQ7O0FBRUEvQixNQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsY0FBeEIsRUFBd0MsWUFBVzs7QUFFL0MsWUFFSUYsRUFBRSxJQUFGLEVBRUs0QyxJQUZMLENBRVUsT0FGVixFQUlLNkQsRUFKTCxDQUlRLFVBSlIsQ0FGSixFQVFFOztBQUVFekcsY0FBRSxJQUFGLEVBQVFNLFFBQVIsQ0FBaUIsWUFBakI7QUFFSCxTQVpELE1BWU87O0FBRUhOLGNBQUUsSUFBRixFQUFRTyxXQUFSLENBQW9CLFlBQXBCO0FBRUg7QUFFSixLQXBCRDs7QUF3QkE7O0FBRUFQLE1BQUVxQixRQUFGLEVBQVluQixFQUFaLENBQWUsT0FBZixFQUF3QixzQkFBeEIsRUFBZ0QsWUFBVzs7QUFFdkQsWUFBSUYsRUFBRSxJQUFGLEVBQVEwRCxRQUFSLENBQWlCLFlBQWpCLENBQUosRUFBb0M7O0FBRWhDMUQsY0FBRSxJQUFGLEVBQVFPLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSCxTQUpELE1BSU87O0FBRUhQLGNBQUUsSUFBRixFQUFRTSxRQUFSLENBQWlCLFlBQWpCO0FBRUg7QUFFSixLQVpEOztBQWdCQTs7QUFFQSxRQUFJTixFQUFFLGNBQUYsRUFBa0JTLE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDOztBQUU5QlQsVUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7O0FBRS9DLGdCQUFJRixFQUFFLElBQUYsRUFBUTBELFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQzs7QUFFL0IxRCxrQkFBRSxJQUFGLEVBQVFPLFdBQVIsQ0FBb0IsV0FBcEI7QUFFSCxhQUpELE1BSU87O0FBRUhQLGtCQUFFLGNBQUYsRUFBa0JPLFdBQWxCLENBQThCLFdBQTlCOztBQUVBUCxrQkFBRSxJQUFGLEVBQVFNLFFBQVIsQ0FBaUIsV0FBakI7QUFFSDtBQUVKLFNBZEQ7O0FBZ0JBTixVQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBU3FCLENBQVQsRUFBWTs7QUFFaEMsZ0JBQUl2QixFQUFFdUIsRUFBRTZDLE1BQUosRUFBWXpCLE9BQVosQ0FBb0IsY0FBcEIsRUFBb0NsQyxNQUF4QyxFQUFnRDs7QUFFaERULGNBQUUsY0FBRixFQUFrQk8sV0FBbEIsQ0FBOEIsV0FBOUI7O0FBRUFnQixjQUFFOEMsZUFBRjtBQUVILFNBUkQ7QUFVSDs7QUFJRDs7OztBQUlBOztBQUVBLFFBQUlyRSxFQUFFLGlCQUFGLEVBQXFCUyxNQUFyQixHQUE4QixDQUE5QixJQUFtQ1QsRUFBRUMsTUFBRixFQUFVMEQsS0FBVixLQUFvQixHQUEzRCxFQUFnRTs7QUFFNUQsWUFBSW1DLFVBQVUsSUFBSUMsYUFBSixDQUFrQixpQkFBbEIsRUFBcUM7O0FBRS9DQyx3QkFBWSxHQUZtQzs7QUFJL0NDLDJCQUFlLEVBSmdDOztBQU0vQ0MsK0JBQW1CLGdCQU40Qjs7QUFRL0NDLGtDQUFzQjs7QUFSeUIsU0FBckMsQ0FBZDtBQVlIO0FBR0osQ0F6b0JEOztBQTJvQkE7Ozs7QUFJQW5HLEVBQUVxQixRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVzs7QUFFekI7OztBQUlBOztBQUVBLFFBQUl0QixFQUFFLG9CQUFGLEVBQXdCUyxNQUF4QixHQUFpQyxDQUFyQyxFQUF3Qzs7QUFFcENULFVBQUUsb0JBQUYsRUFBd0IwRyxLQUF4QixDQUE4Qjs7QUFFMUJDLHVCQUFXLHlCQUZlOztBQUkxQkMsdUJBQVcseUJBSmU7O0FBTTFCQyxvQkFBUSxJQU5rQjs7QUFRMUJDLHNCQUFVLElBUmdCOztBQVUxQkMsMEJBQWMsQ0FWWTs7QUFZMUJDLDRCQUFnQixDQVpVOztBQWMxQkMsbUJBQU8sSUFkbUI7O0FBZ0IxQkMsMkJBQWUsSUFoQlc7O0FBa0IxQkMsc0JBQVUsSUFsQmdCOztBQW9CMUJDLGtCQUFNLEtBcEJvQjs7QUFzQjFCOztBQUVBQyx3QkFBWSxDQUVSOztBQUVJQyw0QkFBWSxJQUZoQjs7QUFJSUMsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQUpkLGFBRlEsRUFjUjs7QUFFSU8sNEJBQVksR0FGaEI7O0FBSUlDLDBCQUFVOztBQUVOUixrQ0FBYzs7QUFGUjs7QUFKZCxhQWRRLEVBMEJSOztBQUVJTyw0QkFBWSxHQUZoQjs7QUFJSUMsMEJBQVU7O0FBRU5SLGtDQUFjLENBRlI7O0FBSU5JLDhCQUFVLEtBSko7O0FBTU5LLG1DQUFlLEtBTlQ7O0FBUU5YLDRCQUFROztBQVJGOztBQUpkLGFBMUJRLEVBNENSOztBQUVJUyw0QkFBWSxHQUZoQjs7QUFJSUMsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQUpkLGFBNUNRLEVBd0RSOztBQUVJTyw0QkFBWSxHQUZoQjs7QUFJSUMsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQUpkLGFBeERROztBQXhCYyxTQUE5QjtBQWdHSDs7QUFJRDs7QUFFQSxRQUVJL0csRUFBRSxxQkFBRixFQUF5QlMsTUFBekIsR0FBa0MsQ0FBbEMsSUFFQVQsRUFBRSx5QkFBRixFQUE2QlMsTUFBN0IsR0FBc0MsQ0FKMUMsRUFNRTs7QUFFRWdIO0FBRUg7O0FBSUQsUUFFSXpILEVBQUUsMkJBQUYsRUFBK0JTLE1BQS9CLEdBQXdDLENBQXhDLElBRUFULEVBQUUsK0JBQUYsRUFBbUNTLE1BQW5DLEdBQTRDLENBSmhELEVBTUU7O0FBRUVpSDtBQUVIOztBQUlEOztBQUVBLFFBQUkxSCxFQUFFLHNCQUFGLEVBQTBCUyxNQUExQixHQUFtQyxDQUF2QyxFQUEwQzs7QUFFdENULFVBQUUsc0JBQUYsRUFBMEIwRyxLQUExQixDQUFnQzs7QUFFNUJDLHVCQUFXLCtCQUZpQjs7QUFJNUJDLHVCQUFXLCtCQUppQjs7QUFNNUJDLG9CQUFRLElBTm9COztBQVE1QkMsc0JBQVUsSUFSa0I7O0FBVTVCQywwQkFBYyxDQVZjOztBQVk1QkMsNEJBQWdCLENBWlk7O0FBYzVCQyxtQkFBTyxHQWRxQjs7QUFnQjVCQywyQkFBZSxJQWhCYTs7QUFrQjVCQyxzQkFBVSxJQWxCa0I7O0FBb0I1QkMsa0JBQU07O0FBcEJzQixTQUFoQztBQXdCSDs7QUFJRDs7QUFFQSxRQUFJcEgsRUFBRSx3QkFBRixFQUE0QlMsTUFBNUIsR0FBcUMsQ0FBekMsRUFBNEM7O0FBRXhDa0g7QUFFSDs7QUFFRCxRQUFJM0gsRUFBRSw4QkFBRixFQUFrQ1MsTUFBbEMsR0FBMkMsQ0FBL0MsRUFBa0Q7O0FBRTlDbUg7QUFFSDtBQUVKLENBMUxEOztBQThMQTs7QUFFQSxTQUFTSCxVQUFULEdBQXNCOztBQUVsQnpILE1BQUUscUJBQUYsRUFBeUIwRyxLQUF6QixDQUErQjs7QUFFM0JLLHNCQUFjLENBRmE7O0FBSTNCQyx3QkFBZ0IsQ0FKVzs7QUFNM0JILGdCQUFRLEtBTm1COztBQVEzQmdCLGNBQU0sSUFScUI7O0FBVTNCQyxrQkFBVSx5QkFWaUI7O0FBWTNCVCxvQkFBWSxDQUVSOztBQUVJQyx3QkFBWSxHQUZoQjs7QUFJSUMsc0JBQVU7O0FBRU5ILHNCQUFNLElBRkE7O0FBSU5TLHNCQUFNOztBQUpBOztBQUpkLFNBRlE7O0FBWmUsS0FBL0I7O0FBZ0NBN0gsTUFBRSx5QkFBRixFQUE2QjBHLEtBQTdCLENBQW1DOztBQUUvQkssc0JBQWMsQ0FGaUI7O0FBSS9CQyx3QkFBZ0IsQ0FKZTs7QUFNL0JjLGtCQUFVLHFCQU5xQjs7QUFRL0JWLGNBQU0sSUFSeUI7O0FBVS9COztBQUVBVyx1QkFBZSxJQVpnQjs7QUFjL0JWLG9CQUFZLENBRVI7O0FBRUlDLHdCQUFZLElBRmhCOztBQUlJQyxzQkFBVTs7QUFFTlMsNEJBQVk7O0FBRk47O0FBSmQsU0FGUSxFQWNSOztBQUVJVix3QkFBWSxHQUZoQjs7QUFJSUMsc0JBQVU7O0FBSmQsU0FkUTs7QUFkbUIsS0FBbkM7QUF3Q0g7O0FBSUQsU0FBU0csV0FBVCxHQUF1Qjs7QUFFbkIxSCxNQUFFLDJCQUFGLEVBQStCMEcsS0FBL0IsQ0FBcUM7O0FBRWpDSyxzQkFBYyxDQUZtQjs7QUFJakNDLHdCQUFnQixDQUppQjs7QUFNakNILGdCQUFRLEtBTnlCOztBQVFqQ2dCLGNBQU0sSUFSMkI7O0FBVWpDQyxrQkFBVSwrQkFWdUI7O0FBWWpDVCxvQkFBWSxDQUVSOztBQUVJQyx3QkFBWSxHQUZoQjs7QUFJSUMsc0JBQVU7O0FBRU5ILHNCQUFNLElBRkE7O0FBSU5TLHNCQUFNOztBQUpBOztBQUpkLFNBRlE7O0FBWnFCLEtBQXJDOztBQWdDQTdILE1BQUUsK0JBQUYsRUFBbUMwRyxLQUFuQyxDQUF5Qzs7QUFFckNLLHNCQUFjLENBRnVCOztBQUlyQ0Msd0JBQWdCLENBSnFCOztBQU1yQ2Msa0JBQVUsMkJBTjJCOztBQVFyQ1YsY0FBTSxJQVIrQjs7QUFVckM7O0FBRUFXLHVCQUFlLElBWnNCOztBQWNyQ1Ysb0JBQVksQ0FFUjs7QUFFSUMsd0JBQVksSUFGaEI7O0FBSUlDLHNCQUFVOztBQUVOUyw0QkFBWTs7QUFGTjs7QUFKZCxTQUZRLEVBY1I7O0FBRUlWLHdCQUFZLEdBRmhCOztBQUlJQyxzQkFBVTs7QUFKZCxTQWRROztBQWR5QixLQUF6QztBQXdDSDs7QUFJRDs7QUFFQSxTQUFTSSxhQUFULEdBQXlCOztBQUVyQjNILE1BQUUsd0JBQUYsRUFBNEIwRyxLQUE1QixDQUFrQzs7QUFFOUJHLGdCQUFRLElBRnNCOztBQUk5QkMsa0JBQVUsSUFKb0I7O0FBTTlCQyxzQkFBYyxDQU5nQjs7QUFROUJDLHdCQUFnQixDQVJjOztBQVU5QkMsZUFBTyxHQVZ1Qjs7QUFZOUJDLHVCQUFlLElBWmU7O0FBYzlCQyxrQkFBVSxJQWRvQjs7QUFnQjlCQyxjQUFNLEtBaEJ3Qjs7QUFrQjlCQyxvQkFBWSxDQUVSOztBQUVJQyx3QkFBWSxJQUZoQjs7QUFJSUMsc0JBQVU7O0FBRU5SLDhCQUFjOztBQUZSOztBQUpkLFNBRlEsRUFjUjs7QUFFSU8sd0JBQVksR0FGaEI7O0FBSUlDLHNCQUFVOztBQUVOUiw4QkFBYzs7QUFGUjs7QUFKZCxTQWRRLEVBMEJSOztBQUVJTyx3QkFBWSxHQUZoQjs7QUFJSUMsc0JBQVU7O0FBRU5SLDhCQUFjOztBQUZSOztBQUpkLFNBMUJRLEVBc0NSOztBQUVJTyx3QkFBWSxHQUZoQjs7QUFJSUMsc0JBQVU7O0FBRU5SLDhCQUFjOztBQUZSOztBQUpkLFNBdENROztBQWxCa0IsS0FBbEM7QUF3RUg7O0FBSUQsU0FBU2Esa0JBQVQsR0FBOEI7O0FBRTFCNUgsTUFBRSw4QkFBRixFQUFrQzBHLEtBQWxDLENBQXdDOztBQUVwQ0csZ0JBQVEsSUFGNEI7O0FBSXBDQyxrQkFBVSxJQUowQjs7QUFNcENDLHNCQUFjLENBTnNCOztBQVFwQ0Msd0JBQWdCLENBUm9COztBQVVwQ0MsZUFBTyxHQVY2Qjs7QUFZcENDLHVCQUFlLElBWnFCOztBQWNwQ0Msa0JBQVUsSUFkMEI7O0FBZ0JwQ0MsY0FBTSxLQWhCOEI7O0FBa0JwQ0Msb0JBQVksQ0FFUjs7QUFFSUMsd0JBQVksSUFGaEI7O0FBSUlDLHNCQUFVOztBQUVOUiw4QkFBYzs7QUFGUjs7QUFKZCxTQUZRLEVBY1I7O0FBRUlPLHdCQUFZLEdBRmhCOztBQUlJQyxzQkFBVTs7QUFFTlIsOEJBQWM7O0FBRlI7O0FBSmQsU0FkUSxFQTBCUjs7QUFFSU8sd0JBQVksR0FGaEI7O0FBSUlDLHNCQUFVOztBQUVOUiw4QkFBYzs7QUFGUjs7QUFKZCxTQTFCUSxFQXNDUjs7QUFFSU8sd0JBQVksR0FGaEI7O0FBSUlDLHNCQUFVOztBQUVOUiw4QkFBYzs7QUFGUjs7QUFKZCxTQXRDUTs7QUFsQndCLEtBQXhDO0FBd0VIOztBQUlEOzs7O0FBSUEvRyxFQUFFcUIsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7O0FBRTFCOztBQUVBdEIsTUFBRSxtREFBRixFQUF1RGlJLElBQXZEOztBQUlBakksTUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGlCQUF4QixFQUEyQyxZQUFZOztBQUVuREYsVUFBRSxJQUFGLEVBRUsyQyxPQUZMLENBRWEsNkJBRmIsRUFJS0MsSUFKTCxDQUlVLDhCQUpWLEVBTUs4RCxLQU5MLENBTVcsYUFOWDs7QUFRQTFHLFVBQUUsSUFBRixFQUVLMkMsT0FGTCxDQUVhLHNCQUZiLEVBSUtDLElBSkwsQ0FJVSx3QkFKVixFQU1LOEQsS0FOTCxDQU1XLGFBTlg7QUFRSCxLQWxCRDs7QUFzQkEsUUFBSTFHLEVBQUVDLE1BQUYsRUFBVTBELEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7O0FBRXpCM0QsVUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFNBQXhCLEVBQW1DK0gsSUFBbkM7O0FBRUFqSSxVQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsZUFBeEIsRUFBeUMrSCxJQUF6QztBQUVIOztBQUlEakksTUFBRSxVQUFGLEVBQWNFLEVBQWQsQ0FBaUIsZ0JBQWpCLEVBQW1DLFVBQVVxQixDQUFWLEVBQWE7O0FBRTVDdkIsVUFBRSwyQkFBRixFQUErQm9CLE1BQS9COztBQUVBcEIsVUFBRSw4QkFBRixFQUFrQ29CLE1BQWxDOztBQUlBLFlBQUlwQixFQUFFQyxNQUFGLEVBQVUwRCxLQUFWLE1BQXFCLEdBQXpCLEVBQThCOztBQUUxQnVFO0FBRUg7QUFFSixLQWREOztBQWtCQTs7QUFFQSxhQUFTQSxZQUFULEdBQXdCOztBQUVwQixZQUFJQyxNQUFNbkksRUFBRSxvQkFBRixDQUFWOztBQUlBQSxVQUFFLHdCQUFGLEVBRUtvSSxNQUZMLEdBSUs5SCxRQUpMLENBSWMseUNBSmQsRUFNS0MsV0FOTCxDQU1pQixhQU5qQjs7QUFRQTRILFlBQUl2RixJQUFKLENBQVMsYUFBVCxFQUVLdEMsUUFGTCxDQUVjLGtCQUZkLEVBSUtDLFdBSkwsQ0FJaUIsc0JBSmpCLEVBTUs4SCxJQU5MLENBTVUsK0JBTlY7O0FBVUFGLFlBQUl2RixJQUFKLENBQVMsd0JBQVQsRUFFS2dCLFVBRkwsQ0FFZ0IsT0FGaEIsRUFJS2lCLFdBSkwsQ0FJaUIsZ0JBSmpCLEVBTUtVLE1BTkwsR0FRS2pGLFFBUkwsQ0FRYyxTQVJkOztBQVVBNkgsWUFBSXZGLElBQUosQ0FBUyx3QkFBVCxFQUVLRSxHQUZMLENBRVMsU0FGVCxFQUVvQixNQUZwQixFQUlLK0IsV0FKTCxDQUlpQixnQkFKakI7O0FBUUFzRCxZQUFJdkYsSUFBSixDQUFTLGVBQVQsRUFFS3RDLFFBRkwsQ0FFYyxvQkFGZCxFQUlLQyxXQUpMLENBSWlCLG9DQUpqQjs7QUFNQTRILFlBQUl2RixJQUFKLENBQVMsaUJBQVQsRUFBNEJrQyxNQUE1QjtBQUVIOztBQUlELFFBQUk5RSxFQUFFQyxNQUFGLEVBQVUwRCxLQUFWLE1BQXFCLEdBQXpCLEVBQThCOztBQUUxQnVFO0FBRUg7O0FBSUQ7O0FBRUFJOztBQUlBdEksTUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGlCQUF4QixFQUEyQyxZQUFZOztBQUVuRCxZQUFJRixFQUFFLElBQUYsRUFBUTBELFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQzs7QUFFL0IxRCxjQUFFLGlCQUFGLEVBQXFCTyxXQUFyQixDQUFpQyxXQUFqQzs7QUFFQVAsY0FBRSxJQUFGLEVBQVFPLFdBQVIsQ0FBb0IsV0FBcEI7QUFFSCxTQU5ELE1BTU87O0FBRUhQLGNBQUUsaUJBQUYsRUFBcUJPLFdBQXJCLENBQWlDLFdBQWpDOztBQUVBUCxjQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixXQUFqQjtBQUVIO0FBRUosS0FoQkQ7O0FBb0JBTixNQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVXFCLENBQVYsRUFBYTs7QUFFakMsWUFBSXZCLEVBQUV1QixFQUFFNkMsTUFBSixFQUFZekIsT0FBWixDQUFvQixpQkFBcEIsRUFBdUNsQyxNQUEzQyxFQUFtRDs7QUFFbkRULFVBQUUsaUJBQUYsRUFBcUJPLFdBQXJCLENBQWlDLFdBQWpDOztBQUVBZ0IsVUFBRThDLGVBQUY7QUFFSCxLQVJEOztBQVlBckUsTUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFZOztBQUV4RCxZQUFJcUksU0FBU3ZJLEVBQUUsSUFBRixFQUFRMkMsT0FBUixDQUFnQixpQkFBaEIsQ0FBYjs7QUFFQSxZQUFJWixPQUFPL0IsRUFBRSxJQUFGLEVBRU40QyxJQUZNLENBRUQscUJBRkMsRUFJTmIsSUFKTSxFQUFYOztBQU1BLFlBQUkyRCxRQUFRMUYsRUFBRSxJQUFGLEVBRVA0QyxJQUZPLENBRUYscUJBRkUsRUFJUFYsSUFKTyxDQUlGLG1CQUpFLENBQVo7O0FBTUEsWUFBSXNHLFFBQVFELE9BQU8zRixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQSxZQUFJNkYsUUFBUUYsT0FBTzNGLElBQVAsQ0FBWSxxQkFBWixDQUFaOztBQUlBNkYsY0FBTXhELEdBQU4sQ0FBVWxELElBQVY7O0FBRUF5RyxjQUFNRSxRQUFOLENBQWUscUJBQWYsRUFBc0N4RyxJQUF0QyxDQUEyQyxtQkFBM0MsRUFBZ0V3RCxLQUFoRTs7QUFJQTRDOztBQUlBLFlBQUlDLE9BQU83RSxRQUFQLENBQWdCLG9CQUFoQixDQUFKLEVBQTJDOztBQUV2QyxnQkFBSTFELEVBQUUsSUFBRixFQUFRMEQsUUFBUixDQUFpQiwyQkFBakIsQ0FBSixFQUFtRDs7QUFFL0M4RSxzQkFFS0UsUUFGTCxDQUVjLHFCQUZkLEVBSUs5RSxVQUpMLENBSWdCLE9BSmhCLEVBTUs3QixJQU5MLENBTVUsU0FOVjs7QUFRQTBHLHNCQUFNM0YsR0FBTixDQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFFSCxhQVpELE1BWU87O0FBRUgyRixzQkFBTTdFLFVBQU4sQ0FBaUIsT0FBakI7O0FBRUE0RSxzQkFBTUUsUUFBTixDQUFlLHFCQUFmLEVBQXNDNUYsR0FBdEMsQ0FBMEMsU0FBMUMsRUFBcUQsTUFBckQ7QUFFSDtBQUVKO0FBRUosS0F4REQ7O0FBNERBOztBQUVBOUMsTUFBRSxlQUFGLEVBQW1CRSxFQUFuQixDQUFzQixPQUF0QixFQUErQixVQUFVcUIsQ0FBVixFQUFhOztBQUV4QyxZQUFJb0gsWUFBWTNJLEVBQUUsSUFBRixFQUFRNEksUUFBUixFQUFoQjtBQUFBLFlBRUlDLE1BQU1GLFVBQVV6RyxJQUFWLENBQWUsVUFBZixDQUZWOztBQUlBWCxVQUFFQyxjQUFGOztBQUlBLFlBQUksQ0FBQ3hCLEVBQUUsSUFBRixFQUFRMEQsUUFBUixDQUFpQixVQUFqQixDQUFMLEVBQW1DOztBQUUvQm1GLGdCQUFJQyxLQUFKOztBQUVBRCxnQkFBSXhELElBQUo7QUFFSCxTQU5ELE1BTU87O0FBRUh3RCxnQkFBSUUsUUFBSjtBQUVIO0FBRUosS0F0QkQ7QUF3QkgsQ0F0UEQ7O0FBMFBBOztBQUVBLFNBQVNULFdBQVQsR0FBdUI7O0FBRW5CdEksTUFBRSxpQkFBRixFQUVLNEYsSUFGTCxDQUVVLFlBQVk7O0FBRWQsWUFBSUMsV0FBVzdGLEVBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLHFCQUFiLENBQWY7O0FBRUEsWUFBSThDLFFBQVFHLFNBQVMzRCxJQUFULENBQWMsbUJBQWQsQ0FBWjs7QUFFQTJELGlCQUFTL0MsR0FBVCxDQUFhLGtCQUFiLEVBQWlDNEMsS0FBakM7QUFFSCxLQVZMLEVBWUs5QyxJQVpMLENBWVUsb0JBWlYsRUFjS2dELElBZEwsQ0FjVSxZQUFZOztBQUVkLFlBQUlDLFdBQVc3RixFQUFFLElBQUYsRUFBUTRDLElBQVIsQ0FBYSxxQkFBYixDQUFmOztBQUVBLFlBQUk4QyxRQUFRRyxTQUFTM0QsSUFBVCxDQUFjLG1CQUFkLENBQVo7O0FBRUEyRCxpQkFBUy9DLEdBQVQsQ0FBYSxrQkFBYixFQUFpQzRDLEtBQWpDO0FBRUgsS0F0Qkw7QUF3Qkg7O0FBSUQ7O0FBRUEsU0FBU3VDLElBQVQsQ0FBYzFHLENBQWQsRUFBaUI7O0FBRWIsUUFBSTZDLFNBQVM3QyxFQUFFNkMsTUFBZjs7QUFFQSxRQUFJQSxPQUFPNEUsU0FBUCxJQUFvQixZQUF4QixFQUFzQzs7QUFFbEMsWUFBSUMsVUFBVTdFLE9BQU84RSxZQUFQLENBQW9CLFVBQXBCLENBQWQ7O0FBRUEsWUFBSUMsYUFBYW5KLEVBQUUsSUFBRixFQUVadUYsTUFGWSxHQUlaM0MsSUFKWSxDQUlQLGVBSk8sQ0FBakI7O0FBTUEsWUFBSXdHLFdBQVdwSixFQUFFLElBQUYsRUFFVnVGLE1BRlUsR0FJVjNDLElBSlUsQ0FJTCxhQUpLLENBQWY7O0FBTUEsYUFBSyxJQUFJeUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxTQUFTM0ksTUFBN0IsRUFBcUM0SSxHQUFyQyxFQUEwQzs7QUFFdENELHFCQUFTQyxDQUFULEVBQVlDLFNBQVosQ0FBc0J4RSxNQUF0QixDQUE2QixXQUE3QjtBQUVIOztBQUVEVixlQUFPa0YsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsV0FBckI7O0FBRUEsYUFBSyxJQUFJRixJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFdBQVcxSSxNQUEvQixFQUF1QzRJLEdBQXZDLEVBQTRDOztBQUV4QyxnQkFBSUosV0FBV0ksQ0FBZixFQUFrQjs7QUFFZEYsMkJBQVdFLENBQVgsRUFBY25GLEtBQWQsQ0FBb0JzRixPQUFwQixHQUE4QixPQUE5QjtBQUVILGFBSkQsTUFJTzs7QUFFSEwsMkJBQVdFLENBQVgsRUFBY25GLEtBQWQsQ0FBb0JzRixPQUFwQixHQUE4QixNQUE5QjtBQUVIO0FBRUo7QUFFSjtBQUVKOztBQUlEOzs7O0FBSUE7O0FBRUEsU0FBU0MsTUFBVCxDQUFnQjFILElBQWhCLEVBQXNCOztBQUVsQixRQUFJQSxPQUFPQSxRQUFRLDBCQUFuQjs7QUFFQSxRQUFJMkgsZ0JBQWdCMUosRUFBRSxPQUFGLEVBQVdNLFFBQVgsQ0FBb0IsUUFBcEIsQ0FBcEI7O0FBRUEsUUFBSXFKLGNBQWMzSixFQUFFLDhCQUFGLEVBQWtDTSxRQUFsQyxDQUVkLGdDQUZjLENBQWxCOztBQU1Bb0osa0JBQWNFLFFBQWQsQ0FBdUI1SixFQUFFLE1BQUYsQ0FBdkI7O0FBRUEwSixrQkFBYzNILElBQWQsQ0FBbUJBLElBQW5COztBQUVBNEgsZ0JBQVlDLFFBQVosQ0FBcUJGLGFBQXJCOztBQUlBRyxRQUFJLFlBQVc7O0FBRVhILHNCQUFjcEosUUFBZCxDQUF1QixXQUF2QjtBQUVILEtBSkQ7O0FBUUF3SixlQUFXLFlBQVc7O0FBRWxCSixzQkFBY25KLFdBQWQsQ0FBMEIsV0FBMUI7QUFFSCxLQUpELEVBSUcsSUFKSDs7QUFRQXVKLGVBQVcsWUFBVzs7QUFFbEJKLHNCQUFjNUUsTUFBZDtBQUVILEtBSkQsRUFJRyxJQUpIOztBQVFBOUUsTUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG1CQUF4QixFQUE2QyxZQUFXOztBQUVwRHdKLHNCQUFjbkosV0FBZCxDQUEwQixXQUExQjs7QUFFQXVKLG1CQUFXLFlBQVc7O0FBRWxCSiwwQkFBYzVFLE1BQWQ7QUFFSCxTQUpELEVBSUcsR0FKSDtBQU1ILEtBVkQ7QUFZSDs7QUFJRDs7QUFFQSxTQUFTK0UsR0FBVCxDQUFhRSxFQUFiLEVBQWlCOztBQUViOUosV0FBTytKLHFCQUFQLENBQTZCLFlBQVc7O0FBRXBDL0osZUFBTytKLHFCQUFQLENBQTZCLFlBQVc7O0FBRXBDRDtBQUVILFNBSkQ7QUFNSCxLQVJEO0FBVUgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChcclxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXHJcbiAgICApIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lvcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xyXG4gICAgfVxyXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcblxyXG4gICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxyXG4gICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcclxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG4gICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXHJcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgLy9Cb290c3N0cmFwIGxpZ2h0Ym94IGdhbGxhcnlcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS10b2dnbGU9XCJsaWdodGJveFwiXScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQodGhpcykuZWtrb0xpZ2h0Ym94KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWMsXHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlIHNlbGVjdCcpO1xyXG4gICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJzb3J0aW5nLWljb24gc29ydGluZy1pY29uLS0nICtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcbiAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwIHx8ICQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcclxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgIG1hc2s6ICc5OS05OS05OTk5JyxcclxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9DaGFuZ2UgZm9ybSB0aXRsZVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1mb3JtLXRpdGxlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcbiAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuICAgICAgICAgICAgLnRleHQodGV4dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xyXG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcclxuICAgIH1cclxuICAgIG1haW5PZmZzZXQoKTtcclxuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICB9LCA4MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TdG9wIGRyYWdcclxuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xyXG4gICAgICAgIGZvb3RlclxyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0hhbWJ1cmdlciBidG5cclxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcclxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xyXG4gICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgLy9Nb2JpbGUgTmF2XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcclxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrXHJcbiAgICAgICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSlcclxuICAgICAgICAgICAgICAgICAgICAudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICEoXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmxlbmd0aFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKVxyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcclxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKVxyXG4gICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYnRuIGZhdm9yaXRlXHJcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIENhdGFsb2cuanNcclxuICAgICAqL1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY29sb3ItaXRlbScsIGZ1bmN0aW9uKGUpIHtcblxyXG4gICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XG5cclxuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XG5cclxuICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xuXHJcbiAgICBcblxyXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cclxuICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgLy9DaGFuZ2VyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJylcblxyXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG5cclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNoYW5nZXInKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJylcblxyXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9fcmVzZXQnKVxuXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxyXG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcblxyXG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG5cclxuICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJylcblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xuXHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xuXHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XG5cclxuICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxuXHJcbiAgICAgICAgICAgIC5yZXNpemUoKTtcblxyXG4gICAgfVxuXHJcbiAgICBcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cclxuICAgIH0pO1xuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcblxyXG4gICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcblxyXG4gICAgaWYgKCQoJy5qcy1zdGlreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcblxyXG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreScsIHtcblxyXG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4NSxcblxyXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAyMCxcblxyXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcblxyXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1pbm5lcidcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDb21wb25lbnRzLmpzXHJcbiAgICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxuXHJcbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcblxyXG4gICAgICAgIGxldCBhY2NvcmRlcm9uID0gJCgnLmpzLWFjY29yZGVvbicpO1xuXHJcbiAgICBcblxyXG4gICAgICAgIGFjY29yZGVyb25cblxyXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG5cclxuICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcblxyXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcblxyXG4gICAgICAgIGFjY29yZGVyb25cblxyXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbTpmaXJzdCcpXG5cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuXHJcbiAgICBcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIGlmIChcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG5cclxuICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICkge1xuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgICAgIGlmIChhY2NvcmRlcm9uLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcblxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOmZpcnN0JylcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuXHJcbiAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJylcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQv9C+0LTRgNC+0LHQvdC10LUnKTtcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG5cclxuICAgICAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgICAgIH0pO1xuXHJcbiAgICAgICAgfVxuXHJcbiAgICB9XG5cclxuICAgIFxuXHJcbiAgICAvL2NoZWNrYm94XG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIGlmIChcblxyXG4gICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG5cclxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxuXHJcbiAgICAgICAgKSB7XG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICB9XG5cclxuICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgLy9jaGVja2JveC0tcHNldWRvXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgfVxuXHJcbiAgICB9KTtcblxyXG4gICAgXG5cclxuICAgIC8vZHJvcGRvd25cblxyXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG5cclxuICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgfVxuXHJcbiAgICBcclxuXHJcbiAgICAvKlxyXG4gICAgICpMay5qc1xyXG4gICAgICovXHJcblxyXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG5cclxuICAgIGlmICgkKCcuanMtc3Rpa3ktYmxvY2snKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG5cclxuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG5cclxuICAgICAgICAgICAgdG9wU3BhY2luZzogMTM1LFxuXHJcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuXHJcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWJsb2NrX19pbm5lcidcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuICAgIFxyXG59KTtcclxuXHJcbi8qXHJcbiAqIFNsaWRlci5qc1xyXG4gKi9cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHJcbiAgICAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuXHJcblxuXHJcbiAgICAvL1NsaWRlciBOZXdcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcblxyXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XG5cclxuICAgICAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG5cclxuICAgICAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG5cclxuICAgICAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG5cclxuICAgICAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICBdXG5cclxuICAgICAgICB9KTtcblxyXG4gICAgfVxuXHJcblxuXHJcbiAgICAvL1NsaWRlciBDYXJkXG5cclxuICAgIGlmIChcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcblxyXG4gICAgKSB7XG5cclxuICAgICAgICBjYXJkU2xpZGVyKCk7XG5cclxuICAgIH1cblxyXG5cblxyXG4gICAgaWYgKFxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLmxlbmd0aCA+IDAgJiZcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJykubGVuZ3RoID4gMFxuXHJcbiAgICApIHtcblxyXG4gICAgICAgIG1vZGFsU2xpZGVyKCk7XG5cclxuICAgIH1cblxyXG5cblxyXG4gICAgLy9TbGlkZXIgUHJvbW9cblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcblxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXG5cclxuICAgICAgICB9KTtcblxyXG4gICAgfVxuXHJcblxuXHJcbiAgICAvL1NsaWRlciBSZWxhdGVkXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgc2xpZGVyUmVsYXRlZCgpO1xuXHJcbiAgICB9XG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgc2xpZGVyUmVsYXRlZE1vZGFsKCk7XG5cclxuICAgIH1cblxyXG59KTtcblxyXG5cblxyXG4vL0NhcmRTbGlkZXJGdW5jdGlvblxuXHJcbmZ1bmN0aW9uIGNhcmRTbGlkZXIoKSB7XG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIGFycm93czogZmFsc2UsXG5cclxuICAgICAgICBmYWRlOiB0cnVlLFxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2Jykuc2xpY2soe1xuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQnLFxuXHJcbiAgICAgICAgZG90czogdHJ1ZSxcblxyXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG5cclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG59XG5cclxuXG5cclxuZnVuY3Rpb24gbW9kYWxTbGlkZXIoKSB7XG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5zbGljayh7XG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIGFycm93czogZmFsc2UsXG5cclxuICAgICAgICBmYWRlOiB0cnVlLFxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJykuc2xpY2soe1xuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnLFxuXHJcbiAgICAgICAgZG90czogdHJ1ZSxcblxyXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG5cclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG59XG5cclxuXG5cclxuLy9zbGlkZXJSZWxhdGVkXG5cclxuZnVuY3Rpb24gc2xpZGVyUmVsYXRlZCgpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcblxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcblxyXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBzcGVlZDogNTAwLFxuXHJcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgZG90czogZmFsc2UsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkTW9kYWwoKSB7XG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5zbGljayh7XG5cclxuICAgICAgICBhcnJvd3M6IHRydWUsXG5cclxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogOCxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgc3BlZWQ6IDUwMCxcblxyXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cclxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcblxyXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG59XG5cclxuXHJcblxyXG4vKlxyXG4gKiBDYXJkLmpzXHJcbiAqL1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vY2FyZCBwcm9wZXJ0aWVzIHRhYnNcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCwgLmpzLWNhcmQtdGFiLXJlbGF0ZWQtLW1vZGFsJykudGFicygpO1xyXG5cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1yZWxhdGVkLXRhYicsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpXHJcblxyXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXHJcblxyXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWInLCB0YWJzKTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWItbW9kYWwnLCB0YWJzKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5yZXNpemUoKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnJlc2l6ZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICAgICAgICAgIHRhYlRyYW5zZm9ybSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cclxuXHJcbiAgICBmdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKSB7XHJcblxyXG4gICAgICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKCcuanMtdGFiLCAuanMtdGFiLW1vZGFsJylcclxuXHJcbiAgICAgICAgICAgIC51bndyYXAoKVxyXG5cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJylcclxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblxyXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKVxyXG5cclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpXHJcblxyXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxyXG5cclxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vQ2FyZCBJdGVtIFNlbGVjdFxyXG5cclxuICAgIGNoYW5nZUNvbG9yKCk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWl0ZW0tc2VsZWN0JywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdC1pdGVtJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAudGV4dCgpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXHJcblxyXG4gICAgICAgICAgICAuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpbnB1dC52YWwodGV4dCk7XHJcblxyXG4gICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvLyBJbml0aWFsaXplL0Rlc3Ryb3kgRWFzeVpvb21cclxuXHJcbiAgICAkKCcuanMtZWFzeS16b29tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgdmFyICRlYXN5em9vbSA9ICQodGhpcykuZWFzeVpvb20oKSxcclxuXHJcbiAgICAgICAgICAgIGFwaSA9ICRlYXN5em9vbS5kYXRhKCdlYXN5Wm9vbScpO1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1yZWFkeScpKSB7XHJcblxyXG4gICAgICAgICAgICBhcGkuX2luaXQoKTtcclxuXHJcbiAgICAgICAgICAgIGFwaS5zaG93KCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBhcGkudGVhcmRvd24oKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG4vL1NlbGVjdCBJdGVtIGNoYW5nZUNvbG9yXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcclxuXHJcbiAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxyXG5cclxuICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4vL1RhYnNcclxuXHJcbmZ1bmN0aW9uIHRhYnMoZSkge1xyXG5cclxuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcclxuXHJcbiAgICAgICAgdmFyIGRhdGFUYWIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cclxuICAgICAgICB2YXIgdGFiQ29udGVudCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX2NvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgdmFyIHRhYlRpdGxlID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLnRhYl9fdGl0bGUnKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8qXHJcbiAqIEZ1bmN0aW9ucy5qc1xyXG4gKi9cclxuXHJcbi8vUHVzaFVwXG5cclxuZnVuY3Rpb24gcHVzaFVwKHRleHQpIHtcblxyXG4gICAgdmFyIHRleHQgPSB0ZXh0IHx8ICfQotC+0LLQsNGAINC00L7QsdCw0LLQu9C10L0g0LIg0LrQvtGA0LfQuNC90YMnO1xuXHJcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3B1c2hVcCcpO1xuXHJcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcblxyXG4gICAgICAgICdwdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXG5cclxuICAgICk7XG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcblxyXG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xuXHJcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxyXG5cblxyXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgIH0pO1xuXHJcblxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgIH0sIDM1MDApO1xuXHJcblxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcblxyXG4gICAgfSwgNDAwMCk7XG5cclxuXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG5cclxuICAgICAgICB9LCAzMDApO1xuXHJcbiAgICB9KTtcblxyXG59XG5cclxuXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblxyXG5mdW5jdGlvbiByYWYoZm4pIHtcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgZm4oKTtcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9KTtcblxyXG59XG5cclxuXHJcbiJdfQ==
