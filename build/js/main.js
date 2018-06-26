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

    $(document).on('click', '.js-checkbox--pseudo', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
        } else {
            $(this).addClass('is-checked');
        }
    });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImNlbnRlck1vZGUiLCJmb2N1c09uU2VsZWN0IiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImlzIiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2UiLCJhcHBlbmRUbyIsInJhZiIsInNldFRpbWVvdXQiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSJdLCJtYXBwaW5ncyI6Ijs7QUFB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LEtBTEQ7QUFNRDs7QUFFRDtBQUNBLFNBQVNxRixHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDZnJKLFdBQU9zSixxQkFBUCxDQUE2QixZQUFXO0FBQ3RDdEosZUFBT3NKLHFCQUFQLENBQTZCLFlBQVc7QUFDdENEO0FBQ0QsU0FGRDtBQUdELEtBSkQ7QUFLRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcbiAgICB9XG4gICAgbWFpbk9mZnNldCgpO1xuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xuICAgICAgICBmb290ZXJcbiAgICAgICAgICAgIC5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcbiAgICB9XG5cbiAgICAvL0hhbWJ1cmdlciBidG5cbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPVxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcbiAgICAgICAgICAgICAgICAnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnXG4gICAgICAgICAgICApLmxlbmd0aFxuICAgICAgICApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgIC8vTW9iaWxlIE5hdlxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCh0aXRsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICEoXG4gICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcbiAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xuXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcbiAgICAgICAgICAgIC5oaWRlKCk7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICB9KTtcbiAgICAvL0hpZGUgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgfSk7XG5cbiAgICAvL2J0biBmYXZvcml0ZVxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBTbGlkZXIuanNcbiAgICAqL1xuXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuICAgIC8vU2xpZGVyIE5ld1xyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9TbGlkZXIgQ2FyZFxyXG4gICAgaWYgKFxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXHJcbiAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9TbGlkZXIgUHJvbW9cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogOCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXRhbG9nLmpzXG4gICAgKi9cblxuICAgICQoJy5qcy1wcm9kdWN0LWl0ZW0nKVxyXG4gICAgICAgIC5maW5kKCcuY29sb3JfX2l0ZW0nKVxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuICAgICAgICAgICAgbGV0IGltZyA9IGl0ZW0uZmluZCgnLnByb2R1Y3QtaXRlbV9faW1hZ2UnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgIC8vQ2hhbmdlclxyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxyXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKCcuanMtY2hhbmdlcicpXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcclxuICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJylcclxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xyXG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXHJcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2pzLXNjcm9sbCcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0tcHJpY2UnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG4gICAgICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcclxuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuICAgICAgICB2YXIgZW5kUHJpY2U7XHJcbiAgICBcclxuICAgICAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBhbGxQcmljZVN0YXJ0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBbc3RhcnRQcmljZSwgZW5kUHJpY2VdLFxyXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgbWluOiBhbGxQcmljZVN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgbWF4OiBhbGxQcmljZUVuZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XHJcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dCh2YWx1ZXNbaGFuZGxlXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgfSk7XHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG4gICAgfSk7XHJcbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXJkLmpzXG4gICAgKi9cblxuICAgIC8vY2FyZCB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS50YWJzKCk7XG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCgnLmpzLXRhYicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7XG4gICAgfVxuICAgIFxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykucmVzaXplKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy/QotCw0LHRi1xuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xuICAgICAgICAgICAgdmFyIHRhYlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuICAgIFxuICAgICAgICAkKCcuanMtdGFiJylcbiAgICAgICAgICAgIC51bndyYXAoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xuICAgICAgICB0YWJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xuICAgIFxuICAgICAgICB0YWJcbiAgICAgICAgICAgIC5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0YWJcbiAgICAgICAgICAgIC5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuICAgIFxuICAgICAgICB0YWJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX19jb250ZW50JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcbiAgICBcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodGV4dCk7XG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VDb2xvcigpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogQ29tcG9uZW50cy5qc1xuICAgICovXG5cbiAgICAvL0FjY29yZGVvblxyXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLWFjY29yZGVvbicpXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5oYXNDbGFzcygnbGtfX2FjY29yZGVvbicpKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQv9C+0LTRgNC+0LHQvdC10LUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vY2hlY2tib3hcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcclxuICAgIGlmICgkKCcuanMtc3Rpa3ktYmxvY2snKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcclxuICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXHJcbiAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcbiAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXHJcbiAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFxufSk7XG5cbi8qXG4gICAgKiBGdW5jdGlvbnMuanNcbiAgICAqL1xuXG4vL1B1c2hVcFxyXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xyXG4gIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcclxuICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2J6LXB1c2hVcCcpO1xyXG4gIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgJ2J6LXB1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcclxuICApO1xyXG4gIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XHJcbiAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG4gIHJhZihmdW5jdGlvbigpIHtcclxuICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgfSwgMzUwMCk7XHJcblxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gIH0sIDQwMDApO1xyXG5cclxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICBmbigpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXG4iXX0=
