// при нажатии на фото в каталоге
$(document).on('click', '.js-ajax-open-preview', function (e) {

    e.stopPropagation();
    var productID = $(this).prev().find('.js-btn-fav').data('favorite');
    var arrNextPrev = $('#nextPrev').text();
    var nextPrev = JSON.parse("[" + arrNextPrev + "]");
    // console.log(nextPrev);

    // Validate data
    $.ajax({
        method: 'POST',
        url: '/ajaxOpenPreviewProduct',
        data: {
            productID: productID,
            nextPrev: nextPrev,
            cityAlias: cityAlias,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('#preview').html(response.html);
            $('#preview').modal();
            modalSlider();
            sliderRelatedModal();
            changeColor();
            $('.js-card-tab-related--modal').tabs();
        }
    });

    e.preventDefault();

});

// при нажатии на фото в каталоге
$(document).on('click', '.js-ajax-open-preview-in-mobile', function (e) {

    e.stopPropagation();
    var productID = $(this).parent().find('.js-btn-fav').data('favorite');
    var arrNextPrev = $('#nextPrev').text();
    var nextPrev = JSON.parse("[" + arrNextPrev + "]");
    // console.log(nextPrev);

    // Validate data
    $.ajax({
        method: 'POST',
        url: '/ajaxOpenPreviewProduct',
        data: {
            productID: productID,
            nextPrev: nextPrev,
            cityAlias: cityAlias,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('#preview').html(response.html);
            $('#preview').modal();
            modalSlider();
            sliderRelatedModal();
            changeColor();
            $('.js-card-tab-related--modal').tabs();
        }
    });

    e.preventDefault();

});

// при нажатии на кнопку подробнее
$(document).on('click', '.js-ajax-open-preview-button', function (e) {

    var productID = $(this).parent().parent().prev().prev().find('.js-btn-fav').data('favorite');
    var arrNextPrev = $('#nextPrev').text();
    var nextPrev = JSON.parse("[" + arrNextPrev + "]");
    // console.log(nextPrev);

    // Validate data
    $.ajax({
        method: 'POST',
        url: '/ajaxOpenPreviewProduct',
        data: {
            productID: productID,
            cityAlias: cityAlias,
            nextPrev: nextPrev,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('#preview').html(response.html);
            $('#preview').modal();
            modalSlider();
            sliderRelatedModal();
            changeColor();
            $('.js-card-tab-related--modal').tabs();
        }
    });

    e.preventDefault();
});

// при нажатии на фото в подробной карточке и превью
$(document).on('click', '.js-ajax-open-preview-in-preview', function (e) {

    var productID = $(this).data('product');
    var arrNextPrev = $('#nextPrev').text();
    var nextPrev = JSON.parse("[" + arrNextPrev + "]");
    // console.log(nextPrev);

    // Validate data
    $.ajax({
        method: 'POST',
        url: '/ajaxOpenPreviewProduct',
        data: {
            productID: productID,
            cityAlias: cityAlias,
            nextPrev: nextPrev,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('#preview').html(response.html);
            $('#preview').modal();
            modalSlider();
            sliderRelatedModal();
            changeColor();
            $('.js-card-tab-related--modal').tabs();
        }
    });
    e.preventDefault();
});






