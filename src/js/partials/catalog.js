$('.js-product-item').find('.color__item').on('click', function(e) {
	let item = $(this).closest('.js-product-item');
	let color = $(this).data('color');
	let img = item.find('.product-item__image');

	img.attr('src', color);
	e.preventDefault();
});