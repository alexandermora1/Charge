// Random number generator that will take care of all dice rolling


// Roll a single regular 6-sided dice
export function rollD6() {
  const result = Math.floor(Math.random() * 6) + 1;
  return result
}


// Roll several dice and return an array of results
export function rollMoreDice(number) {
  const results = []

  for (let i = 0; i < number; i++) {
    results.push(rollD6())
  }

  return results;
}


// Roll several dice and count how many are over the target value
// Will be used for to hit/to wound/armour saves
export function diceOverTargetValue(number, target) {
  const rolled = rollMoreDice(number);
  const successful = rolled.filter(dice => dice >= target)

  return {
    rolls: rolled,
    successes: successful.length,
    successful
  };
}


// Roll several dice and checks if the sum is <= target value
// Useful for leadership tests where success is below target value
export function diceUnderOrEqualSum(number, target) {
  const rolled = rollMoreDice(number);
  const total = rolled.reduce((a, b) => a + b, 0);
  const passed = total <= target;

  return {
    rolls: rolled,
    total,
    target,
    passed,
  };
}

