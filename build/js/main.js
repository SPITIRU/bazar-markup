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
        if ($('.js-accordeon').hasClass('lk__accordeon')) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsIm5vdCIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImlzIiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2UiLCJhcHBlbmRUbyIsInJhZiIsInNldFRpbWVvdXQiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSJdLCJtYXBwaW5ncyI6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QUFDcEIsUUFBSUEsT0FBT0EsUUFBUSwwQkFBbkI7QUFDQSxRQUFJc0YsZ0JBQWdCcEosRUFBRSxPQUFGLEVBQVd5QyxRQUFYLENBQW9CLFdBQXBCLENBQXBCO0FBQ0EsUUFBSTRHLGNBQWNySixFQUFFLDhCQUFGLEVBQWtDeUMsUUFBbEMsQ0FDaEIsbUNBRGdCLENBQWxCO0FBR0EyRyxrQkFBY0UsUUFBZCxDQUF1QnRKLEVBQUUsTUFBRixDQUF2QjtBQUNBb0osa0JBQWN0RixJQUFkLENBQW1CQSxJQUFuQjtBQUNBdUYsZ0JBQVlDLFFBQVosQ0FBcUJGLGFBQXJCOztBQUVBRyxRQUFJLFlBQVc7QUFDYkgsc0JBQWMzRyxRQUFkLENBQXVCLFdBQXZCO0FBQ0QsS0FGRDs7QUFJQStHLGVBQVcsWUFBVztBQUNwQkosc0JBQWMvSSxXQUFkLENBQTBCLFdBQTFCO0FBQ0QsS0FGRCxFQUVHLElBRkg7O0FBSUFtSixlQUFXLFlBQVc7QUFDcEJKLHNCQUFjbkYsTUFBZDtBQUNELEtBRkQsRUFFRyxJQUZIOztBQUlBakUsTUFBRUMsUUFBRixFQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixtQkFBeEIsRUFBNkMsWUFBVztBQUN0RGdKLHNCQUFjL0ksV0FBZCxDQUEwQixXQUExQjtBQUNBbUosbUJBQVcsWUFBVztBQUNwQkosMEJBQWNuRixNQUFkO0FBQ0QsU0FGRCxFQUVHLEdBRkg7QUFHRCxLQUxEO0FBTUQ7O0FBRUQ7QUFDQSxTQUFTc0YsR0FBVCxDQUFhRSxFQUFiLEVBQWlCO0FBQ2Z0SixXQUFPdUoscUJBQVAsQ0FBNkIsWUFBVztBQUN0Q3ZKLGVBQU91SixxQkFBUCxDQUE2QixZQUFXO0FBQ3RDRDtBQUNELFNBRkQ7QUFHRCxLQUpEO0FBS0QiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwIHx8ICQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICc5OS05OS05OTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xuICAgIH0pO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4JyB9LCAzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW0nKS5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJykud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XG4gICAgfVxuXG4gICAgLy9IYW1idXJnZXIgYnRuXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xuICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAvL01vYmlsZSBOYXZcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xuXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSlcbiAgICAgICAgICAgICAgICAgICAgLnRleHQodGl0bGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAhKFxuICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXG4gICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcblxuICAgICAgICBzZWFyY2hCdG5TaG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgODUpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXG4gICAgICAgICAgICAuaGlkZSgpO1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1Nob3cgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgfSk7XG4gICAgLy9IaWRlIFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnByZXYoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgIH0pO1xuXG4gICAgLy9idG4gZmF2b3JpdGVcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICogU2xpZGVyLmpzXG4gICAgKi9cblxuICAgIC8vIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgLy9TbGlkZXIgTmV3XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgQ2FyZFxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIFByb21vXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENhdGFsb2cuanNcbiAgICAqL1xuXG4gICAgJCgnLmpzLXByb2R1Y3QtaXRlbScpXHJcbiAgICAgICAgLmZpbmQoJy5jb2xvcl9faXRlbScpXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgLy9DaGFuZ2VyXHJcbiAgICAkKCcuanMtY2hhbmdlcicpXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICQoJy5qcy1jaGFuZ2VyJylcclxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxyXG4gICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKVxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcclxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG4gICAgICAgIHZhciBzdGFydFByaWNlO1xyXG4gICAgICAgIHZhciBlbmRQcmljZTtcclxuICAgIFxyXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xyXG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHZhbHVlc1toYW5kbGVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB9KTtcclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICB9KTtcclxuICAgIFxuXG4gICAgLypcbiAgICAqIENhcmQuanNcbiAgICAqL1xuXG4gICAgLy9jYXJkIHRhYnNcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLnRhYnMoKTtcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgIC5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcbiAgICAgICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIGlmICgkKCcuanMtdGFiJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YWJzKTtcbiAgICB9XG4gICAgXG4gICAgJCgnI3ByZXZpZXcnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5yZXNpemUoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Ci0LDQsdGLXG4gICAgZnVuY3Rpb24gdGFicyhlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YWJfX3RpdGxlJykge1xuICAgICAgICAgICAgdmFyIGRhdGFUYWIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy90YWJzIC0tLT4gYWNjb3JkZW9uXG4gICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XG4gICAgXG4gICAgICAgICQoJy5qcy10YWInKVxuICAgICAgICAgICAgLnVud3JhcCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XG4gICAgICAgIHRhYlxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX3RpdGxlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJylcbiAgICAgICAgICAgIC53cmFwKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uX19pdGVtXCI+Jyk7XG4gICAgXG4gICAgICAgIHRhYlxuICAgICAgICAgICAgLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIHRhYlxuICAgICAgICAgICAgLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XG4gICAgXG4gICAgICAgIHRhYlxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0Jykubm90KCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tcGx1cycpLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLW1pbnVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xuICAgIFxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUNvbG9yKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb21wb25lbnRzLmpzXG4gICAgKi9cblxuICAgIC8vQWNjb3JkZW9uXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykuaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKkxrLmpzXG4gICAgKi9cblxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xyXG4gICAgICAgIHRvcFNwYWNpbmc6IDEzNSxcclxuICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcclxuICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcclxuICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1ibG9ja19faW5uZXInXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXG59KTtcblxuLypcbiAgICAqIEZ1bmN0aW9ucy5qc1xuICAgICovXG5cbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcCh0ZXh0KSB7XHJcbiAgdmFyIHRleHQgPSB0ZXh0IHx8ICfQotC+0LLQsNGAINC00L7QsdCw0LLQu9C10L0g0LIg0LrQvtGA0LfQuNC90YMnO1xyXG4gIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnYnotcHVzaFVwJyk7XHJcbiAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAnYnotcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xyXG4gICk7XHJcbiAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcclxuXHJcbiAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICB9LCAzNTAwKTtcclxuXHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgfSwgNDAwMCk7XHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9KTtcclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZuKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cbiJdfQ==
