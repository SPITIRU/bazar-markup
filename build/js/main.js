'use strict';

$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
    });

    // //Custom Select https://select2.org/
    // if ($('.js-select').length > 0) {
    //     $('.js-select').select2({
    //         placeholder: $(this).data('placeholder')
    //     });

    //     $('.js-select--multiple').select2({
    //         tags: true,
    //         placeholder: $(this).data('placeholder')
    //     });

    //     $('.js-select--metro').select2({
    //         placeholder: $(this).data('placeholder'),
    //         templateResult: addUserPic
    //     });
    //     $('.js-select.no-search').select2({
    //         minimumResultsForSearch: -1
    //     });

    //     function addUserPic(opt) {
    //         if (!opt.id) {
    //             return opt.text;
    //         }
    //         var optimage = $(opt.element).data('image');
    //         if (!optimage) {
    //             return opt.text;
    //         } else {
    //             var $opt = $(
    //                 '<span class="metro-icon metro-icon--' + optimage + '">' + $(opt.element).text() + '</span>'
    //                 );
    //             return $opt;
    //         }
    //     };
    //     $(document).click(function (event) {
    //         if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
    //         $('.js-select').select2('close');
    //         event.stopPropagation();
    //     });
    //     $(document).on("focus", '.select2-search__field', function (e) {
    //         e.stopPropagation();
    //     });
    // }

    // //Masked inputmask https://github.com/RobinHerbots/Inputmask
    // if ($('.js-phone-mask').length > 0) {
    //     $('.js-phone-mask').inputmask({
    //         mask: "+7 (999) 999-99-99",
    //         clearIncomplete: true
    //     })
    // }

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

    //Stop drag
    $("img").on("dragstart", function (event) {
        event.preventDefault();
    });

    //Footer media transform accordeon
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
        return false;
    });
    //Mobile Search when click outside
    $(document).click(function (event) {
        if ($(event.target).closest('.js-hamburger, .js-nav-main').length) return;
        $('.js-hamburger').removeClass('on');
        $('.js-nav-main').removeClass('is-open');
        $('.js-overlay').removeClass('is-active');
        event.stopPropagation();
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

    //Slider Promo

    if ($('.js-bz-slider--promo').length > 0) {

        $('.js-bz-slider--promo').slick({

            nextArrow: '.bz-slider__arrow--next',

            prevArrow: '.bz-slider__arrow--prev',

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

    /*
    * Components.js
    */

    //Accordeon

    if ($('.js-accordeon').length > 0) {

        $('.js-accordeon').find('.accordeon__item').find('.accordeon__title').on('click', function () {

            if ($(this).parent().hasClass('is-open')) {

                $(this).parent().removeClass('is-open').find('.accordeon__content').css('display', 'none');
            } else {

                $(this).parent().addClass('is-open').find('.accordeon__content').removeAttr('style');
            }
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
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwiZXZlbnQiLCJ3aWR0aCIsImZvb3RlciIsImZpbmQiLCJhZGRDbGFzcyIsIndyYXBBbGwiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInRhcmdldCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaGFzQ2xhc3MiLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInJlbW92ZUF0dHIiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsIml0ZW0iLCJjb2xvciIsImRhdGEiLCJpbWciXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFZOztBQUUxQkYsTUFBRUcsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFZO0FBQzdCSixVQUFFLE1BQUYsRUFBVUssV0FBVixDQUFzQixTQUF0QjtBQUNILEtBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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eEIsRUFBNENBLElBQTVDLENBQWlELG1CQUFqRCxFQUFzRWYsRUFBdEUsQ0FBeUUsT0FBekUsRUFBa0YsWUFBVTs7QUFFeEYsZ0JBQUdKLEVBQUUsSUFBRixFQUFRMkMsTUFBUixHQUFpQlAsUUFBakIsQ0FBMEIsU0FBMUIsQ0FBSCxFQUF3Qzs7QUFFcENwQyxrQkFBRSxJQUFGLEVBQVEyQyxNQUFSLEdBQWlCdEMsV0FBakIsQ0FBNkIsU0FBN0IsRUFBd0NjLElBQXhDLENBQTZDLHFCQUE3QyxFQUFvRUcsR0FBcEUsQ0FBd0UsU0FBeEUsRUFBbUYsTUFBbkY7QUFFSCxhQUpELE1BSUs7O0FBRUR0QixrQkFBRSxJQUFGLEVBQVEyQyxNQUFSLEdBQWlCdkIsUUFBakIsQ0FBMEIsU0FBMUIsRUFBcUNELElBQXJDLENBQTBDLHFCQUExQyxFQUFpRW9CLFVBQWpFLENBQTRFLE9BQTVFO0FBRUg7QUFFSixTQVpEO0FBY0E7O0FBRUQ7Ozs7QUFJQXZDLE1BQUUsa0JBQUYsRUFBc0JtQixJQUF0QixDQUEyQixjQUEzQixFQUEyQ2YsRUFBM0MsQ0FBOEMsT0FBOUMsRUFBdUQsVUFBU0UsQ0FBVCxFQUFZOztBQUVsRSxZQUFJc0QsT0FBTzVELEVBQUUsSUFBRixFQUFReUIsT0FBUixDQUFnQixrQkFBaEIsQ0FBWDs7QUFFQSxZQUFJb0MsUUFBUTdELEVBQUUsSUFBRixFQUFROEQsSUFBUixDQUFhLE9BQWIsQ0FBWjs7QUFFQSxZQUFJQyxNQUFNSCxLQUFLekMsSUFBTCxDQUFVLHNCQUFWLENBQVY7O0FBSUE0QyxZQUFJbkQsSUFBSixDQUFTLEtBQVQsRUFBZ0JpRCxLQUFoQjs7QUFFQXZELFVBQUVDLGNBQUY7QUFFQSxLQWREO0FBZ0JILENBMVdEOztBQTRXSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICAvLyBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAvLyAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuICAgIC8vICAgICAgICAgdGFnczogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAkKCcuanMtc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG4gICAgLy8gICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpLFxyXG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAvLyAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgLy8gICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcbiAgICAvLyAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuICAgIC8vICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgKyBvcHRpbWFnZSArICdcIj4nICsgJChvcHQuZWxlbWVudCkudGV4dCgpICsgJzwvc3Bhbj4nXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgKTtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIC8vICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0Mi1kcm9wZG93biwgLnNlbGVjdDItY29udGFpbmVyJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xyXG4gICAgLy8gICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICAkKGRvY3VtZW50KS5vbihcImZvY3VzXCIsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIC8vICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIC8vIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAvLyAgICAgICAgIG1hc2s6IFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIsXHJcbiAgICAvLyAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J30sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TdG9wIGRyYWdcclxuICAgICQoXCJpbWdcIikub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7ZXZlbnQucHJldmVudERlZmF1bHQoKX0pO1xyXG5cclxuICAgIC8vRm9vdGVyIG1lZGlhIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbScpLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4nKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgLy9Nb2JpbGUgTmF2XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcclxuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KTsgICAgIFxyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLnByZXYoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKSAgICAgIDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIFNsaWRlci5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xyXG5cclxuICAgIC8vU2xpZGVyIE5ld1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUHJvbW9cclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBDb21wb25lbnRzLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vQWNjb3JkZW9uXHJcblxyXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtYWNjb3JkZW9uJykuZmluZCgnLmFjY29yZGVvbl9faXRlbScpLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdCAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgXHQgICAgfWVsc2V7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICBcdCAgICB9ICAgXHJcblxyXG4gICAgXHR9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ2F0YWxvZy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAkKCcuanMtcHJvZHVjdC1pdGVtJykuZmluZCgnLmNvbG9yX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuXHJcbiAgICBcdGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICBcdGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHRpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG5cclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4gICAgLypcclxuICAgICogRnVuY3Rpb25zLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICJdfQ==
