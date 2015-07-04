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
	    element.select2();
 	}
})
.directive('myCheckbox', function () {
	return function (scope, element, attr) {
	    element.radiocheck();
 	}
})
.directive('myTooltip', function () {
	return function (scope, element, attr) {
	    element.tooltip('show');
 	}
})
.directive('myShelf', function () {
	return function (scope, element, attr) {
		element.bind('click', function() {
			$(document.body).toggleClass('shelf');
			element.find('.fa').toggleClass('fa-arrow-right');
      });
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