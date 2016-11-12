/**
 * Created by Megabyte on 11.11.2016.
 */
module.exports = {
    GuardianTower : 0,
    FactionBase   : 1,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Building-Type: number expected';
        if(v < 0 || v > 1) throw 'Building-Type: enum value out of range [0, 1]';
    }
};
