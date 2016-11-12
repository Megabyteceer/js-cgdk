/**
 * Created by Megabyte on 09.11.2016.
 */

module.exports = {
    None         : 0,
    Staff        : 1,
    MagicMissile : 2,
    FrostBolt    : 3,
    Fireball     : 4,
    Haste        : 5,
    Shield       : 6,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Action-Type: number expected';
        if(v < 0 || v > 6) throw 'Action-Type: enum value out of range [0, 6]';
    }
};
