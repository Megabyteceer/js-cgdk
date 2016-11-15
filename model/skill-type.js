/**
 * Created by Megabyte on 11.11.2016.
 */
module.exports = {
    RangeBonusPassive1              :  0,
    RangeBonusAura1                 :  1,
    RangeBonusPassive2              :  2,
    RangeBonusAura2                 :  3,
    AdvancedMagicMissile            :  4,
    
    MagicalDamageBonusPassive1      :  5,
    MagicalDamageBonusAura1         :  6,
    MagicalDamageBonusPassive2      :  7,
    MagicalDamageBonusAura2         :  8,
    FrostBolt                       :  9,
    
    StaffDamageBonusPassive1        : 10,
    StaffDamageBonusAura1           : 11,
    StaffDamageBonusPassive2        : 12,
    StaffDamageBonusAura2           : 13,
    Fireball                        : 14,
    
    MovementBonusFactorPassive1     : 15,
    MovementBonusFactorAura1        : 16,
    MovementBonusFactorPassive2     : 17,
    MovementBonusFactorAura2        : 18,
    Haste:                            19,
    
    MagicalDamageAbsorptionPassive1 : 20,
    MagicalDamageAbsorptionAura1    : 21,
    MagicalDamageAbsorptionPassive2 : 22,
    MagicalDamageAbsorptionAura2    : 23,
    Shield                          : 24,
    
    validate: function (v) {
        if(typeof v !== 'number') throw 'Skill-Type: number expected';
        if(v < 0 || v > 24) throw 'Skill-Type: enum value out of range [0, 24]';
    }
};
