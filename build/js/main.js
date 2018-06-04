'use strict';

$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        var scrollBar = $('.js-scroll');
        if (scrollBar.length > 0) {
            scrollBar.niceScroll({
                cursorcolor: '#e0e0e0',
                horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                verge: "500",
                cursorwidth: '4px',
                cursorborder: 'none',
                cursorborderradius: '0'
            });
            scrollBar.mouseover(function () {
                $(this).getNiceScroll().resize();
            });
        }
    });

    //Slick Slider https://kenwheeler.github.io/slick/
    if ($('.js-bb-slider').length > 0) {
        $('.js-bb-slider').slick({
            nextArrow: '.bb-slider__arrow--next',
            prevArrow: '.bb-slider__arrow--prev',
            arrows: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: true,
            responsive: [{

                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }

            }, {

                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }

            }, {

                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }

            }]
        });
    }

    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if ($('[data-fancybox]').length > 0) {
        $('[data-fancybox]').fancybox({
            baseClass: 'bb-window__wrap',
            closeClickOutside: true,
            autoFocus: false,
            modal: true,
            touch: false,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    }

    //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        var addUserPic = function addUserPic(opt) {
            if (!opt.id) {
                return opt.text;
            }
            var optimage = $(opt.element).data('image');
            if (!optimage) {
                return opt.text;
            } else {
                var $opt = $('<span class="metro-icon metro-icon--' + optimage + '">' + $(opt.element).text() + '</span>');
                return $opt;
            }
        };

        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select--multiple').select2({
            tags: true,
            placeholder: $(this).data('placeholder')
        });

        $('.js-select--metro').select2({
            placeholder: $(this).data('placeholder'),
            templateResult: addUserPic
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        ;
        $(document).click(function (event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });
        $(document).on("focus", '.select2-search__field', function (e) {
            e.stopPropagation();
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: "+7 (999) 999-99-99",
            clearIncomplete: true
        });
    }

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
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwibW9kYWwiLCJ0b3VjaCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwiYWRkVXNlclBpYyIsIm9wdCIsImlkIiwidGV4dCIsIm9wdGltYWdlIiwiZWxlbWVudCIsImRhdGEiLCIkb3B0Iiwic2VsZWN0MiIsInBsYWNlaG9sZGVyIiwidGFncyIsInRlbXBsYXRlUmVzdWx0IiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJjbGljayIsImV2ZW50IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FB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d0MsR0FBeEM7QUFDSCxLQUhEOztBQUtBO0FBQ0FsRSxNQUFFLFVBQUYsRUFBY3VELEtBQWQsQ0FBb0IsWUFBWTtBQUM1QixZQUFJWSxlQUFlbkUsRUFBRSxJQUFGLEVBQVFvRSxJQUFSLENBQWEsTUFBYixDQUFuQjtBQUNBLFlBQUlDLGNBQWNyRSxFQUFFbUUsWUFBRixFQUFnQkcsTUFBaEIsR0FBeUJDLEdBQTNDO0FBQ0F2RSxVQUFFLFlBQUYsRUFBZ0JpRSxPQUFoQixDQUF3QixFQUFDQyxXQUFXRyxjQUFjLEVBQWQsR0FBbUIsSUFBL0IsRUFBeEIsRUFBOEQsR0FBOUQ7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQUxEOztBQU9BO0FBQ0FyRSxNQUFFLEtBQUYsRUFBU0ksRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBVW9ELEtBQVYsRUFBaUI7QUFBQ0EsY0FBTVEsY0FBTjtBQUF1QixLQUFsRTtBQUVILENBcEpEOztBQXNKSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyNlMGUwZTAnLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogXCI1MDBcIixcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcblxyXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuICAgIGlmICgkKCcuanMtYmItc2xpZGVyJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1iYi1zbGlkZXInKS5zbGljayh7XHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG4gICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGFnczogdHJ1ZSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgKyBvcHRpbWFnZSArICdcIj4nICsgJChvcHQuZWxlbWVudCkudGV4dCgpICsgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0Mi1kcm9wZG93biwgLnNlbGVjdDItY29udGFpbmVyJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImZvY3VzXCIsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J30sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TdG9wIGRyYWdcclxuICAgICQoXCJpbWdcIikub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7ZXZlbnQucHJldmVudERlZmF1bHQoKX0pO1xyXG5cclxufSk7XHJcblxyXG4gICAgLypcclxuICAgICogRnVuY3Rpb25zLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICJdfQ==
