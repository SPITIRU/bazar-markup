$(document).ready(function () {

    var countItems = 0;
    if ($('.card-services__items').length > 0) {

        var Services = $('.card-services__items').children('.js-bb-accordeon').children('.bb-accordeon__item');
        // var countServices = Services.length;
        Services.filter(':first').addClass('is-open');
        Services.filter(':first').children('.bb-accordeon__content').css('display', 'block');
    }

    if ($('.lk-service__inner').length > 0) {
        var ServicesLk = $('.lk-service__inner').children('.js-bb-accordeon').children('.bb-accordeon__item');
        ServicesLk.filter(':first').addClass('is-open');
        ServicesLk.filter(':first').children('.bb-accordeon__content').css('display', 'block');
    }

    if ($('.profile-editor__inner').length > 0) {
        var ServicesLk = $('.profile-editor__inner').children('.js-bb-accordeon').children('.bb-accordeon__item');
        ServicesLk.filter(':first').addClass('is-open');
        ServicesLk.filter(':first').children('.bb-accordeon__content').css('display', 'block');
    }

    if ($('.js-reviewsContent').length > 0) {

        $('.js-reviewsContent').on('click', function () {

            $('.js-reviews__message').each(function () {
                countItems++;
            });
            $.ajax({
                method: 'POST',
                url: '/ajaxAddReviews',
                data: {
                    userID: $(this).data('id'),
                    skip: countItems,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    if (response.html == "") {
                        $('.js-reviewsContent').parent().remove();
                    } else {
                        $('.reviews__messages').append(response.html);
                    }
                }
            });

            return countItems = 0;
        });

    }

    if ($('.js-review--add').length > 0) {

        $('.js-review--add').on('click', function () {
            var stars = $("input[name='rating']:checked").val();
            var message = $('#js-review-message').val();
            var toUser = $('.reviews__header').data('to');
            var fromUser = $('.reviews__header').data('from');
            var cityAlias = $('.reviews__header').data('cityAlias');

            if(stars == null || message == ""){
                console.log('Введите данные');
            }else{

                $.ajax({
                    method: 'POST',
                    url: '/ajaxNewReviews',
                    data: {
                        stars: stars,
                        message: message,
                        toUserID: toUser,
                        fromUserID: fromUser,
                        cityAlias: cityAlias,
                        active: 0,
                        _token: token
                    }
                }).done(function (response) {
                    if (response.success === true) {
                        $('.review-add').addClass(' is-success');
                    } else {

                    }
                });
            }
        });
    }

    if ($('.js-registerFB').length > 0){
        $('.js-registerFB').on('click', function () {
            fbq.push(['track','Lead',{ content_name: 'Создать нового пользователя'}]);
        });
    }

    if ($('.changer__reset').length > 0) {
        $('.changer__reset').on('click', function (e) {

            var nameFilter = '';
            var nameType = '';
            var nameTypeAlias = '';
            if(location.pathname.split('/')[1]){
                nameFilter = location.pathname.split('/')[1];
                if (location.pathname.split('/')[2]) {
                    nameType = location.pathname.split('/')[2];
                }
                if (nameFilter === 'furniture') {
                    if (location.pathname.split('/')[3]) {
                        nameTypeAlias = location.pathname.split('/')[3];
                    }
                }
            }

            if (nameTypeAlias === '') {
                document.location.href = location.origin+'/'+nameFilter;
            } else {
                document.location.href = location.origin+'/'+nameFilter+'/'+nameType+'/'+nameTypeAlias;
            }

            e.preventDefault();
        });
    }
    $(document).on('click', '.js-color-item', function (e) {
        var item = $(this).closest('.js-product-item');
        var productID = $(this).data('colorid');
        var img = item.find('.product-slider__list');
        var productAddToCardID = $(this).parent().parent().parent().find('.js-product-add-to-cart');

        $.ajax({
            method: 'POST',
            url: '/ajaxSliderProduct',
            data: {
                productID: productID,
                _token: token
            }
        }).done(function (response) {
            if (response.success === true ) {
                item.attr('data-product', productID);
                productAddToCardID.attr('data-id', productID);
                item.find('.js-btn-fav').remove();
                img.html(response.html);
                item.find('.js-ajax-favorite').append(response.favoriteBtn);
                item.find('.js-title').text(response.title);
                item.find('.js-articul').text(response.artColor);
            }
        });


        e.preventDefault();
    });

    if ($('.catalog-filter__cloth').length > 0) {
        var cloth__item = $(document).find('.cloth__item');
        var valueCount = 0;
        cloth__item.each(function( index){
            var cloth__child = cloth__item[index].getElementsByTagName('li');
                var arr = [];
                [].push.apply(arr, cloth__child);
                $.each(arr,function(index,value){
                    valueCount = +valueCount + +value.dataset.count;
                });
            cloth__item[index].getElementsByClassName('cloth__count')[0].innerHTML = +valueCount + +cloth__item[index].dataset.count;
            valueCount = 0;
        });
    }
});