/**
 * Created by Megabyte on 11.11.2016.
 */

module.exports = {
    Burning   : 0,
    Empowered : 1,
    Frozen    : 2,
    Hastened  : 3,
    Shielded  : 4,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Status-Type: number expected';
        if(v < 0 || v > 4) throw 'Status-Type: enum value out of range [0, 4]';
    }
};
