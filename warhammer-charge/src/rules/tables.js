
// Check attackers WS (weapon skill) versus defenders WS
// If attacker is better it is 3+ to hit
// If defender is equal or better by up to 3 points it is 4+ to hit
// Hardest is 5+ 
export const toHitChart = (attWS, defWS) => {
  if (attWS > defWS) return 3;
  
  const difference = defWS - attWS;
  return difference <= 3 ? 4 : 5;
}


// Check attackers S(strength) versus defenders T(toughness)
// Equal is 4+. One better either way is one easier or one harder.
// Two better is two easier or two harder.
// More than that is max 2+ to wound is the attacker is strong
// Max 6+ to wound.
export const toWoundChart = (attS, defT) => {
  let rollNeeded = 4 + (defT - attS);

  if (rollNeeded < 2) rollNeeded = 2;
  if (rollNeeded > 6) rollNeeded = 6;

  return rollNeeded;
}

// Calculates armour saves and subtracts modifier.
// Armour can be modified if attacker is stronger than S3. One minus armour for each S point over 3.
// AS(armour save) minus S(strength) over 3. A strong enough attacker can ignore armour.
export const armourSave = (as, s) => {
  let saveRollNeeded = as;

  if (s > 3) {
    saveRollNeeded = as + (s - 3);
  }
  if (saveRollNeeded > 6) {
    return null;
  }

  return saveRollNeeded;
}



