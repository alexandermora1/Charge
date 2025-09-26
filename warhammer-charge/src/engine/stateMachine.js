import { STATES } from "./states"

export function createInitialState(attacker, defender) {
  return {
    current: "DECLARE_CHARGE",
    attacker,
    defender,
    combatResult: null,
    log: ["Declare chargers phase begins!"]
  }
}

export function checkRangePhase(state) {
  return {
    ...state,
    current: STATES.CHECK_RANGE,
    log: [...state.log, "Check range phase begins!"]
  }
}

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

export function attackerStrikesPhase(state) {
  return {
    ...state,
    current: STATES.ATTACKER_STRIKES,
    log: [...state.log, "Attacker strikes phase begins!"]
  }
}

export function defenderStrikesPhase(state) {
  return {
    ...state,
    current: STATES.DEFENDER_STRIKES,
    log: [...state.log, "Defender strikes phase begins!"]
  }
}

export function combatResolutionPhase(state) {
  return {
    ...state,
    current: STATES.COMBAT_RESOLUTION,
    log: [...state.log, "Combat resolution phase begins!"]
  }
}

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