(function($) { 

    // Custom Selects
/*    $("select.info").selectpicker({style: 'btn-info'});
    $("select.primary").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse', noneSelectedText : 'Tous'});
    $("select.huge.primary").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    $("select.large").selectpicker({style: 'btn-lg btn-danger'});
    $("select.info").selectpicker({style: 'btn-info'});
    $("select.small").selectpicker({style: 'btn-sm btn-primary'});*/

    // Tabs
    $(".nav-tabs a").on('click', function (e) {
      e.preventDefault();
      $(this).tab("show");
    })

    // Tooltips
    $("[data-toggle=tooltip]").tooltip();

    // Add style class name to a tooltips
    $(".tooltip").addClass(function() {
      if ($(this).prev().attr("data-tooltip-style")) {
        return "tooltip-" + $(this).prev().attr("data-tooltip-style");
      }
    });


    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
      $(this).closest('.form-group, .navbar-search').addClass('focus');
    }).on('blur', '.form-control', function () {
      $(this).closest('.form-group, .navbar-search').removeClass('focus');
    });

    // // Table: Toggle all checkboxes
    // $('.table .toggle-all').on('click', function() {
    //   var ch = $(this).find(':checkbox').prop('checked');
    //   $(this).closest('.table').find('tbody :checkbox').checkbox(!ch ? 'check' : 'uncheck');
    // });
    $("[data-toggle=checkbox]").on('toggle', function(){
      console.log($this)
    });
    // Table: Add class row selected
    $('.table tbody').on('check uncheck toggle', ':checkbox', function (e) {
      var $this = $(this)
        , check = $this.prop('checked')
        , toggle = e.type == 'toggle'
        , checkboxes = $('.table tbody :checkbox')
        , checkAll = checkboxes.length == checkboxes.filter(':checked').length

      $this.closest('tr')[check ? 'addClass' : 'removeClass']('selected-row');
      if (toggle) $this.closest('.table').find('.toggle-all :checkbox').checkbox(checkAll ? 'check' : 'uncheck');
    });

    // jQuery UI Datepicker
/*    var datepickerSelector = '.has-datepicker';
    $(datepickerSelector).datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: "yy-mm-dd",
    }).prev('.btn').on('click', function (e) {
      e && e.preventDefault();
      $(datepickerSelector).focus();
    });
    $.extend($.datepicker, {_checkOffset:function(inst,offset,isFixed){return offset}});
    // Now let's align datepicker with the prepend button
    $(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.input-group-btn').find('.btn').outerWidth()});

*/   
    // Switch
    // $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

    /* close an alert */
    $('.js-close').on('click', function () {
      $(this).parent().hide();
    });

    /* print button */
    $('#btnPrint').on('click', function () {
      window.print();
    });

    /* form-wide */
    $('.form-wide').find('.form-control').parent().addClass('col-md-8');
    $('.special-form').find('.col-md-4').removeClass('col-md-4');

    //barecode
    $(".js-barcode").each(function(){
        $(this).barcode($(this).data('id'), 'codabar');   
    });

})(jQuery);