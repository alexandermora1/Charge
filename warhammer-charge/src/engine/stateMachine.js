import { resolveMelee } from "./combat"
import { outnumberScore, ranksScore, standardScore } from "./combatResolution"
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
      woundsByAttacker: modelsKilled,
    },
    log: [
      ...state.log, "Attacker strikes phase begins!",
      ...trace, `Attacker inflicted ${modelsKilled} casualties.`,
    ]
  }
}

// Same as attack, but defenders strike back.
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
      woundsByDefender: modelsKilled,
    },
    log: [
      ...state.log, "Defender strikes phase begins!",
      ...trace, `Defender inflicted ${modelsKilled} casualties.`
    ]
  }
}

// Calculate combat resolution to see which side needs to take a break test.
// Points are awarded from unsaved wounds, standard bearer, outnumbering, ranks.
// TODO: Musician is the tiebreaker. If both or no musician, just a tie - skip break test.
export function combatResolutionPhase(state) {
  const attacker = state.attacker;
  const defender = state.defender;

  const woundsA = state.roundData.woundsByAttacker;
  const standardA = standardScore(attacker);
  const outnumberingA = outnumberScore(attacker, defender)
  const ranksA = ranksScore(attacker);
  const attackerTotal = woundsA + standardA + outnumberingA + ranksA;

  const woundsD = state.roundData.woundsByDefender;
  const standardD = standardScore(defender);
  const outnumberingD = outnumberScore(defender, attacker)
  const ranksD = ranksScore(defender);
  const defenderTotal = woundsD + standardD + outnumberingD + ranksD;

  const winningMargin = attackerTotal - defenderTotal;
  const winner = winningMargin > 0 ? "attacker" : winningMargin < 0 ? "defender" : "draw";

  return {
    ...state,
    current: STATES.BREAK_TEST,
    roundData: {
      ...state.roundData,
      combatResult: {
        attackerTotal, defenderTotal, winningMargin, winner
      },
    },
    log: [
      ...state.log, "Combat resolution phase begins!",
      `Attacker CR = Wounds: ${woundsA}, Ranks: ${ranksA}, Standard: ${standardA}, Outnumbering: ${outnumberingA}. Total: ${attackerTotal} points.`,
      `Defender CR = Wounds: ${woundsD}, Ranks: ${ranksD}, Standard: ${standardD}, Outnumbering: ${outnumberingD}. Total: ${defenderTotal} points.`,   
      `${winner} wins by ${winningMargin}.`,   
    ]
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