//PushUp
function pushUp(text) {
    var text = text || 'Товар добавлен в корзину';
    var pushContainer = $('<div>').addClass('pushUp');
    var pushUpClose = $('<i class="fal fa-times"></i>').addClass(
        'pushUp__close js-pushUp--close'
    );
    pushContainer.appendTo($('body'));
    pushContainer.text(text);
    pushUpClose.appendTo(pushContainer);

    raf(function() {
        pushContainer.addClass('is-active');
    });

    setTimeout(function() {
        pushContainer.removeClass('is-active');
    }, 3500);

    setTimeout(function() {
        pushContainer.remove();
    }, 4000);

    $(document).on('click', '.js-pushUp--close', function() {
        pushContainer.removeClass('is-active');
        setTimeout(function() {
            pushContainer.remove();
        }, 300);
    });
}

//RequestAnimationFrame
function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
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
        responsive: [
            {
                breakpoint: 481,
                settings: {
                    dots: true,
                    fade: false
                }
            }
        ]
    });
    $('.js-bz-slider--card-nav').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.js-bz-slider--card',
        dots: true,
        // centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    centerMode: false
                }
            },
            {
                breakpoint: 481,
                settings: 'unslick'
            }
        ]
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
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
}

//Select Item changeColor
function changeColor() {
    $('.js-item-select')
        .each(function() {
            var colorBox = $(this).find('.item-select__color');
            var color = colorBox.data('item-select-color');
            colorBox.css('background-color', color);
        })
        .find('.item-select__item')
        .each(function() {
            var colorBox = $(this).find('.item-select__color');
            var color = colorBox.data('item-select-color');
            colorBox.css('background-color', color);
        });
}
