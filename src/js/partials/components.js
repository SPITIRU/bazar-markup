//Accordeon
if ($('.js-accordeon').length > 0) {
    let accorderon = $('.js-accordeon');

    accorderon
        .find('.accordeon__item')
        .not(':first')
        .find('.accordeon__content')
        .slideUp();
    accorderon
        .find('.accordeon__item:first')
        .addClass('is-open')
        .find('.accordeon__content')
        .slideDown();

    $(document).on('click', '.accordeon__title', function() {
        if (
            $(this)
                .parent()
                .hasClass('is-open')
        ) {
            $(this)
                .parent()
                .removeClass('is-open')
                .find('.accordeon__content')
                .slideUp();
        } else {
            $(this)
                .parent()
                .addClass('is-open')
                .find('.accordeon__content')
                .slideDown();
        }
    });
    if (accorderon.hasClass('lk__accordeon')) {
        $(this)
            .find('.accordeon__item')
            .filter(':first')
            .removeClass('is-open')
            .find('.accordeon__content')
            .slideUp();
        $(this)
            .find('.accordeon__title')
            .on('click', function() {
                if (
                    $(this)
                        .parent()
                        .hasClass('is-open')
                ) {
                    $(this)
                        .find('.user-order__info')
                        .text('подробнее');
                } else {
                    $(this)
                        .find('.user-order__info')
                        .text('скрыть');
                }
            });
    }
}

//checkbox
$(document).on('click', '.js-checkbox', function() {
    if (
        $(this)
            .find('input')
            .is(':checked')
    ) {
        $(this).addClass('is-checked');
    } else {
        $(this).removeClass('is-checked');
    }
});

//checkbox--pseudo
$(document).on('click', '.js-checkbox--pseudo', function() {
    if ($(this).hasClass('is-checked')) {
        $(this).removeClass('is-checked');
    } else {
        $(this).addClass('is-checked');
    }
});

//dropdown
if ($('.js-dropdown').length > 0) {
    $(document).on('click', '.js-dropdown', function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
        } else {
            $('.js-dropdown').removeClass('is-active');
            $(this).addClass('is-active');
        }
    });
    $(document).on('click', function(e) {
        if ($(e.target).closest('.js-dropdown').length) return;
        $('.js-dropdown').removeClass('is-active');
        e.stopPropagation();
    });
}
