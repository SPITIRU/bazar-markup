$('.js-product-item').find('.color__item').on('click', function(e) {
	let item = $(this).closest('.js-product-item');
	let color = $(this).data('color');
	let img = item.find('.product-item__image');

	img.attr('src', color);
	e.preventDefault();
});

//Changer
$('.js-changer').find('.changer__item').on('click', function() {
	if ($(this).hasClass('is-checked')) {
		return;
	} else {
		$('.js-changer').find('.changer__item').removeClass('is-checked');
		$(this).addClass('is-checked');
		return;
	}
});

$('.js-changer').find('.changer__reset').on('click', function(e) {
	let item = $(this).parent('.changer__item');
	if (item.hasClass('is-checked')){
		item.removeClass('is-checked');
	}
	e.stopPropagation();
});

// document.querySelector('.js-changer').addEventListener('click', cahnger);
// function cahnger(e) {
// 	console.log('click');
// 	var target = e.target;
// 	if (target.className == 'changer__item') {
// 		console.log('test');
// 	}	
// }