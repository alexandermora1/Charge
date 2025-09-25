import { UNIT_PROFILES } from "../data/units";

export function createRegiment(profileId, { id, models, width, hasStandard = false, hasMusician = false, hasChampion = false, position = {x:0, y:0}, facing = 0 }) {
  return {
    id,
    profileId,
    profile: UNIT_PROFILES[profileId],
    models,
    width,
    hasStandard,
    hasMusician,
    hasChampion,
    position,
    facing,
  };
}
