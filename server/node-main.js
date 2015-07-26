'use strict';

//not working
exports.getWindow = function() {
    var gui = window.require('nw.gui');
    var win = nw.Window.get();

    console.log('win');
    return win;
};