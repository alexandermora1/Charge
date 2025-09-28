import { getFullRanks } from "./regiment";


// Rank bonus = full ranks to a max of 3
export function ranksScore(regiment) {
  return Math.min(3, Math.max(getFullRanks(regiment) - 1));
}

// If a regiment has a standard bearer: +1 point.
export function standardScore(regiment) {
  return regiment.hasStandard ? 1 : 0; 
}

// The side that outnumbers the other gets +1 point. No points if equal.
export function outnumberScore(regiment, opponent) {
  return regiment.models > opponent ? 1 : 0;
}