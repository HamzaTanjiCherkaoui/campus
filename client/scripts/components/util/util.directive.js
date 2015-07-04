'use strict';

angular.module('membershipApp')
.directive('myCodeBar', function () {
	return function (scope, element, attr) {
    	attr.$observe('myCodeBar', function(value) {
      		element.barcode(value, 'codabar');
    	})
 	}
})
.directive('mySelect', function () {
	return function (scope, element, attr) {
	    attr.$observe('mySelect', function(value) {
	      element.selectpicker({style: 'btn-' + value, menuStyle: 'dropdown-inverse', noneSelectedText : 'Tous'});
	    })
 	}
})
.directive('myDatePicker', function () {
	return function (scope, element, attr) {
    	element.datepicker({
	      showOtherMonths: true,
	      selectOtherMonths: true,
	      dateFormat: "yy-mm-dd",
	    }).prev('.btn').on('click', function (e) {
	      e && e.preventDefault();
	      element.focus();
	    });

    	$.extend($.datepicker, {_checkOffset:function(inst,offset,isFixed){return offset}});
    	element.datepicker('widget').css({'margin-left': -element.prev('.input-group-btn').find('.btn').outerWidth()});
 	}
});