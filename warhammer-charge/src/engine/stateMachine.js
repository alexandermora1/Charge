import { resolveMelee } from "./combat"
import { removeCasualties } from "./regiment"
import { EMPTY_ROUND_DATA } from "./roundData"
import { STATES } from "./states"

// Phase handlers
export function createInitialState(attacker, defender) {
  return {
    current: "DECLARE_CHARGE",
    attacker,
    defender,
    roundData: {...EMPTY_ROUND_DATA},
    combatResult: null,
    log: ["Declare chargers phase begins!"]
  }
}

// TODO: if not in range(M*2), charge fails
export function checkRangePhase(state) {

  return {
    ...state,
    current: STATES.CHECK_RANGE,
    log: [...state.log, "Check range phase begins!"]
  }
}

// TODO: if failed charge, move M inches
export function moveChargersPhase(state) {
  
  return {
    ...state,
    current: STATES.MOVE_CHARGERS,
    log: [...state.log, "Move chargers phase begins!"]
  }
}

export function combatPhaseStart(state) {
  return {
    ...state,
    current: STATES.COMBAT_PHASE_START,
    log: [...state.log, "Combat phase begins!"]
  }
}

// Gets current regiments from the state, runs melee, removes casualties.
// Builds new state object with updates.
// TODO: if no defenders to strike back, skip DEFENDER_STRIKES
export function attackerStrikesPhase(state, rng) {
  const attacker = state.attacker;
  const defender = state.defender;

  const {modelsKilled, trace} = resolveMelee(attacker, defender, rng);
  const defenderAfter = removeCasualties(defender, modelsKilled);

  return {
    ...state,
    current: STATES.DEFENDER_STRIKES,
    defender: defenderAfter,
    roundData: {
      ...state.roundData,
      attackerWounds: modelsKilled,
    },
    log: [
      ...state.log, "Attacker strikes phase begins!",
      ...trace, `Attacker inflicted ${modelsKilled} casualties.`,
    ]
  }
}

export function defenderStrikesPhase(state, rng) {
  const attacker = state.attacker;
  const defender = state.defender;

  const { modelsKilled, trace } = resolveMelee(defender, attacker, rng);
  const attackerAfter = removeCasualties(attacker, modelsKilled);

  return {
    ...state,
    current: STATES.COMBAT_RESOLUTION,
    attacker: attackerAfter,
    roundData: {
      ...state.roundData,
      defenderWounds: modelsKilled,
    },
    log: [
      ...state.log, "Defender strikes phase begins!",
      ...trace, `Defender inflicted ${modelsKilled} casualties.`
    ]
  }
}

export function combatResolutionPhase(state) {
  return {
    ...state,
    current: STATES.COMBAT_RESOLUTION,
    log: [...state.log, "Combat resolution phase begins!"]
  }
}

// TODO: if unit fails break test, mark unit as fleeing
export function breakTestPhase(state) {

  return {
    ...state,
    current: STATES.BREAK_TEST,
    log: [...state.log, "Break test phase begins!"]
  }
}

export function postCombatPhase(state) {
  return {
    ...state,
    current: STATES.POST_COMBAT,
    log: [...state.log, "Post combat phase begins!"]
  }
}