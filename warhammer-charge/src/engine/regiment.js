import { UNIT_PROFILES } from "../data/units";

export function createRegiment(profileId, { id, models, width, baseSize, hasStandard = false, hasMusician = false, hasChampion = false, position = {x:0, y:0}, facing = 0 }) {
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
    baseSize,
  };
}


export function getFullRanks(regiment) {
  return Math.floor(regiment.models / regiment.width);
}


export function getRearRankSize(regiment) {
  return regiment.models % regiment.width;
}


export function removeCasualties(regiment, casualties) {
  const n = Math.max(0, Number.isFinite(casualties) ? casualties : 0)
  const newModels = Math.max(0, regiment.models - n);

  return { ...regiment, models: newModels }
}