import { UNIT_PROFILES } from "../data/units";
import { armourSave, toHitChart, toWoundChart } from "../rules/tables";


// Attackers rolls to hit and wound, defenders make armour saves
export function resolveMelee(attackUnit, defendUnit, rng) {
  const trace = [];
  
  // Profiles for attackers and defenders
  const attackerProfile = UNIT_PROFILES[attackUnit.profileId]
  const defenderProfile = UNIT_PROFILES[defendUnit.profileId]

  if (!attackerProfile || !defenderProfile) {
    throw new Error("Profile not found for attacker or defender");
  }

  // Find how many models can fight. Only front rank can fight, as spears and such have not yet been implemented.
  const frontRank = Math.min(attackUnit.width, defendUnit.width);
  const fightingModels = Math.min(frontRank, attackUnit.models);
  const attacks = fightingModels * attackerProfile.a;
  trace.push(`Front rank of ${attackUnit.width} vs ${defendUnit.width} means ${frontRank} attacking models are in base contact. Attacker has ${fightingModels} models able to fight. The models have ${attackerProfile.a} attack(s) each, so will get a total of ${attacks} attacks.`);
  
  if (attacks <= 0) {
    trace.push("No eligible attackers.")
    return {modelsKilled: 0, trace}
  }

  // Roll to hit
  const toHitTarget = toHitChart(attackerProfile.ws, defenderProfile.ws);
  const hits = rng.diceOverTargetValue(attacks, toHitTarget)
  trace.push(`To hit needed: ${toHitTarget}+ (WS${attackerProfile.ws} vs WS${defenderProfile.ws})`)
  trace.push(`Rolled to hit: ${hits.rolls} -> ${hits.successes} hits.`)

  // Roll to wound
  const toWoundTarget = toWoundChart(attackerProfile.s, defenderProfile.t);
  const wounds = rng.diceOverTargetValue(hits.successes, toWoundTarget);
  trace.push(`To wound needed: ${toWoundTarget}+ (S${attackerProfile.s} vs T${defenderProfile.t})`);
  trace.push(`Rolled to wound: ${wounds.rolls} -> ${wounds.successes} wounds.`);
  
  // Roll armour saves if the models have any armour
  const toSaveTarget = armourSave(defenderProfile.save, attackerProfile.s);
  let saved = 0;
  if (toSaveTarget == null) {
    trace.push("No armour save available.")
  } else {
    const saveRolls = rng.diceOverTargetValue(wounds.successes, toSaveTarget);
    saved = saveRolls.successes;
    trace.push(`Defenders armour save: ${toSaveTarget}+`);
    trace.push(`Rolled armour saves: ${saveRolls.rolls} -> ${saveRolls.successes} wounds saved.`);
  }

  // Final result
  const modelsKilled = Math.max(0, wounds.successes - saved);
  trace.push(`Models killed: ${modelsKilled}`);
  
  return {modelsKilled, trace}
}


export function getFrontRankWidth(attacker, defender) {
  return Math.min(attacker.width, defender.width);
}

export function getFightingModels(attacker, defender) {
  const frontRankWidth = getFrontRankWidth(attacker, defender);
  return Math.min(frontRankWidth, attacker.models);
}