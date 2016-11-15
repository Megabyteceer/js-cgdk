/**
 * Created by Megabyte on 11.11.2016.
 */
module.exports =  {
    Empower : 0,
    Haste   : 1,
    Shield  : 2,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Bonus-Type: number expected';
        if(v < 0 || v > 2) throw 'Bonus-Type: enum value out of range [0, 2]';
    }
};
