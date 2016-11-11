/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.constructor = function (
    randomSeed,  tickCount,  mapSize,  isSkillsEnabled,  isRawMessagesEnabled,
   friendlyFireDamageFactor,  buildingDamageScoreFactor,
   buildingEliminationScoreFactor,  minionDamageScoreFactor,
   minionEliminationScoreFactor,  wizardDamageScoreFactor,
   wizardEliminationScoreFactor,  teamWorkingScoreFactor,  victoryScore,
   scoreGainRange,  rawMessageMaxLength,  rawMessageTransmissionSpeed,  wizardRadius,
   wizardCastRange,  wizardVisionRange,  wizardForwardSpeed,  wizardBackwardSpeed,
   wizardStrafeSpeed,  wizardBaseLife,  wizardLifeGrowthPerLevel,  wizardBaseMana,
   wizardManaGrowthPerLevel,  wizardBaseLifeRegeneration,
   wizardLifeRegenerationGrowthPerLevel,  wizardBaseManaRegeneration,
   wizardManaRegenerationGrowthPerLevel,  wizardMaxTurnAngle,
   wizardMaxResurrectionDelayTicks,  wizardMinResurrectionDelayTicks,  wizardActionCooldownTicks,
   staffCooldownTicks,  magicMissileCooldownTicks,  frostBoltCooldownTicks,
   fireballCooldownTicks,  hasteCooldownTicks,  shieldCooldownTicks,  magicMissileManacost,
   frostBoltManacost,  fireballManacost,  hasteManacost,  shieldManacost,  staffDamage,
   staffSector,  staffRange, levelUpXpValues,  minionRadius,
   minionVisionRange,  minionSpeed,  minionMaxTurnAngle,  minionLife,
   factionMinionAppearanceIntervalTicks,  orcWoodcutterActionCooldownTicks,  orcWoodcutterDamage,
   orcWoodcutterAttackSector,  orcWoodcutterAttackRange,
   fetishBlowdartActionCooldownTicks,  fetishBlowdartAttackRange,
   fetishBlowdartAttackSector,  bonusRadius,  bonusAppearanceIntervalTicks,
   bonusScoreAmount,  dartRadius,  dartSpeed,  dartDirectDamage,
   magicMissileRadius,  magicMissileSpeed,  magicMissileDirectDamage,
   frostBoltRadius,  frostBoltSpeed,  frostBoltDirectDamage,  fireballRadius,
   fireballSpeed,  fireballExplosionMaxDamageRange,  fireballExplosionMinDamageRange,
   fireballExplosionMaxDamage,  fireballExplosionMinDamage,  guardianTowerRadius,
   guardianTowerVisionRange,  guardianTowerLife,  guardianTowerAttackRange,
   guardianTowerDamage,  guardianTowerCooldownTicks,  factionBaseRadius,
   factionBaseVisionRange,  factionBaseLife,  factionBaseAttackRange,
   factionBaseDamage,  factionBaseCooldownTicks,  burningDurationTicks,  burningSummaryDamage,
   empoweredDurationTicks,  empoweredDamageFactor,  frozenDurationTicks,
   hastenedDurationTicks,  hastenedBonusDurationFactor,  hastenedMovementBonusFactor,
   hastenedRotationBonusFactor,  shieldedDurationTicks,  shieldedBonusDurationFactor,
   shieldedDirectDamageAbsorptionFactor,  auraSkillRange,  rangeBonusPerSkillLevel,
   magicalDamageBonusPerSkillLevel,  staffDamageBonusPerSkillLevel,
   movementBonusFactorPerSkillLevel,  magicalDamageAbsorptionPerSkillLevel

) {
    this.randomSeed = randomSeed;
    this.tickCount = tickCount;
    this.mapSize = mapSize;
    this.isSkillsEnabled = isSkillsEnabled;
    this.isRawMessagesEnabled = isRawMessagesEnabled;
    this.friendlyFireDamageFactor = friendlyFireDamageFactor;
    this.buildingDamageScoreFactor = buildingDamageScoreFactor;
    this.buildingEliminationScoreFactor = buildingEliminationScoreFactor;
    this.minionDamageScoreFactor = minionDamageScoreFactor;
    this.minionEliminationScoreFactor = minionEliminationScoreFactor;
    this.wizardDamageScoreFactor = wizardDamageScoreFactor;
    this.wizardEliminationScoreFactor = wizardEliminationScoreFactor;
    this.teamWorkingScoreFactor = teamWorkingScoreFactor;
    this.victoryScore = victoryScore;
    this.scoreGainRange = scoreGainRange;
    this.rawMessageMaxLength = rawMessageMaxLength;
    this.rawMessageTransmissionSpeed = rawMessageTransmissionSpeed;
    this.wizardRadius = wizardRadius;
    this.wizardCastRange = wizardCastRange;
    this.wizardVisionRange = wizardVisionRange;
    this.wizardForwardSpeed = wizardForwardSpeed;
    this.wizardBackwardSpeed = wizardBackwardSpeed;
    this.wizardStrafeSpeed = wizardStrafeSpeed;
    this.wizardBaseLife = wizardBaseLife;
    this.wizardLifeGrowthPerLevel = wizardLifeGrowthPerLevel;
    this.wizardBaseMana = wizardBaseMana;
    this.wizardManaGrowthPerLevel = wizardManaGrowthPerLevel;
    this.wizardBaseLifeRegeneration = wizardBaseLifeRegeneration;
    this.wizardLifeRegenerationGrowthPerLevel = wizardLifeRegenerationGrowthPerLevel;
    this.wizardBaseManaRegeneration = wizardBaseManaRegeneration;
    this.wizardManaRegenerationGrowthPerLevel = wizardManaRegenerationGrowthPerLevel;
    this.wizardMaxTurnAngle = wizardMaxTurnAngle;
    this.wizardMaxResurrectionDelayTicks = wizardMaxResurrectionDelayTicks;
    this.wizardMinResurrectionDelayTicks = wizardMinResurrectionDelayTicks;
    this.wizardActionCooldownTicks = wizardActionCooldownTicks;
    this.staffCooldownTicks = staffCooldownTicks;
    this.magicMissileCooldownTicks = magicMissileCooldownTicks;
    this.frostBoltCooldownTicks = frostBoltCooldownTicks;
    this.fireballCooldownTicks = fireballCooldownTicks;
    this.hasteCooldownTicks = hasteCooldownTicks;
    this.shieldCooldownTicks = shieldCooldownTicks;
    this.magicMissileManacost = magicMissileManacost;
    this.frostBoltManacost = frostBoltManacost;
    this.fireballManacost = fireballManacost;
    this.hasteManacost = hasteManacost;
    this.shieldManacost = shieldManacost;
    this.staffDamage = staffDamage;
    this.staffSector = staffSector;
    this.staffRange = staffRange;
    this.levelUpXpValues = levelUpXpValues;
    this.minionRadius = minionRadius;
    this.minionVisionRange = minionVisionRange;
    this.minionSpeed = minionSpeed;
    this.minionMaxTurnAngle = minionMaxTurnAngle;
    this.minionLife = minionLife;
    this.factionMinionAppearanceIntervalTicks = factionMinionAppearanceIntervalTicks;
    this.orcWoodcutterActionCooldownTicks = orcWoodcutterActionCooldownTicks;
    this.orcWoodcutterDamage = orcWoodcutterDamage;
    this.orcWoodcutterAttackSector = orcWoodcutterAttackSector;
    this.orcWoodcutterAttackRange = orcWoodcutterAttackRange;
    this.fetishBlowdartActionCooldownTicks = fetishBlowdartActionCooldownTicks;
    this.fetishBlowdartAttackRange = fetishBlowdartAttackRange;
    this.fetishBlowdartAttackSector = fetishBlowdartAttackSector;
    this.bonusRadius = bonusRadius;
    this.bonusAppearanceIntervalTicks = bonusAppearanceIntervalTicks;
    this.bonusScoreAmount = bonusScoreAmount;
    this.dartRadius = dartRadius;
    this.dartSpeed = dartSpeed;
    this.dartDirectDamage = dartDirectDamage;
    this.magicMissileRadius = magicMissileRadius;
    this.magicMissileSpeed = magicMissileSpeed;
    this.magicMissileDirectDamage = magicMissileDirectDamage;
    this.frostBoltRadius = frostBoltRadius;
    this.frostBoltSpeed = frostBoltSpeed;
    this.frostBoltDirectDamage = frostBoltDirectDamage;
    this.fireballRadius = fireballRadius;
    this.fireballSpeed = fireballSpeed;
    this.fireballExplosionMaxDamageRange = fireballExplosionMaxDamageRange;
    this.fireballExplosionMinDamageRange = fireballExplosionMinDamageRange;
    this.fireballExplosionMaxDamage = fireballExplosionMaxDamage;
    this.fireballExplosionMinDamage = fireballExplosionMinDamage;
    this.guardianTowerRadius = guardianTowerRadius;
    this.guardianTowerVisionRange = guardianTowerVisionRange;
    this.guardianTowerLife = guardianTowerLife;
    this.guardianTowerAttackRange = guardianTowerAttackRange;
    this.guardianTowerDamage = guardianTowerDamage;
    this.guardianTowerCooldownTicks = guardianTowerCooldownTicks;
    this.factionBaseRadius = factionBaseRadius;
    this.factionBaseVisionRange = factionBaseVisionRange;
    this.factionBaseLife = factionBaseLife;
    this.factionBaseAttackRange = factionBaseAttackRange;
    this.factionBaseDamage = factionBaseDamage;
    this.factionBaseCooldownTicks = factionBaseCooldownTicks;
    this.burningDurationTicks = burningDurationTicks;
    this.burningSummaryDamage = burningSummaryDamage;
    this.empoweredDurationTicks = empoweredDurationTicks;
    this.empoweredDamageFactor = empoweredDamageFactor;
    this.frozenDurationTicks = frozenDurationTicks;
    this.hastenedDurationTicks = hastenedDurationTicks;
    this.hastenedBonusDurationFactor = hastenedBonusDurationFactor;
    this.hastenedMovementBonusFactor = hastenedMovementBonusFactor;
    this.hastenedRotationBonusFactor = hastenedRotationBonusFactor;
    this.shieldedDurationTicks = shieldedDurationTicks;
    this.shieldedBonusDurationFactor = shieldedBonusDurationFactor;
    this.shieldedDirectDamageAbsorptionFactor = shieldedDirectDamageAbsorptionFactor;
    this.auraSkillRange = auraSkillRange;
    this.rangeBonusPerSkillLevel = rangeBonusPerSkillLevel;
    this.magicalDamageBonusPerSkillLevel = magicalDamageBonusPerSkillLevel;
    this.staffDamageBonusPerSkillLevel = staffDamageBonusPerSkillLevel;
    this.movementBonusFactorPerSkillLevel = movementBonusFactorPerSkillLevel;
    this.magicalDamageAbsorptionPerSkillLevel = magicalDamageAbsorptionPerSkillLevel;
};