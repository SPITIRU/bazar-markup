//Sticky Block https://github.com/abouolia/sticky-sidebar
if ($('.js-stiky-block').length > 0 && $(window).width() > 768) {
    var sidebar = new StickySidebar('.js-stiky-block', {
        topSpacing: 135,
        bottomSpacing: 10,
        containerSelector: '.stiky-content',
        innerWrapperSelector: '.stiky-block__inner'
    });
}
