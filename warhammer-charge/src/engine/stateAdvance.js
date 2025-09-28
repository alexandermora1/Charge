import { STATES } from "./states";
import {
  checkRangePhase,
  moveChargersPhase,
  combatPhaseStart,
  attackerStrikesPhase,
  defenderStrikesPhase,
  combatResolutionPhase,
  breakTestPhase,
  postCombatPhase,
  createInitialState,
} from "./stateMachine";

export function advance(state, rng) {
  switch (state.current) {
    case STATES.DECLARE_CHARGE:
      return checkRangePhase(state);
      case STATES.CHECK_RANGE:
        return moveChargersPhase(state);
      case STATES.MOVE_CHARGERS:
        return combatPhaseStart(state);
      case STATES.COMBAT_PHASE_START:
        return attackerStrikesPhase(state, rng);
      case STATES.ATTACKER_STRIKES:
        return attackerStrikesPhase(state, rng);
        case STATES.DEFENDER_STRIKES:
        return defenderStrikesPhase(state, rng);
        case STATES.COMBAT_RESOLUTION:
        return combatResolutionPhase(state);
        case STATES.BREAK_TEST:
        return breakTestPhase(state, rng);
        case STATES.POST_COMBAT:
        return postCombatPhase(state);
      // return { ...state, log: [...state.log, "Turn complete."]}
    default:
      throw new Error(`Unknown state: ${state.current}`);
}}