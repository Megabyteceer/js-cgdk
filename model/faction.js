/**
 * Created by Megabyte on 11.11.2016.
 */
module.exports = {
    Academy   : 0,
    Renegades : 1,
    Neutral   : 2,
    Other     : 3,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Faction: number expected';
        if(v < 0 || v > 3) throw 'Faction: enum value out of range [0, 3]';
    }
};
