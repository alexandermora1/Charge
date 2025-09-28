import { resolveMelee } from "./combat"
import { outnumberScore, ranksScore, standardScore } from "./combatResolution"
import { removeCasualties } from "./regiment"
import { diceUnderOrEqualSum } from "./rng"
import { EMPTY_ROUND_DATA } from "./roundData"
import { STATES } from "./states"

// Phase handlers
export function createInitialState(attacker, defender) {
  return {
    current: "DECLARE_CHARGE",
    attacker,
    defender,
    roundData: {...EMPTY_ROUND_DATA},
    log: ["Declare chargers phase begins!"]
  }
}

// TODO: if not in range(M*2), charge fails
export function checkRangePhase(state) {

  return {
    ...state,
    current: STATES.MOVE_CHARGERS,
    log: [...state.log, "Check range phase begins!"]
  }
}

// TODO: if failed charge, move M inches
export function moveChargersPhase(state) {
  
  return {
    ...state,
    current: STATES.COMBAT_PHASE_START,
    log: [...state.log, "Move chargers phase begins!"]
  }
}

export function combatPhaseStart(state) {
  return {
    ...state,
    current: STATES.ATTACKER_STRIKES,
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

export function breakTestPhase(state, rng) {
  const cr = state.roundData?.combatResult;
  
  // In case combat resolution didn’t run; end the round
  if (!cr) {
    return {
      ...state,
      current: STATES.POST_COMBAT,
      log: [...state.log, "Break test skipped (no combat result)."],
    };
  }
  
  const { winner, winningMargin } = cr;

  if (winner === "draw") {
    return {
      ...state,
      current: STATES.POST_COMBAT,
      log: [...state.log, "Break test skipped (combat is a draw)."]
    };
  }
  
  // Find loser key to access regiment
  const loserKey = winner === "attacker" ? "defender" : "attacker";
  const losingUnit = state[loser];

  // Leadership modifier = LD - winningMargin (never lower than 2)
  const ld = losingUnit.profile.ld;
  const penalty = Math.abs(winningMargin);
  const target = Math.max(2, ld - penalty);
  const ldTest = rng.diceUnderOrEqualSum(2, target);

  // If test is passed, move on to next turn. If failed, mark the loser as fleeing
  const passed = ldTest.passed;
  const updatedLoser = passed ? losingUnit : { ...losingUnit, isFleeing: true };

  return {
    ...state,
    current: STATES.POST_COMBAT,
    [loserKey]: updatedLoser,
    roundData: {
      ...state.roundData,
      breakTest: {
        loser: losingUnit,
        target,
        roll: ldTest.total,
        passed
      }
    },
    log: [...state.log, "Break test phase begins!",
      `Break test for ${losingUnit} (Ld${losingUnit.profile.ld} - ${winningMargin} = ${ldModified}).`,
      `Rolled ${ldTest.total} on 2D6 -> ${passed ? "Passed" : "Failed"}.`
    ]
  }
}

export function postCombatPhase(state) {
  return {
    ...state,
    current: STATES.POST_COMBAT,
    log: [...state.log, "Post combat phase begins!"]
  }
}