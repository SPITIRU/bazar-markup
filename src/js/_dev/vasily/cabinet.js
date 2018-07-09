$(document).ready(function () {

    // Ограничение имени по длине
    var maxLenForName = 30;

    if ($('.js-profile__name').length > 0) {
        var number = $(".js-profile__name").val().length;
        number = maxLenForName - number;
        $(".js-countForName").html(+number);

        $('.js-profile__name').keyup( function(){
            var $this = $(this);

            if($this.val().length > maxLenForName)
                $this.val($this.val().substr(0, maxLenForName));

            var number = $(".js-profile__name").val().length;
            number = maxLenForName - number;

            $(".js-countForName").html(+number);
        });
    }



    // Валидация e-mail
    $('.js-profile__email').blur(function() {
        if($(this).val() != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test($(this).val())){
                $(this).css({'border' : '1px solid #569b44'});
            } else {
                $(this).css({'border' : '1px solid #ff0000'});
                $('.valid').text('E-mail введен не верно');
            }
        }
        // else {
        //     $(this).css({'border' : '1px solid #ff0000'});
        //     $('.valid').text('Поле email не должно быть пустым');
        // }
    });

    if ($('.js-ajax-logout').length > 0) {
        $('.js-ajax-logout').on('click', function () {
                $.ajax({
                    method: 'POST',
                    url: '/ajaxLogout',
                    data: {
                        _token: token
                    }
                }).done(function (response) {
                    if (response.success === true ) {
                        var route = response.route;
                        location.replace(route);
                    }
                });
        })
    }

    if ($('.js-master').length > 0) {

        $('.js-master').on('click', function () {
            var userID = $(this).data('user');

            $.ajax({
                method: 'POST',
                url: '/ajaxGetMaster',
                data: {
                    userID: userID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    window.location.href = response.cabinetMaster;
                }
            });
        });
    }

    if ($('.js-master-page').length > 0) {

        $('.js-master-page').on('click', function () {

            $.ajax({
                method: 'POST',
                url: '/ajaxPageMaster',
                data: {
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true ) {
                    var route = response.route;
                    location.replace(route);
                }
            });
        });
    }

    // Ограничение имени по длине
    var maxLenForTextarea = 300;
    var maxLenForTextareaEducation = 500;

    if($('.js-profile-editor').length > 0){
        var number = $(".js-profile__name").val().length;
        number = maxLenForTextarea - number;
        $(".js-countForTextarea").html(+number);
    }

    $('.js-profile-editor').keyup( function(){
        var $this = $(this);

        if($this.val().length > maxLenForTextarea)
            $this.val($this.val().substr(0, maxLenForTextarea));

        var number = $(".js-profile-editor").val().length;
        number = maxLenForTextarea - number;

        $(".js-countForTextarea").html(+number);

    });

    if($('.js-profile-editor2').length > 0){
        var number = $(".js-profile__name").val().length;
        number = maxLenForTextareaEducation - number;
        $(".js-countForTextarea2").html(+number);
    }

    $('.js-profile-editor2').keyup( function(){
        var $this = $(this);

        if($this.val().length > maxLenForTextareaEducation)
            $this.val($this.val().substr(0, maxLenForTextareaEducation));

        var number = $(".js-profile-editor2").val().length;
        number = maxLenForTextareaEducation - number;

        $(".js-countForTextarea2").html(+number);

    });




});