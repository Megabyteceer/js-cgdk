/**
 * Created by Megabyte on 11.11.2016.
 */

module.exports = {
    MagicMissile : 0,
    FrostBolt    : 1,
    Fireball     : 2,
    Dart         : 3,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Projectile-Type: number expected';
        if(v < 0 || v > 3) throw 'Projectile-Type: enum value out of range [0, 3]';
    }
};
