(function($) {
    var nw = require('nw.gui');
    var win = nw.Window.get();
    win.isMaximized = false;       
    // Min
    $('#windowControlMinimize').on('click', function()
    {
        alert('minimize');
        win.minimize();
    });
    // Close
    $('#windowControlClose').on('click', function()
    {
        alert('close');
        win.close();
    });
    // Max
    $('#windowControlMaximize').on('click', function()
    {
        alert('maximize');
        if (win.isMaximized)
            win.unmaximize();
        else
            win.maximize();
    });
    win.on('maximize', function(){
        win.isMaximized = true;
    });
    win.on('unmaximize', function(){
        win.isMaximized = false;
    });

})(jQuery);