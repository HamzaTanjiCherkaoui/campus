/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Allocation = require('../../api/allocation/allocation.model');
var Block = require('../../api/block/block.model');
var Category = require('../../api/category/category.model');
var Config = require('../../api/config/config.model');
var Person = require('../../api/person/person.model');
var Product = require('../../api/product/product.model');
var Reservation = require('../../api/reservation/reservation.model');
var Room = require('../../api/room/room.model');
var User = require('../../api/user/user.model');

var mongoose = require('mongoose'); 
mongoose.Model.seed = function(entities) {  
    var promise = new mongoose.Promise;
    this.create(entities, function(err) {
        if(err) { promise.reject(err); }
        else    { promise.resolve(); }
    });
    return promise;
};
// Reset collections
User.remove().exec()
.then(function() { 
    return Reservation.remove().exec() 
})
.then(function() { 
    return Allocation.remove().exec() 
})
.then(function() { 
    return Person.remove().exec() 
})
.then(function() { 
    return Room.remove().exec() 
})
.then(function() { 
    return Block.remove().exec() 
})
.then(function() { 
    return Product.remove().exec() 
})
.then(function() { 
    return Category.remove().exec() 
})
.then(function() { 
    return Config.remove().exec() 
})

// Seed
.then(function() { 
    return User.seed(require('./users.json'));
})
.then(function() { 
    return Config.seed(require('./config.json'));
})
.then(function() { 
    return Category.seed(require('./categories.json'));
})
.then(function() { 
    return Product.seed(require('./products.json'));
})
.then(function() { 
    return Block.seed(require('./blocks.json'));
})
.then(function() { 
    return Room.seed(require('./rooms.json'));
})
.then(function() { 
    return Person.seed(require('./persons.json'));
})
.then(function() { 
    return Allocation.seed(require('./allocations.json'));
})
.then(function() { 
    return Reservation.seed(require('./reservations.json'));
})

// Done!
.then(function() { 
    done(); 
}, function(err) { 
    return done(err); 
});