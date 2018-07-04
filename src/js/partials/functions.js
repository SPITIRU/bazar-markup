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
