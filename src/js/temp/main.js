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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkb2N1bWVudCIsInJlYWR5Iiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsImNsb3Nlc3QiLCJmaW5kIiwibWFpbk9mZnNldCIsImNzcyIsIm91dGVySGVpZ2h0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwic2Nyb2xsIiwiaGVpZ2h0IiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiYWNjb3JkZXJvbiIsIm5vdCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJmaWx0ZXIiLCJpcyIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiY2FyZFNsaWRlciIsIm1vZGFsU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsInNsaWRlclJlbGF0ZWRNb2RhbCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwidGFicyIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFmIiwic2V0VGltZW91dCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUIsUUFDSSw2Q0FBNkNDLElBQTdDLENBQWtEQyxVQUFVQyxTQUE1RCxDQURKLEVBRUU7QUFDRUwsVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSCxLQUpELE1BSU87QUFDSE4sVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSDtBQUNETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0QjtBQUNILENBVEQ7O0FBV0FQLEVBQUVRLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCVCxNQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUI7QUFDQSxZQUFJUSxZQUFZVixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxZQUFJVSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxzQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMsNkJBQWEsU0FESTtBQUVqQkMsa0NBQWtCLEtBRkQ7QUFHakI7QUFDQUMseUJBQVMsS0FKUTtBQUtqQkMsdUJBQU8sR0FMVTtBQU1qQkMsNkJBQWEsS0FOSTtBQU9qQkMsOEJBQWMsTUFQRztBQVFqQkMsb0NBQW9CO0FBUkgsYUFBckI7QUFVQVQsc0JBQVVVLFNBQVYsQ0FBb0IsWUFBVztBQUMzQnBCLGtCQUFFLElBQUYsRUFDS3FCLGFBREwsR0FFS0MsTUFGTDtBQUdILGFBSkQ7QUFLSDtBQUNKLEtBcEJEOztBQXNCQTtBQUNBLFFBQUl0QixFQUFFLFlBQUYsRUFBZ0JXLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQUEsWUFjbkJZLFVBZG1CLEdBYzVCLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3JCQyxvQkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSxnQkFBSSxDQUFDRixJQUFJRyxFQUFULEVBQWE7QUFDVCx1QkFBT0gsSUFBSUksSUFBWDtBQUNIO0FBQ0QsZ0JBQUlDLFdBQVc3QixFQUFFd0IsSUFBSU0sT0FBTixFQUFlQyxJQUFmLENBQW9CLE9BQXBCLENBQWY7QUFDQSxnQkFBSSxDQUFDRixRQUFMLEVBQWU7QUFDWCx1QkFBT0wsSUFBSUksSUFBWDtBQUNILGFBRkQsTUFFTztBQUNILG9CQUFJSSxPQUFPaEMsRUFDUCw2Q0FDSTZCLFFBREosR0FFSSxJQUZKLEdBR0k3QixFQUFFd0IsSUFBSU0sT0FBTixFQUFlRixJQUFmLEVBSEosR0FJSSxTQUxHLENBQVg7QUFPQSx1QkFBT0ksSUFBUDtBQUNIO0FBQ0osU0FoQzJCOztBQUM1QmhDLFVBQUUsWUFBRixFQUFnQmlDLE9BQWhCLENBQXdCO0FBQ3BCQyx5QkFBYWxDLEVBQUUsSUFBRixFQUFRK0IsSUFBUixDQUFhLGFBQWI7QUFETyxTQUF4Qjs7QUFJQS9CLFVBQUUsNkJBQUYsRUFBaUNpQyxPQUFqQyxDQUF5QztBQUNyQ0UsNEJBQWdCWixVQURxQjtBQUVyQ2EscUNBQXlCLENBQUM7QUFGVyxTQUF6Qzs7QUFLQXBDLFVBQUUsc0JBQUYsRUFBMEJpQyxPQUExQixDQUFrQztBQUM5QkcscUNBQXlCLENBQUM7QUFESSxTQUFsQztBQXVCSDs7QUFFRDtBQUNBLFFBQUlwQyxFQUFFLGdCQUFGLEVBQW9CVyxNQUFwQixHQUE2QixDQUE3QixJQUFrQ1gsRUFBRSxlQUFGLEVBQW1CVyxNQUFuQixHQUE0QixDQUFsRSxFQUFxRTtBQUNqRVgsVUFBRSxnQkFBRixFQUFvQnFDLFNBQXBCLENBQThCO0FBQzFCQyxrQkFBTSxvQkFEb0I7QUFFMUJDLDZCQUFpQjtBQUZTLFNBQTlCO0FBSUF2QyxVQUFFLGVBQUYsRUFBbUJxQyxTQUFuQixDQUE2QjtBQUN6QkMsa0JBQU0sWUFEbUI7QUFFekJDLDZCQUFpQjtBQUZRLFNBQTdCO0FBSUg7O0FBRUQ7QUFDQXZDLE1BQUVRLFFBQUYsRUFBWU4sRUFBWixDQUFlLE9BQWYsRUFBd0IsZ0JBQXhCLEVBQTBDLFlBQVc7QUFDakQsWUFBSTBCLE9BQU81QixFQUFFLElBQUYsRUFBUStCLElBQVIsQ0FBYSxPQUFiLENBQVg7O0FBRUEvQixVQUFFLGdCQUFGLEVBQW9CTyxXQUFwQixDQUFnQyxXQUFoQztBQUNBUCxVQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixXQUFqQjtBQUNBTixVQUFFLElBQUYsRUFDS3dDLE9BREwsQ0FDYSxPQURiLEVBRUtDLElBRkwsQ0FFVSxZQUZWLEVBR0tiLElBSEwsQ0FHVUEsSUFIVjtBQUlILEtBVEQ7O0FBV0EsYUFBU2MsVUFBVCxHQUFzQjtBQUNsQjFDLFVBQUUsT0FBRixFQUFXMkMsR0FBWCxDQUFlLGFBQWYsRUFBOEIzQyxFQUFFLFNBQUYsRUFBYTRDLFdBQWIsRUFBOUI7QUFDSDtBQUNERjtBQUNBMUMsTUFBRUMsTUFBRixFQUFVcUIsTUFBVixDQUFpQm9CLFVBQWpCOztBQUVBO0FBQ0ExQyxNQUFFLFlBQUYsRUFBZ0JFLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVMyQyxDQUFULEVBQVk7QUFDcENBLFVBQUVDLGNBQUY7QUFDQTlDLFVBQUUsWUFBRixFQUFnQitDLE9BQWhCLENBQXdCLEVBQUVDLFdBQVcsQ0FBYixFQUF4QixFQUEwQyxHQUExQztBQUNILEtBSEQ7O0FBS0E7QUFDQWhELE1BQUUsVUFBRixFQUFjaUQsS0FBZCxDQUFvQixZQUFXO0FBQzNCLFlBQUlDLGVBQWVsRCxFQUFFLElBQUYsRUFBUW1ELElBQVIsQ0FBYSxNQUFiLENBQW5CO0FBQ0EsWUFBSUMsY0FBY3BELEVBQUVrRCxZQUFGLEVBQWdCRyxNQUFoQixHQUF5QkMsR0FBM0M7QUFDQXRELFVBQUUsWUFBRixFQUFnQitDLE9BQWhCLENBQXdCLEVBQUVDLFdBQVdJLGNBQWMsRUFBZCxHQUFtQixJQUFoQyxFQUF4QixFQUFnRSxHQUFoRTtBQUNBLGVBQU8sS0FBUDtBQUNILEtBTEQ7QUFNQXBELE1BQUVDLE1BQUYsRUFBVXNELE1BQVYsQ0FBaUIsWUFBVztBQUN4QixZQUFJdkQsRUFBRSxJQUFGLEVBQVFnRCxTQUFSLEtBQXNCaEQsRUFBRSxJQUFGLEVBQVF3RCxNQUFSLEVBQTFCLEVBQTRDO0FBQ3hDeEQsY0FBRSxZQUFGLEVBQWdCTSxRQUFoQixDQUF5QixZQUF6QjtBQUNBLGdCQUFJTixFQUFFLE9BQUYsRUFBV3lELFFBQVgsQ0FBb0IsU0FBcEIsS0FBa0N6RCxFQUFFQyxNQUFGLEVBQVV5RCxLQUFWLE1BQXFCLEdBQTNELEVBQWdFO0FBQzVEMUQsa0JBQUUsWUFBRixFQUFnQjJDLEdBQWhCLENBQW9CLFFBQXBCLEVBQThCLEVBQTlCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sS0FBUDtBQUNIO0FBQ0osU0FQRCxNQU9PO0FBQ0gzQyxjQUFFLFlBQUYsRUFBZ0JPLFdBQWhCLENBQTRCLFlBQTVCO0FBQ0FQLGNBQUUsWUFBRixFQUFnQjJELFVBQWhCLENBQTJCLE9BQTNCO0FBQ0g7QUFDSixLQVpEOztBQWNBO0FBQ0EzRCxNQUFFLEtBQUYsRUFBU0UsRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBUzBELEtBQVQsRUFBZ0I7QUFDckNBLGNBQU1kLGNBQU47QUFDSCxLQUZEOztBQUlBO0FBQ0EsUUFBSTlDLEVBQUVDLE1BQUYsRUFBVXlELEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUIsWUFBSUcsU0FBUzdELEVBQUUsWUFBRixDQUFiO0FBQ0E2RCxlQUNLcEIsSUFETCxDQUNVLGNBRFYsRUFFS25DLFFBRkwsQ0FFYyxpQkFGZCxFQUdLd0QsT0FITCxDQUdhLHNDQUhiO0FBSUFELGVBQU9wQixJQUFQLENBQVkscUJBQVosRUFBbUNuQyxRQUFuQyxDQUE0QyxrQkFBNUM7QUFDQXVELGVBQU9wQixJQUFQLENBQVksdUJBQVosRUFBcUNuQyxRQUFyQyxDQUE4QyxvQkFBOUM7QUFDSDs7QUFFRDtBQUNBTixNQUFFLGVBQUYsRUFBbUJFLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVc7QUFDdENGLFVBQUUsSUFBRixFQUFRK0QsV0FBUixDQUFvQixJQUFwQjtBQUNBL0QsVUFBRSxjQUFGLEVBQWtCK0QsV0FBbEIsQ0FBOEIsU0FBOUI7QUFDQS9ELFVBQUUsYUFBRixFQUFpQitELFdBQWpCLENBQTZCLFdBQTdCO0FBQ0F2RCxpQkFBU3dELGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixHQUNJMUQsU0FBU3dELGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixLQUE0QyxFQUE1QyxHQUFpRCxRQUFqRCxHQUE0RCxFQURoRTtBQUVBLGVBQU8sS0FBUDtBQUNILEtBUEQ7QUFRQTtBQUNBbEUsTUFBRVEsUUFBRixFQUFZeUMsS0FBWixDQUFrQixVQUFTSixDQUFULEVBQVk7QUFDMUIsWUFDSTdDLEVBQUU2QyxFQUFFc0IsTUFBSixFQUFZM0IsT0FBWixDQUNJLHVEQURKLEVBRUU3QixNQUhOLEVBS0k7QUFDSlgsVUFBRSxlQUFGLEVBQW1CTyxXQUFuQixDQUErQixJQUEvQjtBQUNBUCxVQUFFLGNBQUYsRUFBa0JPLFdBQWxCLENBQThCLFNBQTlCO0FBQ0FQLFVBQUUsYUFBRixFQUFpQk8sV0FBakIsQ0FBNkIsV0FBN0I7QUFDQUMsaUJBQVN3RCxlQUFULENBQXlCQyxLQUF6QixHQUFpQyxFQUFqQztBQUNBcEIsVUFBRXVCLGVBQUY7QUFDSCxLQVpEOztBQWNBLFFBQUlwRSxFQUFFQyxNQUFGLEVBQVV5RCxLQUFWLE1BQXFCLEdBQXpCLEVBQThCO0FBQzFCO0FBQ0ExRCxVQUFFLGNBQUYsRUFBa0JxRSxTQUFsQixDQUE0QixXQUE1QjtBQUNBckUsVUFBRVEsUUFBRixFQUFZTixFQUFaLENBQWUsT0FBZixFQUF3Qiw0QkFBeEIsRUFBc0QsVUFBUzJDLENBQVQsRUFBWTtBQUM5REEsY0FBRUMsY0FBRjtBQUNBLGdCQUFJd0IsVUFBVXRFLEVBQUUsSUFBRixFQUFRd0MsT0FBUixDQUFnQixpQkFBaEIsQ0FBZDtBQUNBLGdCQUFJK0Isa0JBQWtCdkUsRUFBRSxJQUFGLEVBQVF3QyxPQUFSLENBQWdCLHFCQUFoQixDQUF0QjtBQUNBLGdCQUFJZ0MsbUJBQW1CRixRQUFRN0IsSUFBUixDQUFhLHFCQUFiLENBQXZCO0FBQ0EsZ0JBQUlnQyxlQUFlekUsRUFBRSxJQUFGLEVBQVF3QyxPQUFSLENBQWdCLHFCQUFoQixDQUFuQjs7QUFFQSxnQkFBSWtDLFFBQVExRSxFQUFFLElBQUYsRUFBUTRCLElBQVIsRUFBWjtBQUNBLGdCQUFJK0MsUUFBUTNFLEVBQ1IsNERBRFEsQ0FBWjs7QUFJQSxnQkFDSSxDQUFDc0UsUUFBUWIsUUFBUixDQUFpQixXQUFqQixDQUFELElBQ0EsQ0FBQ3pELEVBQUUsSUFBRixFQUFReUQsUUFBUixDQUFpQiwyQkFBakIsQ0FGTCxFQUdFO0FBQ0VhLHdCQUFRaEUsUUFBUixDQUFpQixXQUFqQjtBQUNBcUUsc0JBQ0tDLFdBREwsQ0FDaUJOLFFBQVE3QixJQUFSLENBQWEsNEJBQWIsQ0FEakIsRUFFS2IsSUFGTCxDQUVVOEMsS0FGVjtBQUdILGFBUkQsTUFRTyxJQUNISixRQUFRYixRQUFSLENBQWlCLFdBQWpCLEtBQ0EsQ0FBQ2MsZ0JBQWdCZCxRQUFoQixDQUF5QixXQUF6QixDQURELElBRUEsRUFDSXpELEVBQUUsSUFBRixFQUFReUQsUUFBUixDQUFpQiwyQkFBakIsS0FDQXpELEVBQUUsSUFBRixFQUFReUQsUUFBUixDQUFpQiwyQkFBakIsQ0FGSixDQUhHLEVBT0w7QUFDRWMsZ0NBQWdCakUsUUFBaEIsQ0FBeUIsV0FBekI7QUFDQW1FLDZCQUFhOUIsR0FBYixDQUFpQixVQUFqQixFQUE2QixRQUE3QjtBQUNILGFBVk0sTUFVQSxJQUNIMkIsUUFBUWIsUUFBUixDQUFpQixXQUFqQixLQUNBLENBQUNlLGlCQUFpQmYsUUFBakIsQ0FBMEIsV0FBMUIsQ0FERCxLQUVDekQsRUFBRSxJQUFGLEVBQVF5RCxRQUFSLENBQWlCLDJCQUFqQixLQUNHekQsRUFBRSxJQUFGLEVBQVF5RCxRQUFSLENBQWlCLDJCQUFqQixDQUhKLENBREcsRUFLTDtBQUNFYSx3QkFBUS9ELFdBQVIsQ0FBb0IsV0FBcEI7QUFDQWdFLGdDQUFnQjlCLElBQWhCLENBQXFCLDRCQUFyQixFQUFtRG9DLE1BQW5EO0FBQ0gsYUFSTSxNQVFBLElBQ0hQLFFBQVFiLFFBQVIsQ0FBaUIsV0FBakIsS0FDQWUsaUJBQWlCZixRQUFqQixDQUEwQixXQUExQixDQURBLEtBRUN6RCxFQUFFLElBQUYsRUFBUXlELFFBQVIsQ0FBaUIsMkJBQWpCLEtBQ0d6RCxFQUFFLElBQUYsRUFBUXlELFFBQVIsQ0FBaUIsMkJBQWpCLENBSEosQ0FERyxFQUtMO0FBQ0VlLGlDQUFpQmpFLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0FrRSw2QkFBYWQsVUFBYixDQUF3QixPQUF4QjtBQUNIO0FBQ0osU0EvQ0Q7O0FBaURBO0FBQ0EsWUFBSW1CLFNBQVM5RSxFQUFFLFlBQUYsQ0FBYjtBQUNBLFlBQUkrRSxnQkFBZ0IvRSxFQUFFLHlCQUFGLENBQXBCOztBQUVBK0Usc0JBQWM3RSxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFlBQVc7QUFDakMsZ0JBQUk0RSxPQUFPckIsUUFBUCxDQUFnQixZQUFoQixDQUFKLEVBQW1DO0FBQy9CcUIsdUJBQU92RSxXQUFQLENBQW1CLFlBQW5CO0FBQ0F1RSx1QkFBT3JDLElBQVAsQ0FBWSxrQkFBWixFQUFnQ3VDLEdBQWhDLENBQW9DLEVBQXBDO0FBQ0FGLHVCQUFPckMsSUFBUCxDQUFZLGVBQVosRUFBNkJFLEdBQTdCLENBQWlDLFNBQWpDLEVBQTRDLE1BQTVDO0FBQ0gsYUFKRCxNQUlPO0FBQ0htQyx1QkFBT3hFLFFBQVAsQ0FBZ0IsWUFBaEI7QUFDSDtBQUNKLFNBUkQ7O0FBVUE7QUFDQU4sVUFBRVEsUUFBRixFQUFZeUMsS0FBWixDQUFrQixVQUFTVyxLQUFULEVBQWdCO0FBQzlCLGdCQUNJNUQsRUFBRTRELE1BQU1PLE1BQVIsRUFBZ0IzQixPQUFoQixDQUF3QixxQ0FBeEIsRUFDSzdCLE1BRlQsRUFJSTtBQUNKbUUsbUJBQU92RSxXQUFQLENBQW1CLFlBQW5CO0FBQ0F1RSxtQkFBT3JDLElBQVAsQ0FBWSxrQkFBWixFQUFnQ3VDLEdBQWhDLENBQW9DLEVBQXBDO0FBQ0FGLG1CQUFPckMsSUFBUCxDQUFZLGVBQVosRUFBNkJFLEdBQTdCLENBQWlDLFNBQWpDLEVBQTRDLE1BQTVDO0FBQ0FpQixrQkFBTVEsZUFBTjtBQUNILFNBVkQ7QUFXSCxLQTlFRCxNQThFTztBQUNILFlBQUlhLGFBQWFqRixFQUFFLGNBQUYsQ0FBakI7QUFDQSxZQUFJa0Ysa0JBQWtCbEYsRUFBRSxrQ0FBRixFQUNqQjJDLEdBRGlCLENBQ2IsUUFEYSxFQUNILEVBREcsRUFFakJpQyxXQUZpQixDQUVMLGNBRkssRUFHakJPLElBSGlCLEVBQXRCO0FBSUFuRixVQUFFQyxNQUFGLEVBQVVzRCxNQUFWLENBQWlCLFlBQVc7QUFDeEIsZ0JBQUl2RCxFQUFFLElBQUYsRUFBUWdELFNBQVIsTUFBdUJoRCxFQUFFLG1CQUFGLEVBQXVCNEMsV0FBdkIsRUFBM0IsRUFBaUU7QUFDN0RxQywyQkFBVzNFLFFBQVgsQ0FBb0IsZUFBcEI7QUFDQTRFLGdDQUFnQkUsSUFBaEI7QUFDSCxhQUhELE1BR087QUFDSEgsMkJBQVcxRSxXQUFYLENBQXVCLGVBQXZCO0FBQ0EyRSxnQ0FBZ0JDLElBQWhCO0FBQ0g7QUFDSixTQVJEO0FBU0g7O0FBRUQ7QUFDQW5GLE1BQUUsMEJBQUYsRUFBOEJFLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVc7QUFDakRGLFVBQUUsSUFBRixFQUFRMkMsR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7QUFDQTNDLFVBQUUsSUFBRixFQUNLcUYsSUFETCxHQUVLMUMsR0FGTCxDQUVTLFNBRlQsRUFFb0IsT0FGcEI7QUFHQTNDLFVBQUUsSUFBRixFQUNLc0YsTUFETCxHQUVLN0MsSUFGTCxDQUVVLHdCQUZWLEVBR0tVLElBSEwsQ0FHVSxNQUhWLEVBR2tCLE1BSGxCO0FBSUgsS0FURDtBQVVBO0FBQ0FuRCxNQUFFLDBCQUFGLEVBQThCRSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFXO0FBQ2pERixVQUFFLElBQUYsRUFBUTJDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBQ0EzQyxVQUFFLElBQUYsRUFDS3VGLElBREwsR0FFSzVDLEdBRkwsQ0FFUyxTQUZULEVBRW9CLE9BRnBCO0FBR0EzQyxVQUFFLElBQUYsRUFDS3NGLE1BREwsR0FFSzdDLElBRkwsQ0FFVSxvQkFGVixFQUdLVSxJQUhMLENBR1UsTUFIVixFQUdrQixVQUhsQjtBQUlILEtBVEQ7O0FBV0E7QUFDQW5ELE1BQUUsc0JBQUYsRUFBMEJFLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFVBQVMyQyxDQUFULEVBQVk7QUFDOUMsWUFBSSxDQUFDN0MsRUFBRSxJQUFGLEVBQVF5RCxRQUFSLENBQWlCLFlBQWpCLENBQUwsRUFBcUM7QUFDakN6RCxjQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixZQUFqQjtBQUNILFNBRkQsTUFFTztBQUNITixjQUFFLElBQUYsRUFBUU8sV0FBUixDQUFvQixZQUFwQjtBQUNIO0FBQ0RzQyxVQUFFQyxjQUFGO0FBQ0gsS0FQRDs7QUFTQTs7OztBQUlBOUMsTUFBRVEsUUFBRixFQUFZTixFQUFaLENBQWUsT0FBZixFQUF3QixnQkFBeEIsRUFBMEMsVUFBUzJDLENBQVQsRUFBWTtBQUNsRCxZQUFJMkMsT0FBT3hGLEVBQUUsSUFBRixFQUFRd0MsT0FBUixDQUFnQixrQkFBaEIsQ0FBWDtBQUNBLFlBQUlpRCxRQUFRekYsRUFBRSxJQUFGLEVBQVErQixJQUFSLENBQWEsT0FBYixDQUFaO0FBQ0EsWUFBSTJELE1BQU1GLEtBQUsvQyxJQUFMLENBQVUsc0JBQVYsQ0FBVjs7QUFFQWlELFlBQUl2QyxJQUFKLENBQVMsS0FBVCxFQUFnQnNDLEtBQWhCO0FBQ0E1QyxVQUFFQyxjQUFGO0FBQ0gsS0FQRDs7QUFTQTtBQUNBOUMsTUFBRSxhQUFGLEVBQ0t5QyxJQURMLENBQ1UsZ0JBRFYsRUFFS3ZDLEVBRkwsQ0FFUSxPQUZSLEVBRWlCLFlBQVc7QUFDcEIsWUFBSUYsRUFBRSxJQUFGLEVBQVF5RCxRQUFSLENBQWlCLFlBQWpCLENBQUosRUFBb0M7QUFDaEM7QUFDSCxTQUZELE1BRU87QUFDSHpELGNBQUUsYUFBRixFQUNLeUMsSUFETCxDQUNVLGdCQURWLEVBRUtsQyxXQUZMLENBRWlCLFlBRmpCO0FBR0FQLGNBQUUsSUFBRixFQUFRTSxRQUFSLENBQWlCLFlBQWpCO0FBQ0E7QUFDSDtBQUNKLEtBWkw7O0FBY0FOLE1BQUUsYUFBRixFQUNLeUMsSUFETCxDQUNVLGlCQURWLEVBRUt2QyxFQUZMLENBRVEsT0FGUixFQUVpQixVQUFTMkMsQ0FBVCxFQUFZO0FBQ3JCLFlBQUkyQyxPQUFPeEYsRUFBRSxJQUFGLEVBQVFzRixNQUFSLENBQWUsZ0JBQWYsQ0FBWDtBQUNBLFlBQUlFLEtBQUsvQixRQUFMLENBQWMsWUFBZCxDQUFKLEVBQWlDO0FBQzdCK0IsaUJBQUtqRixXQUFMLENBQWlCLFlBQWpCO0FBQ0g7QUFDRHNDLFVBQUV1QixlQUFGO0FBQ0gsS0FSTDs7QUFVQXBFLE1BQUUseUJBQUYsRUFDS3lDLElBREwsQ0FDVSwwQkFEVixFQUVLa0QsSUFGTCxDQUVVLFlBQVc7QUFDYixZQUFJQyxXQUFXNUYsRUFBRSxJQUFGLEVBQVF5QyxJQUFSLENBQWEsd0JBQWIsQ0FBZjtBQUNBLFlBQUlnRCxRQUFRRyxTQUFTN0QsSUFBVCxDQUFjLGNBQWQsQ0FBWjtBQUNBNkQsaUJBQVNqRCxHQUFULENBQWEsa0JBQWIsRUFBaUM4QyxLQUFqQztBQUNILEtBTkw7O0FBUUEsUUFBSXpGLEVBQUVDLE1BQUYsRUFBVXlELEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUIxRCxVQUFFLHlCQUFGLEVBQ0t5QyxJQURMLENBQ1UsMEJBRFYsRUFFS2xDLFdBRkwsQ0FFaUIsV0FGakI7QUFHSCxLQUpELE1BSU87QUFDSFAsVUFBRSx5QkFBRixFQUNLeUMsSUFETCxDQUNVLDBCQURWLEVBRUtwQixhQUZMLEdBR0tDLE1BSEw7QUFJSDs7QUFFRDtBQUNBdEIsTUFBRSwwQkFBRixFQUE4QkUsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVztBQUNqREYsVUFBRSxvQkFBRixFQUF3Qk0sUUFBeEIsQ0FBaUMsWUFBakM7QUFDQUUsaUJBQVN3RCxlQUFULENBQXlCQyxLQUF6QixDQUErQkMsUUFBL0IsR0FBMEMsUUFBMUM7QUFDSCxLQUhEO0FBSUFsRSxNQUFFLDBCQUFGLEVBQThCRSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFXO0FBQ2pERixVQUFFLG9CQUFGLEVBQXdCTyxXQUF4QixDQUFvQyxZQUFwQztBQUNBQyxpQkFBU3dELGVBQVQsQ0FBeUJDLEtBQXpCLEdBQWlDLEVBQWpDO0FBQ0gsS0FIRDs7QUFLQTtBQUNBLFFBQUlqRSxFQUFFLFdBQUYsRUFBZVcsTUFBZixHQUF3QixDQUF4QixJQUE2QlgsRUFBRUMsTUFBRixFQUFVeUQsS0FBVixLQUFvQixHQUFyRCxFQUEwRDtBQUN0RCxZQUFJbUMsVUFBVSxJQUFJQyxhQUFKLENBQWtCLFdBQWxCLEVBQStCO0FBQ3pDQyx3QkFBWSxFQUQ2QjtBQUV6Q0MsMkJBQWUsRUFGMEI7QUFHekNDLCtCQUFtQixnQkFIc0I7QUFJekNDLGtDQUFzQjtBQUptQixTQUEvQixDQUFkO0FBTUg7O0FBR0Q7Ozs7QUFJQTtBQUNBLFFBQUlsRyxFQUFFLGVBQUYsRUFBbUJXLE1BQW5CLEdBQTRCLENBQWhDLEVBQW1DO0FBQy9CLFlBQUl3RixhQUFhbkcsRUFBRSxlQUFGLENBQWpCOztBQUVBbUcsbUJBQ0sxRCxJQURMLENBQ1Usa0JBRFYsRUFFSzJELEdBRkwsQ0FFUyxRQUZULEVBR0szRCxJQUhMLENBR1UscUJBSFYsRUFJSzRELE9BSkw7QUFLQUYsbUJBQ0sxRCxJQURMLENBQ1Usd0JBRFYsRUFFS25DLFFBRkwsQ0FFYyxTQUZkLEVBR0ttQyxJQUhMLENBR1UscUJBSFYsRUFJSzZELFNBSkw7O0FBTUF0RyxVQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG1CQUF4QixFQUE2QyxZQUFXO0FBQ3BELGdCQUNJRixFQUFFLElBQUYsRUFDS3NGLE1BREwsR0FFSzdCLFFBRkwsQ0FFYyxTQUZkLENBREosRUFJRTtBQUNFekQsa0JBQUUsSUFBRixFQUNLc0YsTUFETCxHQUVLL0UsV0FGTCxDQUVpQixTQUZqQixFQUdLa0MsSUFITCxDQUdVLHFCQUhWLEVBSUs0RCxPQUpMO0FBS0gsYUFWRCxNQVVPO0FBQ0hyRyxrQkFBRSxJQUFGLEVBQ0tzRixNQURMLEdBRUtoRixRQUZMLENBRWMsU0FGZCxFQUdLbUMsSUFITCxDQUdVLHFCQUhWLEVBSUs2RCxTQUpMO0FBS0g7QUFDSixTQWxCRDtBQW1CQSxZQUFJSCxXQUFXMUMsUUFBWCxDQUFvQixlQUFwQixDQUFKLEVBQTBDO0FBQ3RDekQsY0FBRSxJQUFGLEVBQ0t5QyxJQURMLENBQ1Usa0JBRFYsRUFFSzhELE1BRkwsQ0FFWSxRQUZaLEVBR0toRyxXQUhMLENBR2lCLFNBSGpCLEVBSUtrQyxJQUpMLENBSVUscUJBSlYsRUFLSzRELE9BTEw7QUFNQXJHLGNBQUUsSUFBRixFQUNLeUMsSUFETCxDQUNVLG1CQURWLEVBRUt2QyxFQUZMLENBRVEsT0FGUixFQUVpQixZQUFXO0FBQ3BCLG9CQUNJRixFQUFFLElBQUYsRUFDS3NGLE1BREwsR0FFSzdCLFFBRkwsQ0FFYyxTQUZkLENBREosRUFJRTtBQUNFekQsc0JBQUUsSUFBRixFQUNLeUMsSUFETCxDQUNVLG1CQURWLEVBRUtiLElBRkwsQ0FFVSxXQUZWO0FBR0gsaUJBUkQsTUFRTztBQUNINUIsc0JBQUUsSUFBRixFQUNLeUMsSUFETCxDQUNVLG1CQURWLEVBRUtiLElBRkwsQ0FFVSxRQUZWO0FBR0g7QUFDSixhQWhCTDtBQWlCSDtBQUNKOztBQUVEO0FBQ0E1QixNQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7QUFDL0MsWUFDSUYsRUFBRSxJQUFGLEVBQ0t5QyxJQURMLENBQ1UsT0FEVixFQUVLK0QsRUFGTCxDQUVRLFVBRlIsQ0FESixFQUlFO0FBQ0V4RyxjQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixZQUFqQjtBQUNILFNBTkQsTUFNTztBQUNITixjQUFFLElBQUYsRUFBUU8sV0FBUixDQUFvQixZQUFwQjtBQUNIO0FBQ0osS0FWRDs7QUFZQTtBQUNBUCxNQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFXO0FBQ3ZELFlBQUlGLEVBQUUsSUFBRixFQUFReUQsUUFBUixDQUFpQixZQUFqQixDQUFKLEVBQW9DO0FBQ2hDekQsY0FBRSxJQUFGLEVBQVFPLFdBQVIsQ0FBb0IsWUFBcEI7QUFDSCxTQUZELE1BRU87QUFDSFAsY0FBRSxJQUFGLEVBQVFNLFFBQVIsQ0FBaUIsWUFBakI7QUFDSDtBQUNKLEtBTkQ7O0FBUUE7QUFDQSxRQUFJTixFQUFFLGNBQUYsRUFBa0JXLE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDO0FBQzlCWCxVQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7QUFDL0MsZ0JBQUlGLEVBQUUsSUFBRixFQUFReUQsUUFBUixDQUFpQixXQUFqQixDQUFKLEVBQW1DO0FBQy9CekQsa0JBQUUsSUFBRixFQUFRTyxXQUFSLENBQW9CLFdBQXBCO0FBQ0gsYUFGRCxNQUVPO0FBQ0hQLGtCQUFFLGNBQUYsRUFBa0JPLFdBQWxCLENBQThCLFdBQTlCO0FBQ0FQLGtCQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixXQUFqQjtBQUNIO0FBQ0osU0FQRDtBQVFBTixVQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVMyQyxDQUFULEVBQVk7QUFDaEMsZ0JBQUk3QyxFQUFFNkMsRUFBRXNCLE1BQUosRUFBWTNCLE9BQVosQ0FBb0IsY0FBcEIsRUFBb0M3QixNQUF4QyxFQUFnRDtBQUNoRFgsY0FBRSxjQUFGLEVBQWtCTyxXQUFsQixDQUE4QixXQUE5QjtBQUNBc0MsY0FBRXVCLGVBQUY7QUFDSCxTQUpEO0FBS0g7O0FBR0Q7Ozs7QUFJQTtBQUNBLFFBQUlwRSxFQUFFLGlCQUFGLEVBQXFCVyxNQUFyQixHQUE4QixDQUE5QixJQUFtQ1gsRUFBRUMsTUFBRixFQUFVeUQsS0FBVixLQUFvQixHQUEzRCxFQUFnRTtBQUM1RCxZQUFJbUMsVUFBVSxJQUFJQyxhQUFKLENBQWtCLGlCQUFsQixFQUFxQztBQUMvQ0Msd0JBQVksR0FEbUM7QUFFL0NDLDJCQUFlLEVBRmdDO0FBRy9DQywrQkFBbUIsZ0JBSDRCO0FBSS9DQyxrQ0FBc0I7QUFKeUIsU0FBckMsQ0FBZDtBQU1IO0FBRUosQ0FqZUQ7O0FBbWVBOzs7O0FBSUFsRyxFQUFFUSxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6Qjs7QUFFQTtBQUNBLFFBQUlULEVBQUUsb0JBQUYsRUFBd0JXLE1BQXhCLEdBQWlDLENBQXJDLEVBQXdDO0FBQ3BDWCxVQUFFLG9CQUFGLEVBQXdCeUcsS0FBeEIsQ0FBOEI7QUFDMUJDLHVCQUFXLHlCQURlO0FBRTFCQyx1QkFBVyx5QkFGZTtBQUcxQkMsb0JBQVEsSUFIa0I7QUFJMUJDLHNCQUFVLElBSmdCO0FBSzFCQywwQkFBYyxDQUxZO0FBTTFCQyw0QkFBZ0IsQ0FOVTtBQU8xQkMsbUJBQU8sSUFQbUI7QUFRMUJDLDJCQUFlLElBUlc7QUFTMUJDLHNCQUFVLElBVGdCO0FBVTFCQyxrQkFBTSxLQVZvQjtBQVcxQjtBQUNBQyx3QkFBWSxDQUNSO0FBQ0lDLDRCQUFZLElBRGhCO0FBRUlDLDBCQUFVO0FBQ05SLGtDQUFjO0FBRFI7QUFGZCxhQURRLEVBT1I7QUFDSU8sNEJBQVksR0FEaEI7QUFFSUMsMEJBQVU7QUFDTlIsa0NBQWM7QUFEUjtBQUZkLGFBUFEsRUFhUjtBQUNJTyw0QkFBWSxHQURoQjtBQUVJQywwQkFBVTtBQUNOUixrQ0FBYyxDQURSO0FBRU5JLDhCQUFVLEtBRko7QUFHTkssbUNBQWUsS0FIVDtBQUlOWCw0QkFBUTtBQUpGO0FBRmQsYUFiUSxFQXNCUjtBQUNJUyw0QkFBWSxHQURoQjtBQUVJQywwQkFBVTtBQUNOUixrQ0FBYztBQURSO0FBRmQsYUF0QlEsRUE0QlI7QUFDSU8sNEJBQVksR0FEaEI7QUFFSUMsMEJBQVU7QUFDTlIsa0NBQWM7QUFEUjtBQUZkLGFBNUJRO0FBWmMsU0FBOUI7QUFnREg7O0FBRUQ7QUFDQSxRQUNJOUcsRUFBRSxxQkFBRixFQUF5QlcsTUFBekIsR0FBa0MsQ0FBbEMsSUFDQVgsRUFBRSx5QkFBRixFQUE2QlcsTUFBN0IsR0FBc0MsQ0FGMUMsRUFHRTtBQUNFNkc7QUFDSDs7QUFFRCxRQUNJeEgsRUFBRSwyQkFBRixFQUErQlcsTUFBL0IsR0FBd0MsQ0FBeEMsSUFDQVgsRUFBRSwrQkFBRixFQUFtQ1csTUFBbkMsR0FBNEMsQ0FGaEQsRUFHRTtBQUNFOEc7QUFDSDs7QUFFRDtBQUNBLFFBQUl6SCxFQUFFLHNCQUFGLEVBQTBCVyxNQUExQixHQUFtQyxDQUF2QyxFQUEwQztBQUN0Q1gsVUFBRSxzQkFBRixFQUEwQnlHLEtBQTFCLENBQWdDO0FBQzVCQyx1QkFBVywrQkFEaUI7QUFFNUJDLHVCQUFXLCtCQUZpQjtBQUc1QkMsb0JBQVEsSUFIb0I7QUFJNUJDLHNCQUFVLElBSmtCO0FBSzVCQywwQkFBYyxDQUxjO0FBTTVCQyw0QkFBZ0IsQ0FOWTtBQU81QkMsbUJBQU8sR0FQcUI7QUFRNUJDLDJCQUFlLElBUmE7QUFTNUJDLHNCQUFVLElBVGtCO0FBVTVCQyxrQkFBTTtBQVZzQixTQUFoQztBQVlIOztBQUVEO0FBQ0EsUUFBSW5ILEVBQUUsd0JBQUYsRUFBNEJXLE1BQTVCLEdBQXFDLENBQXpDLEVBQTRDO0FBQ3hDK0c7QUFDSDtBQUNELFFBQUkxSCxFQUFFLDhCQUFGLEVBQWtDVyxNQUFsQyxHQUEyQyxDQUEvQyxFQUFrRDtBQUM5Q2dIO0FBQ0g7QUFDSixDQTdGRDs7QUErRkE7QUFDQSxTQUFTSCxVQUFULEdBQXNCO0FBQ2xCeEgsTUFBRSxxQkFBRixFQUF5QnlHLEtBQXpCLENBQStCO0FBQzNCSyxzQkFBYyxDQURhO0FBRTNCQyx3QkFBZ0IsQ0FGVztBQUczQkgsZ0JBQVEsS0FIbUI7QUFJM0JnQixjQUFNLElBSnFCO0FBSzNCQyxrQkFBVSx5QkFMaUI7QUFNM0JULG9CQUFZLENBQ1I7QUFDSUMsd0JBQVksR0FEaEI7QUFFSUMsc0JBQVU7QUFDTkgsc0JBQU0sSUFEQTtBQUVOUyxzQkFBTTtBQUZBO0FBRmQsU0FEUTtBQU5lLEtBQS9CO0FBZ0JBNUgsTUFBRSx5QkFBRixFQUE2QnlHLEtBQTdCLENBQW1DO0FBQy9CSyxzQkFBYyxDQURpQjtBQUUvQkMsd0JBQWdCLENBRmU7QUFHL0JjLGtCQUFVLHFCQUhxQjtBQUkvQlYsY0FBTSxJQUp5QjtBQUsvQjtBQUNBVyx1QkFBZSxJQU5nQjtBQU8vQlYsb0JBQVksQ0FDUjtBQUNJQyx3QkFBWSxJQURoQjtBQUVJQyxzQkFBVTtBQUNOUyw0QkFBWTtBQUROO0FBRmQsU0FEUSxFQU9SO0FBQ0lWLHdCQUFZLEdBRGhCO0FBRUlDLHNCQUFVO0FBRmQsU0FQUTtBQVBtQixLQUFuQztBQW9CSDs7QUFFRCxTQUFTRyxXQUFULEdBQXVCO0FBQ25CekgsTUFBRSwyQkFBRixFQUErQnlHLEtBQS9CLENBQXFDO0FBQ2pDSyxzQkFBYyxDQURtQjtBQUVqQ0Msd0JBQWdCLENBRmlCO0FBR2pDSCxnQkFBUSxLQUh5QjtBQUlqQ2dCLGNBQU0sSUFKMkI7QUFLakNDLGtCQUFVLCtCQUx1QjtBQU1qQ1Qsb0JBQVksQ0FDUjtBQUNJQyx3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUNOSCxzQkFBTSxJQURBO0FBRU5TLHNCQUFNO0FBRkE7QUFGZCxTQURRO0FBTnFCLEtBQXJDO0FBZ0JBNUgsTUFBRSwrQkFBRixFQUFtQ3lHLEtBQW5DLENBQXlDO0FBQ3JDSyxzQkFBYyxDQUR1QjtBQUVyQ0Msd0JBQWdCLENBRnFCO0FBR3JDYyxrQkFBVSwyQkFIMkI7QUFJckNWLGNBQU0sSUFKK0I7QUFLckM7QUFDQVcsdUJBQWUsSUFOc0I7QUFPckNWLG9CQUFZLENBQ1I7QUFDSUMsd0JBQVksSUFEaEI7QUFFSUMsc0JBQVU7QUFDTlMsNEJBQVk7QUFETjtBQUZkLFNBRFEsRUFPUjtBQUNJVix3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUZkLFNBUFE7QUFQeUIsS0FBekM7QUFvQkg7O0FBRUQ7QUFDQSxTQUFTSSxhQUFULEdBQXlCO0FBQ3JCMUgsTUFBRSx3QkFBRixFQUE0QnlHLEtBQTVCLENBQWtDO0FBQzlCRyxnQkFBUSxJQURzQjtBQUU5QkMsa0JBQVUsSUFGb0I7QUFHOUJDLHNCQUFjLENBSGdCO0FBSTlCQyx3QkFBZ0IsQ0FKYztBQUs5QkMsZUFBTyxHQUx1QjtBQU05QkMsdUJBQWUsSUFOZTtBQU85QkMsa0JBQVUsSUFQb0I7QUFROUJDLGNBQU0sS0FSd0I7QUFTOUJDLG9CQUFZLENBQ1I7QUFDSUMsd0JBQVksSUFEaEI7QUFFSUMsc0JBQVU7QUFDTlIsOEJBQWM7QUFEUjtBQUZkLFNBRFEsRUFPUjtBQUNJTyx3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUNOUiw4QkFBYztBQURSO0FBRmQsU0FQUSxFQWFSO0FBQ0lPLHdCQUFZLEdBRGhCO0FBRUlDLHNCQUFVO0FBQ05SLDhCQUFjO0FBRFI7QUFGZCxTQWJRLEVBbUJSO0FBQ0lPLHdCQUFZLEdBRGhCO0FBRUlDLHNCQUFVO0FBQ05SLDhCQUFjO0FBRFI7QUFGZCxTQW5CUTtBQVRrQixLQUFsQztBQW9DSDs7QUFFRCxTQUFTYSxrQkFBVCxHQUE4QjtBQUMxQjNILE1BQUUsOEJBQUYsRUFBa0N5RyxLQUFsQyxDQUF3QztBQUNwQ0csZ0JBQVEsSUFENEI7QUFFcENDLGtCQUFVLElBRjBCO0FBR3BDQyxzQkFBYyxDQUhzQjtBQUlwQ0Msd0JBQWdCLENBSm9CO0FBS3BDQyxlQUFPLEdBTDZCO0FBTXBDQyx1QkFBZSxJQU5xQjtBQU9wQ0Msa0JBQVUsSUFQMEI7QUFRcENDLGNBQU0sS0FSOEI7QUFTcENDLG9CQUFZLENBQ1I7QUFDSUMsd0JBQVksSUFEaEI7QUFFSUMsc0JBQVU7QUFDTlIsOEJBQWM7QUFEUjtBQUZkLFNBRFEsRUFPUjtBQUNJTyx3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUNOUiw4QkFBYztBQURSO0FBRmQsU0FQUSxFQWFSO0FBQ0lPLHdCQUFZLEdBRGhCO0FBRUlDLHNCQUFVO0FBQ05SLDhCQUFjO0FBRFI7QUFGZCxTQWJRLEVBbUJSO0FBQ0lPLHdCQUFZLEdBRGhCO0FBRUlDLHNCQUFVO0FBQ05SLDhCQUFjO0FBRFI7QUFGZCxTQW5CUTtBQVR3QixLQUF4QztBQW9DSDs7QUFHRDs7OztBQUlBOUcsRUFBRVEsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekI7QUFDQVQsTUFBRSxtREFBRixFQUF1RGdJLElBQXZEOztBQUVBaEksTUFBRVEsUUFBRixFQUFZTixFQUFaLENBQWUsT0FBZixFQUF3QixpQkFBeEIsRUFBMkMsWUFBVztBQUNsREYsVUFBRSxJQUFGLEVBQ0t3QyxPQURMLENBQ2EsNkJBRGIsRUFFS0MsSUFGTCxDQUVVLDhCQUZWLEVBR0tnRSxLQUhMLENBR1csYUFIWDtBQUlBekcsVUFBRSxJQUFGLEVBQ0t3QyxPQURMLENBQ2Esc0JBRGIsRUFFS0MsSUFGTCxDQUVVLHdCQUZWLEVBR0tnRSxLQUhMLENBR1csYUFIWDtBQUlILEtBVEQ7O0FBV0EsUUFBSXpHLEVBQUVDLE1BQUYsRUFBVXlELEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekIxRCxVQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFNBQXhCLEVBQW1DOEgsSUFBbkM7QUFDQWhJLFVBQUVRLFFBQUYsRUFBWU4sRUFBWixDQUFlLE9BQWYsRUFBd0IsZUFBeEIsRUFBeUM4SCxJQUF6QztBQUNIOztBQUVEaEksTUFBRSxVQUFGLEVBQWNFLEVBQWQsQ0FBaUIsZ0JBQWpCLEVBQW1DLFVBQVMyQyxDQUFULEVBQVk7QUFDM0M3QyxVQUFFLDJCQUFGLEVBQStCc0IsTUFBL0I7QUFDQXRCLFVBQUUsOEJBQUYsRUFBa0NzQixNQUFsQzs7QUFFQSxZQUFJdEIsRUFBRUMsTUFBRixFQUFVeUQsS0FBVixNQUFxQixHQUF6QixFQUE4QjtBQUMxQnVFO0FBQ0g7QUFDSixLQVBEOztBQVNBO0FBQ0EsYUFBU0EsWUFBVCxHQUF3QjtBQUNwQixZQUFJQyxNQUFNbEksRUFBRSxvQkFBRixDQUFWOztBQUVBQSxVQUFFLHdCQUFGLEVBQ0ttSSxNQURMLEdBRUs3SCxRQUZMLENBRWMseUNBRmQsRUFHS0MsV0FITCxDQUdpQixhQUhqQjtBQUlBMkgsWUFBSXpGLElBQUosQ0FBUyxhQUFULEVBQ0tuQyxRQURMLENBQ2Msa0JBRGQsRUFFS0MsV0FGTCxDQUVpQixzQkFGakIsRUFHSzZILElBSEwsQ0FHVSwrQkFIVjs7QUFLQUYsWUFBSXpGLElBQUosQ0FBUyx3QkFBVCxFQUNLa0IsVUFETCxDQUNnQixPQURoQixFQUVLaUIsV0FGTCxDQUVpQixnQkFGakIsRUFHS1UsTUFITCxHQUlLaEYsUUFKTCxDQUljLFNBSmQ7QUFLQTRILFlBQUl6RixJQUFKLENBQVMsd0JBQVQsRUFDS0UsR0FETCxDQUNTLFNBRFQsRUFDb0IsTUFEcEIsRUFFS2lDLFdBRkwsQ0FFaUIsZ0JBRmpCOztBQUlBc0QsWUFBSXpGLElBQUosQ0FBUyxlQUFULEVBQ0tuQyxRQURMLENBQ2Msb0JBRGQsRUFFS0MsV0FGTCxDQUVpQixvQ0FGakI7QUFHQTJILFlBQUl6RixJQUFKLENBQVMsaUJBQVQsRUFBNEJvQyxNQUE1QjtBQUNIOztBQUVELFFBQUk3RSxFQUFFQyxNQUFGLEVBQVV5RCxLQUFWLE1BQXFCLEdBQXpCLEVBQThCO0FBQzFCdUU7QUFDSDs7QUFFRDtBQUNBSTs7QUFFQXJJLE1BQUVRLFFBQUYsRUFBWU4sRUFBWixDQUFlLE9BQWYsRUFBd0IsaUJBQXhCLEVBQTJDLFlBQVc7QUFDbEQsWUFBSUYsRUFBRSxJQUFGLEVBQVF5RCxRQUFSLENBQWlCLFdBQWpCLENBQUosRUFBbUM7QUFDL0J6RCxjQUFFLGlCQUFGLEVBQXFCTyxXQUFyQixDQUFpQyxXQUFqQztBQUNBUCxjQUFFLElBQUYsRUFBUU8sV0FBUixDQUFvQixXQUFwQjtBQUNILFNBSEQsTUFHTztBQUNIUCxjQUFFLGlCQUFGLEVBQXFCTyxXQUFyQixDQUFpQyxXQUFqQztBQUNBUCxjQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixXQUFqQjtBQUNIO0FBQ0osS0FSRDs7QUFVQU4sTUFBRVEsUUFBRixFQUFZTixFQUFaLENBQWUsT0FBZixFQUF3QixVQUFTMkMsQ0FBVCxFQUFZO0FBQ2hDLFlBQUk3QyxFQUFFNkMsRUFBRXNCLE1BQUosRUFBWTNCLE9BQVosQ0FBb0IsaUJBQXBCLEVBQXVDN0IsTUFBM0MsRUFBbUQ7QUFDbkRYLFVBQUUsaUJBQUYsRUFBcUJPLFdBQXJCLENBQWlDLFdBQWpDO0FBQ0FzQyxVQUFFdUIsZUFBRjtBQUNILEtBSkQ7O0FBTUFwRSxNQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFXO0FBQ3ZELFlBQUlvSSxTQUFTdEksRUFBRSxJQUFGLEVBQVF3QyxPQUFSLENBQWdCLGlCQUFoQixDQUFiO0FBQ0EsWUFBSVosT0FBTzVCLEVBQUUsSUFBRixFQUNOeUMsSUFETSxDQUNELHFCQURDLEVBRU5iLElBRk0sRUFBWDtBQUdBLFlBQUk2RCxRQUFRekYsRUFBRSxJQUFGLEVBQ1B5QyxJQURPLENBQ0YscUJBREUsRUFFUFYsSUFGTyxDQUVGLG1CQUZFLENBQVo7QUFHQSxZQUFJd0csUUFBUUQsT0FBTzdGLElBQVAsQ0FBWSxxQkFBWixDQUFaO0FBQ0EsWUFBSStGLFFBQVFGLE9BQU83RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQStGLGNBQU14RCxHQUFOLENBQVVwRCxJQUFWO0FBQ0EyRyxjQUFNRSxRQUFOLENBQWUscUJBQWYsRUFBc0MxRyxJQUF0QyxDQUEyQyxtQkFBM0MsRUFBZ0UwRCxLQUFoRTs7QUFFQTRDOztBQUVBLFlBQUlDLE9BQU83RSxRQUFQLENBQWdCLG9CQUFoQixDQUFKLEVBQTJDO0FBQ3ZDLGdCQUFJekQsRUFBRSxJQUFGLEVBQVF5RCxRQUFSLENBQWlCLDJCQUFqQixDQUFKLEVBQW1EO0FBQy9DOEUsc0JBQ0tFLFFBREwsQ0FDYyxxQkFEZCxFQUVLOUUsVUFGTCxDQUVnQixPQUZoQixFQUdLL0IsSUFITCxDQUdVLFNBSFY7QUFJQTRHLHNCQUFNN0YsR0FBTixDQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFDSCxhQU5ELE1BTU87QUFDSDZGLHNCQUFNN0UsVUFBTixDQUFpQixPQUFqQjtBQUNBNEUsc0JBQU1FLFFBQU4sQ0FBZSxxQkFBZixFQUFzQzlGLEdBQXRDLENBQTBDLFNBQTFDLEVBQXFELE1BQXJEO0FBQ0g7QUFDSjtBQUNKLEtBNUJEO0FBNkJILENBN0dEOztBQStHQTtBQUNBLFNBQVMwRixXQUFULEdBQXVCO0FBQ25CckksTUFBRSxpQkFBRixFQUNLMkYsSUFETCxDQUNVLFlBQVc7QUFDYixZQUFJQyxXQUFXNUYsRUFBRSxJQUFGLEVBQVF5QyxJQUFSLENBQWEscUJBQWIsQ0FBZjtBQUNBLFlBQUlnRCxRQUFRRyxTQUFTN0QsSUFBVCxDQUFjLG1CQUFkLENBQVo7QUFDQTZELGlCQUFTakQsR0FBVCxDQUFhLGtCQUFiLEVBQWlDOEMsS0FBakM7QUFDSCxLQUxMLEVBTUtoRCxJQU5MLENBTVUsb0JBTlYsRUFPS2tELElBUEwsQ0FPVSxZQUFXO0FBQ2IsWUFBSUMsV0FBVzVGLEVBQUUsSUFBRixFQUFReUMsSUFBUixDQUFhLHFCQUFiLENBQWY7QUFDQSxZQUFJZ0QsUUFBUUcsU0FBUzdELElBQVQsQ0FBYyxtQkFBZCxDQUFaO0FBQ0E2RCxpQkFBU2pELEdBQVQsQ0FBYSxrQkFBYixFQUFpQzhDLEtBQWpDO0FBQ0gsS0FYTDtBQVlIOztBQUVEO0FBQ0EsU0FBU3VDLElBQVQsQ0FBY25GLENBQWQsRUFBaUI7QUFDYixRQUFJc0IsU0FBU3RCLEVBQUVzQixNQUFmO0FBQ0EsUUFBSUEsT0FBT3VFLFNBQVAsSUFBb0IsWUFBeEIsRUFBc0M7QUFDbEMsWUFBSUMsVUFBVXhFLE9BQU95RSxZQUFQLENBQW9CLFVBQXBCLENBQWQ7QUFDQSxZQUFJQyxhQUFhN0ksRUFBRSxJQUFGLEVBQ1pzRixNQURZLEdBRVo3QyxJQUZZLENBRVAsZUFGTyxDQUFqQjtBQUdBLFlBQUlxRyxXQUFXOUksRUFBRSxJQUFGLEVBQ1ZzRixNQURVLEdBRVY3QyxJQUZVLENBRUwsYUFGSyxDQUFmO0FBR0EsYUFBSyxJQUFJc0csSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxTQUFTbkksTUFBN0IsRUFBcUNvSSxHQUFyQyxFQUEwQztBQUN0Q0QscUJBQVNDLENBQVQsRUFBWUMsU0FBWixDQUFzQm5FLE1BQXRCLENBQTZCLFdBQTdCO0FBQ0g7QUFDRFYsZUFBTzZFLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLFdBQXJCO0FBQ0EsYUFBSyxJQUFJRixJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFdBQVdsSSxNQUEvQixFQUF1Q29JLEdBQXZDLEVBQTRDO0FBQ3hDLGdCQUFJSixXQUFXSSxDQUFmLEVBQWtCO0FBQ2RGLDJCQUFXRSxDQUFYLEVBQWM5RSxLQUFkLENBQW9CaUYsT0FBcEIsR0FBOEIsT0FBOUI7QUFDSCxhQUZELE1BRU87QUFDSEwsMkJBQVdFLENBQVgsRUFBYzlFLEtBQWQsQ0FBb0JpRixPQUFwQixHQUE4QixNQUE5QjtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUdEOzs7O0FBSUE7QUFDQSxTQUFTQyxNQUFULENBQWdCdkgsSUFBaEIsRUFBc0I7QUFDbEIsUUFBSUEsT0FBT0EsUUFBUSwwQkFBbkI7QUFDQSxRQUFJd0gsZ0JBQWdCcEosRUFBRSxPQUFGLEVBQVdNLFFBQVgsQ0FBb0IsUUFBcEIsQ0FBcEI7QUFDQSxRQUFJK0ksY0FBY3JKLEVBQUUsOEJBQUYsRUFBa0NNLFFBQWxDLENBQ2QsZ0NBRGMsQ0FBbEI7QUFHQThJLGtCQUFjRSxRQUFkLENBQXVCdEosRUFBRSxNQUFGLENBQXZCO0FBQ0FvSixrQkFBY3hILElBQWQsQ0FBbUJBLElBQW5CO0FBQ0F5SCxnQkFBWUMsUUFBWixDQUFxQkYsYUFBckI7O0FBRUFHLFFBQUksWUFBVztBQUNYSCxzQkFBYzlJLFFBQWQsQ0FBdUIsV0FBdkI7QUFDSCxLQUZEOztBQUlBa0osZUFBVyxZQUFXO0FBQ2xCSixzQkFBYzdJLFdBQWQsQ0FBMEIsV0FBMUI7QUFDSCxLQUZELEVBRUcsSUFGSDs7QUFJQWlKLGVBQVcsWUFBVztBQUNsQkosc0JBQWN2RSxNQUFkO0FBQ0gsS0FGRCxFQUVHLElBRkg7O0FBSUE3RSxNQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG1CQUF4QixFQUE2QyxZQUFXO0FBQ3BEa0osc0JBQWM3SSxXQUFkLENBQTBCLFdBQTFCO0FBQ0FpSixtQkFBVyxZQUFXO0FBQ2xCSiwwQkFBY3ZFLE1BQWQ7QUFDSCxTQUZELEVBRUcsR0FGSDtBQUdILEtBTEQ7QUFNSDs7QUFFRDtBQUNBLFNBQVMwRSxHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDYnhKLFdBQU95SixxQkFBUCxDQUE2QixZQUFXO0FBQ3BDekosZUFBT3lKLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsU0FGRDtBQUdILEtBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKFxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWInKTtcbiAgICB9XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG59KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljLFxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBzZWxlY3QnKTtcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic29ydGluZy1pY29uIHNvcnRpbmctaWNvbi0tJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2hhbmdlIGZvcm0gdGl0bGVcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWZvcm0tdGl0bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XG5cbiAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxuICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxuICAgICAgICAgICAgLnRleHQodGV4dCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xuICAgIH0pO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4JyB9LCAzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xuICAgIH1cblxuICAgIC8vSGFtYnVyZ2VyIGJ0blxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxuICAgICAgICAgICAgICAgICcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdydcbiAgICAgICAgICAgICkubGVuZ3RoXG4gICAgICAgIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIC8vTW9iaWxlIE5hdlxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xuXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCh0aXRsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcblxuICAgICAgICBzZWFyY2hCdG5TaG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgODUpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXG4gICAgICAgICAgICAuaGlkZSgpO1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1Nob3cgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgfSk7XG4gICAgLy9IaWRlIFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnByZXYoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgIH0pO1xuXG4gICAgLy9idG4gZmF2b3JpdGVcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICogQ2F0YWxvZy5qc1xuICAgICovXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNvbG9yLWl0ZW0nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcbiAgICAgICAgbGV0IGltZyA9IGl0ZW0uZmluZCgnLnByb2R1Y3QtaXRlbV9faW1hZ2UnKTtcbiAgICBcbiAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQ2hhbmdlclxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9fcmVzZXQnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2pzLXNjcm9sbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxuICAgICAgICAgICAgLnJlc2l6ZSgpO1xuICAgIH1cbiAgICBcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9KTtcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgfSk7XG4gICAgXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG4gICAgaWYgKCQoJy5qcy1zdGlreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5Jywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogODUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAyMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktaW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb21wb25lbnRzLmpzXG4gICAgKi9cblxuICAgIC8vQWNjb3JkZW9uXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBhY2NvcmRlcm9uID0gJCgnLmpzLWFjY29yZGVvbicpO1xuICAgIFxuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW06Zmlyc3QnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICBcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWNjb3JkZXJvbi5oYXNDbGFzcygnbGtfX2FjY29yZGVvbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoJzpmaXJzdCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9jaGVja2JveFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9jaGVja2JveC0tcHNldWRvXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vZHJvcGRvd25cbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqTGsuanNcbiAgICAqL1xuXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTM1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWJsb2NrX19pbm5lcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG5cbi8qXG4qIFNsaWRlci5qc1xuKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cblxuICAgIC8vU2xpZGVyIE5ld1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TbGlkZXIgQ2FyZFxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICAgIGNhcmRTbGlkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5sZW5ndGggPiAwICYmXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICBtb2RhbFNsaWRlcigpO1xuICAgIH1cblxuICAgIC8vU2xpZGVyIFByb21vXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1NsaWRlciBSZWxhdGVkXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNsaWRlclJlbGF0ZWQoKTtcbiAgICB9XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNsaWRlclJlbGF0ZWRNb2RhbCgpO1xuICAgIH1cbn0pO1xuXG4vL0NhcmRTbGlkZXJGdW5jdGlvblxuZnVuY3Rpb24gY2FyZFNsaWRlcigpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2Jykuc2xpY2soe1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQnLFxuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBtb2RhbFNsaWRlcigpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykuc2xpY2soe1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJykuc2xpY2soe1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnLFxuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG4vL3NsaWRlclJlbGF0ZWRcbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWQoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2xpZGVyUmVsYXRlZE1vZGFsKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogOCxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cblxuLypcbiogQ2FyZC5qc1xuKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy9jYXJkIHByb3BlcnRpZXMgdGFic1xuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLCAuanMtY2FyZC10YWItcmVsYXRlZC0tbW9kYWwnKS50YWJzKCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXJlbGF0ZWQtdGFiJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZC0tbW9kYWwnKVxuICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKVxuICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKVxuICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdGFiJywgdGFicyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdGFiLW1vZGFsJywgdGFicyk7XG4gICAgfVxuXG4gICAgJCgnI3ByZXZpZXcnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5yZXNpemUoKTtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnJlc2l6ZSgpO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cbiAgICBmdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKSB7XG4gICAgICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcblxuICAgICAgICAkKCcuanMtdGFiLCAuanMtdGFiLW1vZGFsJylcbiAgICAgICAgICAgIC51bndyYXAoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKVxuICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcblxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XG5cbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vQ2FyZCBJdGVtIFNlbGVjdFxuICAgIGNoYW5nZUNvbG9yKCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWl0ZW0tc2VsZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QtaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcbiAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAudGV4dCgpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcbiAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcblxuICAgICAgICBpbnB1dC52YWwodGV4dCk7XG4gICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XG5cbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcblxuICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuLy9TZWxlY3QgSXRlbSBjaGFuZ2VDb2xvclxuZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XG4gICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pXG4gICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSk7XG59XG5cbi8vVGFic1xuZnVuY3Rpb24gdGFicyhlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xuICAgICAgICB2YXIgZGF0YVRhYiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XG4gICAgICAgIHZhciB0YWJDb250ZW50ID0gJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnLnRhYl9fY29udGVudCcpO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcudGFiX190aXRsZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKlxuKiBGdW5jdGlvbnMuanNcbiovXG5cbi8vUHVzaFVwXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3B1c2hVcCcpO1xuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuICAgICAgICAncHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuICAgICk7XG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9LCAzNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xufVxuXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuZnVuY3Rpb24gcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4iXX0=
