/**
 * Created by Megabyte on 11.11.2016.
 */

module.exports = {
    Top    : 0,
    Middle : 1,
    Bottom : 2,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Lane-Type: number expected';
        if(v < 0 || v > 2) throw 'Lane-Type: enum value out of range [0, 2]';
    }
};
