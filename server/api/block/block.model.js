'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlockSchema = new Schema({
  name: String,
  type: Boolean, // 0->man, 1->woman
  floors: { type: Number, min: 0},
  rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}]
});


BlockSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * Virtuals
 */
BlockSchema
    .virtual('count')
    .get( function () {
        return this.rooms.length;
    });

module.exports = mongoose.model('Block', BlockSchema);