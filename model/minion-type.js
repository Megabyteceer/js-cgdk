/**
 * Created by Megabyte on 11.11.2016.
 */
module.exports = {
    OrcWoodcutter  : 0,
    FetishBlowdart : 1,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Minion-Type: number expected';
        if(v < 0 || v > 1) throw 'Minion-Type: enum value out of range [0, 1]';
    }
};
