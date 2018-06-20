'use strict';

//Search Hint
if ($('.js-search-input').length > 0) {
    var searchInput = $('.js-search-input');
    searchInput.on('keyup', function () {
        var hint = $(this).closest('.js-search').find('.search__hint');
        if ($(this).val() != '') {
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    });
}

//Card Adress Map
if ($('#card-map').length > 0) {
    var init = function init() {
        myMap = new ymaps.Map('card-map', {
            center: [55.73226853, 37.62091910],
            zoom: 16
        });

        myMap.behaviors.disable(['scrollZoom']);

        myMap.controls.remove('searchControl').remove('typeSelector').add('routeEditor');

        myPin = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/general/map-pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });

        myPlacemark = new ymaps.Placemark([55.73226853, 37.62091910], {
            balloonContentHeader: '<span class="map-pin__title">Nailz X Collab</span>',
            balloonContentBody: '<span class="map-pin__place">ул. Большая Полянка, 51А/9, Московский р-н</span> <div class="map-pin__properties"><ul class="properties__list"><li class="properties__item properties__item_sale bb-dropdown top bb-dropdown--hover js-bb-dropdown"> <svg class="icon icon-procent "><use xlink:href="img/sprite.svg#procent"></use></svg><div class="bb-dropdown__list">есть скидки</div></li><li class="properties__item properties__item_car bb-dropdown top bb-dropdown--hover js-bb-dropdown"> <svg class="icon icon-car "><use xlink:href="img/sprite.svg#car"></use></svg><div class="bb-dropdown__list">могу приехать</div></li></ul></div>',
            hintContent: '<div class="map-pin__hover">1-комнатная квартира <div class="rating"><div class="rating__inner" style="width: 90%"></div></div> <span>от 2 800 <i class="rub">a</i></span> </div>'
        });

        myPin.add(myPlacemark);
        myMap.geoObjects.add(myPin);
    };

    ymaps.ready(init);
    var myMap, myPlacemark, myPin;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbC5qcyJdLCJuYW1lcyI6WyIkIiwibGVuZ3RoIiwic2VhcmNoSW5wdXQiLCJvbiIsImhpbnQiLCJjbG9zZXN0IiwiZmluZCIsInZhbCIsInJlbW92ZUF0dHIiLCJjc3MiLCJpbml0IiwibXlNYXAiLCJ5bWFwcyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJiZWhhdmlvcnMiLCJkaXNhYmxlIiwiY29udHJvbHMiLCJyZW1vdmUiLCJhZGQiLCJteVBpbiIsIkdlb09iamVjdENvbGxlY3Rpb24iLCJpY29uTGF5b3V0IiwiaWNvbkltYWdlSHJlZiIsImljb25JbWFnZVNpemUiLCJpY29uSW1hZ2VPZmZzZXQiLCJteVBsYWNlbWFyayIsIlBsYWNlbWFyayIsImJhbGxvb25Db250ZW50SGVhZGVyIiwiYmFsbG9vbkNvbnRlbnRCb2R5IiwiaGludENvbnRlbnQiLCJnZW9PYmplY3RzIiwicmVhZHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFJQSxFQUFFLGtCQUFGLEVBQXNCQyxNQUF0QixHQUErQixDQUFuQyxFQUFzQztBQUNsQyxRQUFJQyxjQUFjRixFQUFFLGtCQUFGLENBQWxCO0FBQ0FFLGdCQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFZO0FBQ2hDLFlBQUlDLE9BQU9KLEVBQUUsSUFBRixFQUFRSyxPQUFSLENBQWdCLFlBQWhCLEVBQThCQyxJQUE5QixDQUFtQyxlQUFuQyxDQUFYO0FBQ0EsWUFBSU4sRUFBRSxJQUFGLEVBQVFPLEdBQVIsTUFBaUIsRUFBckIsRUFBeUI7QUFDckJILGlCQUFLSSxVQUFMLENBQWdCLE9BQWhCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hKLGlCQUFLSyxHQUFMLENBQVMsU0FBVCxFQUFvQixNQUFwQjtBQUNIO0FBQ0osS0FQRDtBQVFIOztBQUVEO0FBQ0EsSUFBSVQsRUFBRSxXQUFGLEVBQWVDLE1BQWYsR0FBd0IsQ0FBNUIsRUFBK0I7QUFBQSxRQU1sQlMsSUFOa0IsR0FNM0IsU0FBU0EsSUFBVCxHQUFnQjtBQUNaQyxnQkFBUSxJQUFJQyxNQUFNQyxHQUFWLENBQWMsVUFBZCxFQUEwQjtBQUM5QkMsb0JBQVEsQ0FBQyxXQUFELEVBQWMsV0FBZCxDQURzQjtBQUU5QkMsa0JBQU07QUFGd0IsU0FBMUIsQ0FBUjs7QUFLQUosY0FBTUssU0FBTixDQUFnQkMsT0FBaEIsQ0FBd0IsQ0FBQyxZQUFELENBQXhCOztBQUVBTixjQUFNTyxRQUFOLENBQ0tDLE1BREwsQ0FDWSxlQURaLEVBRUtBLE1BRkwsQ0FFWSxjQUZaLEVBR0tDLEdBSEwsQ0FHUyxhQUhUOztBQUtBQyxnQkFBUSxJQUFJVCxNQUFNVSxtQkFBVixDQUE4QixFQUE5QixFQUFrQztBQUN0Q0Msd0JBQVksZUFEMEI7QUFFdENDLDJCQUFlLHlCQUZ1QjtBQUd0Q0MsMkJBQWUsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUh1QjtBQUl0Q0MsNkJBQWlCLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBQyxFQUFOO0FBSnFCLFNBQWxDLENBQVI7O0FBT0FDLHNCQUFjLElBQUlmLE1BQU1nQixTQUFWLENBQW9CLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FBcEIsRUFBZ0Q7QUFDMURDLGtDQUFzQixvREFEb0M7QUFFMURDLGdDQUFvQixtbkJBRnNDO0FBRzFEQyx5QkFBYTtBQUg2QyxTQUFoRCxDQUFkOztBQU1BVixjQUFNRCxHQUFOLENBQVVPLFdBQVY7QUFDQWhCLGNBQU1xQixVQUFOLENBQWlCWixHQUFqQixDQUFxQkMsS0FBckI7QUFDSCxLQWxDMEI7O0FBQzNCVCxVQUFNcUIsS0FBTixDQUFZdkIsSUFBWjtBQUNBLFFBQUlDLEtBQUosRUFDSWdCLFdBREosRUFFSU4sS0FGSjtBQWlDSCIsImZpbGUiOiJkZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1NlYXJjaCBIaW50XHJcbmlmICgkKCcuanMtc2VhcmNoLWlucHV0JykubGVuZ3RoID4gMCkge1xyXG4gICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xyXG4gICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vQ2FyZCBBZHJlc3MgTWFwXHJcbmlmICgkKCcjY2FyZC1tYXAnKS5sZW5ndGggPiAwKSB7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIHZhciBteU1hcCxcclxuICAgICAgICBteVBsYWNlbWFyayxcclxuICAgICAgICBteVBpbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2FyZC1tYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxMF0sXHJcbiAgICAgICAgICAgIHpvb206IDE2XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKFsnc2Nyb2xsWm9vbSddKTtcclxuXHJcbiAgICAgICAgbXlNYXAuY29udHJvbHNcclxuICAgICAgICAgICAgLnJlbW92ZSgnc2VhcmNoQ29udHJvbCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3R5cGVTZWxlY3RvcicpXHJcbiAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XHJcblxyXG4gICAgICAgIG15UGluID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oe30sIHtcclxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzAsIDQyXSxcclxuICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MTBdLCB7XHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOiAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX190aXRsZVwiPk5haWx6IFggQ29sbGFiPC9zcGFuPicsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50Qm9keTogJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fcGxhY2VcIj7Rg9C7LiDQkdC+0LvRjNGI0LDRjyDQn9C+0LvRj9C90LrQsCwgNTHQkC85LCDQnNC+0YHQutC+0LLRgdC60LjQuSDRgC3QvTwvc3Bhbj4gPGRpdiBjbGFzcz1cIm1hcC1waW5fX3Byb3BlcnRpZXNcIj48dWwgY2xhc3M9XCJwcm9wZXJ0aWVzX19saXN0XCI+PGxpIGNsYXNzPVwicHJvcGVydGllc19faXRlbSBwcm9wZXJ0aWVzX19pdGVtX3NhbGUgYmItZHJvcGRvd24gdG9wIGJiLWRyb3Bkb3duLS1ob3ZlciBqcy1iYi1kcm9wZG93blwiPiA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXByb2NlbnQgXCI+PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjcHJvY2VudFwiPjwvdXNlPjwvc3ZnPjxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fbGlzdFwiPtC10YHRgtGMINGB0LrQuNC00LrQuDwvZGl2PjwvbGk+PGxpIGNsYXNzPVwicHJvcGVydGllc19faXRlbSBwcm9wZXJ0aWVzX19pdGVtX2NhciBiYi1kcm9wZG93biB0b3AgYmItZHJvcGRvd24tLWhvdmVyIGpzLWJiLWRyb3Bkb3duXCI+IDxzdmcgY2xhc3M9XCJpY29uIGljb24tY2FyIFwiPjx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2NhclwiPjwvdXNlPjwvc3ZnPjxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fbGlzdFwiPtC80L7Qs9GDINC/0YDQuNC10YXQsNGC0Yw8L2Rpdj48L2xpPjwvdWw+PC9kaXY+JyxcclxuICAgICAgICAgICAgaGludENvbnRlbnQ6ICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faG92ZXJcIj4xLdC60L7QvNC90LDRgtC90LDRjyDQutCy0LDRgNGC0LjRgNCwIDxkaXYgY2xhc3M9XCJyYXRpbmdcIj48ZGl2IGNsYXNzPVwicmF0aW5nX19pbm5lclwiIHN0eWxlPVwid2lkdGg6IDkwJVwiPjwvZGl2PjwvZGl2PiA8c3Bhbj7QvtGCIDIgODAwIDxpIGNsYXNzPVwicnViXCI+YTwvaT48L3NwYW4+IDwvZGl2PidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn0iXX0=
