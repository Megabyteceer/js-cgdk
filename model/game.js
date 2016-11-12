/**
 * Created by Megabyte on 10.11.2016.
 */

module.exports.getInstance = function (
    randomSeed,
    tickCount,
    mapSize,

    isSkillsEnabled,
    isRawMessagesEnabled,

    friendlyFireDamageFactor,
    buildingDamageScoreFactor,
    buildingEliminationScoreFactor,
    minionDamageScoreFactor,
    minionEliminationScoreFactor,
    wizardDamageScoreFactor,
    wizardEliminationScoreFactor,
    teamWorkingScoreFactor,
    victoryScore,
    scoreGainRange,

    rawMessageMaxLength,
    rawMessageTransmissionSpeed,
    
    wizardRadius,
    wizardCastRange,
    wizardVisionRange,
    wizardForwardSpeed,
    wizardBackwardSpeed,
    wizardStrafeSpeed,
    wizardBaseLife,
    wizardLifeGrowthPerLevel,
    wizardBaseMana,
    wizardManaGrowthPerLevel,
    wizardBaseLifeRegeneration,
    wizardLifeRegenerationGrowthPerLevel,
    wizardBaseManaRegeneration,
    wizardManaRegenerationGrowthPerLevel,
    wizardMaxTurnAngle,
    wizardMaxResurrectionDelayTicks,
    wizardMinResurrectionDelayTicks,
    wizardActionCooldownTicks,
    
    staffCooldownTicks,
    magicMissileCooldownTicks,
    frostBoltCooldownTicks,
    fireballCooldownTicks,
    hasteCooldownTicks,
    shieldCooldownTicks,
    
    magicMissileManacost,
    frostBoltManacost,
    fireballManacost,
    hasteManacost,
    shieldManacost,
    
    staffDamage,
    staffSector,
    staffRange,
    
    levelUpXpValues,
    
    minionRadius,
    minionVisionRange,
    minionSpeed,
    minionMaxTurnAngle,
    minionLife,
    factionMinionAppearanceIntervalTicks,
    
    orcWoodcutterActionCooldownTicks,
    orcWoodcutterDamage,
    orcWoodcutterAttackSector,
    orcWoodcutterAttackRange,
    
    fetishBlowdartActionCooldownTicks,
    fetishBlowdartAttackRange,
    fetishBlowdartAttackSector,
    
    bonusRadius,
    bonusAppearanceIntervalTicks,
    bonusScoreAmount,
    
    dartRadius,
    dartSpeed,
    dartDirectDamage,
    
    magicMissileRadius,
    magicMissileSpeed,
    magicMissileDirectDamage,
    
    frostBoltRadius,
    frostBoltSpeed,
    frostBoltDirectDamage,
    
    fireballRadius,
    fireballSpeed,
    fireballExplosionMaxDamageRange,
    fireballExplosionMinDamageRange,
    fireballExplosionMaxDamage,
    fireballExplosionMinDamage,
    
    guardianTowerRadius,
    guardianTowerVisionRange,
    guardianTowerLife,
    guardianTowerAttackRange,
    guardianTowerDamage,
    guardianTowerCooldownTicks,
    
    factionBaseRadius,
    factionBaseVisionRange,
    factionBaseLife,
    factionBaseAttackRange,
    factionBaseDamage,
    factionBaseCooldownTicks,
    
    burningDurationTicks,
    burningSummaryDamage,
    
    empoweredDurationTicks,
    empoweredDamageFactor,
    
    frozenDurationTicks,
    
    hastenedDurationTicks,
    hastenedBonusDurationFactor,
    hastenedMovementBonusFactor,
    hastenedRotationBonusFactor,
    
    shieldedDurationTicks,
    shieldedBonusDurationFactor,
    shieldedDirectDamageAbsorptionFactor,
    
    auraSkillRange,
    
    rangeBonusPerSkillLevel,
    magicalDamageBonusPerSkillLevel,
    staffDamageBonusPerSkillLevel,
    movementBonusFactorPerSkillLevel,
    magicalDamageAbsorptionPerSkillLevel
) {

    return {
        randomSeed                           : randomSeed,
        tickCount                            : tickCount,
        mapSize                              : mapSize,
        
        isSkillsEnabled                      : isSkillsEnabled,
        isRawMessagesEnabled                 : isRawMessagesEnabled,
        
        friendlyFireDamageFactor             : friendlyFireDamageFactor,
        buildingDamageScoreFactor            : buildingDamageScoreFactor,
        buildingEliminationScoreFactor       : buildingEliminationScoreFactor,
        minionDamageScoreFactor              : minionDamageScoreFactor,
        minionEliminationScoreFactor         : minionEliminationScoreFactor,
        wizardDamageScoreFactor              : wizardDamageScoreFactor,
        wizardEliminationScoreFactor         : wizardEliminationScoreFactor,
        teamWorkingScoreFactor               : teamWorkingScoreFactor,
        victoryScore                         : victoryScore,
        scoreGainRange                       : scoreGainRange,
        
        rawMessageMaxLength                  : rawMessageMaxLength,
        rawMessageTransmissionSpeed          : rawMessageTransmissionSpeed,
        
        wizardRadius                         : wizardRadius,
        wizardCastRange                      : wizardCastRange,
        wizardVisionRange                    : wizardVisionRange,
        wizardForwardSpeed                   : wizardForwardSpeed,
        wizardBackwardSpeed                  : wizardBackwardSpeed,
        wizardStrafeSpeed                    : wizardStrafeSpeed,
        wizardBaseLife                       : wizardBaseLife,
        wizardLifeGrowthPerLevel             : wizardLifeGrowthPerLevel,
        wizardBaseMana                       : wizardBaseMana,
        wizardManaGrowthPerLevel             : wizardManaGrowthPerLevel,
        wizardBaseLifeRegeneration           : wizardBaseLifeRegeneration,
        wizardLifeRegenerationGrowthPerLevel : wizardLifeRegenerationGrowthPerLevel,
        wizardBaseManaRegeneration           : wizardBaseManaRegeneration,
        wizardManaRegenerationGrowthPerLevel : wizardManaRegenerationGrowthPerLevel,
        wizardMaxTurnAngle                   : wizardMaxTurnAngle,
        wizardMaxResurrectionDelayTicks      : wizardMaxResurrectionDelayTicks,
        wizardMinResurrectionDelayTicks      : wizardMinResurrectionDelayTicks,
        wizardActionCooldownTicks            : wizardActionCooldownTicks,
        
        staffCooldownTicks                   : staffCooldownTicks,
        magicMissileCooldownTicks            : magicMissileCooldownTicks,
        frostBoltCooldownTicks               : frostBoltCooldownTicks,
        fireballCooldownTicks                : fireballCooldownTicks,
        hasteCooldownTicks                   : hasteCooldownTicks,
        shieldCooldownTicks                  : shieldCooldownTicks,
        
        magicMissileManacost                 : magicMissileManacost,
        frostBoltManacost                    : frostBoltManacost,
        fireballManacost                     : fireballManacost,
        hasteManacost                        : hasteManacost,
        shieldManacost                       : shieldManacost,
        
        staffDamage                          : staffDamage,
        staffSector                          : staffSector,
        staffRange                           : staffRange,
        
        levelUpXpValues                      : levelUpXpValues,
        
        minionRadius                         : minionRadius,
        minionVisionRange                    : minionVisionRange,
        minionSpeed                          : minionSpeed,
        minionMaxTurnAngle                   : minionMaxTurnAngle,
        minionLife                           : minionLife,
        factionMinionAppearanceIntervalTicks : factionMinionAppearanceIntervalTicks,
        
        orcWoodcutterActionCooldownTicks     : orcWoodcutterActionCooldownTicks,
        orcWoodcutterDamage                  : orcWoodcutterDamage,
        orcWoodcutterAttackSector            : orcWoodcutterAttackSector,
        orcWoodcutterAttackRange             : orcWoodcutterAttackRange,
        
        fetishBlowdartActionCooldownTicks    : fetishBlowdartActionCooldownTicks,
        fetishBlowdartAttackRange            : fetishBlowdartAttackRange,
        fetishBlowdartAttackSector           : fetishBlowdartAttackSector,
        
        bonusRadius                          : bonusRadius,
        bonusAppearanceIntervalTicks         : bonusAppearanceIntervalTicks,
        bonusScoreAmount                     : bonusScoreAmount,
        
        dartRadius                           : dartRadius,
        dartSpeed                            : dartSpeed,
        dartDirectDamage                     : dartDirectDamage,
        
        magicMissileRadius                   : magicMissileRadius,
        magicMissileSpeed                    : magicMissileSpeed,
        magicMissileDirectDamage             : magicMissileDirectDamage,
        
        frostBoltRadius                      : frostBoltRadius,
        frostBoltSpeed                       : frostBoltSpeed,
        frostBoltDirectDamage                : frostBoltDirectDamage,
        
        fireballRadius                       : fireballRadius,
        fireballSpeed                        : fireballSpeed,
        fireballExplosionMaxDamageRange      : fireballExplosionMaxDamageRange,
        fireballExplosionMinDamageRange      : fireballExplosionMinDamageRange,
        fireballExplosionMaxDamage           : fireballExplosionMaxDamage,
        fireballExplosionMinDamage           : fireballExplosionMinDamage,
        
        guardianTowerRadius                  : guardianTowerRadius,
        guardianTowerVisionRange             : guardianTowerVisionRange,
        guardianTowerLife                    : guardianTowerLife,
        guardianTowerAttackRange             : guardianTowerAttackRange,
        guardianTowerDamage                  : guardianTowerDamage,
        guardianTowerCooldownTicks           : guardianTowerCooldownTicks,
        
        factionBaseRadius                    : factionBaseRadius,
        factionBaseVisionRange               : factionBaseVisionRange,
        factionBaseLife                      : factionBaseLife,
        factionBaseAttackRange               : factionBaseAttackRange,
        factionBaseDamage                    : factionBaseDamage,
        factionBaseCooldownTicks             : factionBaseCooldownTicks,
        
        burningDurationTicks                 : burningDurationTicks,
        burningSummaryDamage                 : burningSummaryDamage,
        
        empoweredDurationTicks               : empoweredDurationTicks,
        empoweredDamageFactor                : empoweredDamageFactor,
        
        frozenDurationTicks                  : frozenDurationTicks,
        
        hastenedDurationTicks                : hastenedDurationTicks,
        hastenedBonusDurationFactor          : hastenedBonusDurationFactor,
        hastenedMovementBonusFactor          : hastenedMovementBonusFactor,
        hastenedRotationBonusFactor          : hastenedRotationBonusFactor,
        
        shieldedDurationTicks                : shieldedDurationTicks,
        shieldedBonusDurationFactor          : shieldedBonusDurationFactor,
        shieldedDirectDamageAbsorptionFactor : shieldedDirectDamageAbsorptionFactor,
        
        auraSkillRange                       : auraSkillRange,
        
        rangeBonusPerSkillLevel              : rangeBonusPerSkillLevel,
        magicalDamageBonusPerSkillLevel      : magicalDamageBonusPerSkillLevel,
        staffDamageBonusPerSkillLevel        : staffDamageBonusPerSkillLevel,
        movementBonusFactorPerSkillLevel     : movementBonusFactorPerSkillLevel,
        magicalDamageAbsorptionPerSkillLevel : magicalDamageAbsorptionPerSkillLevel
    };

};
