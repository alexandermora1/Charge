import { UNIT_PROFILES } from "../data/units";
import { createRegiment } from "./regiment";

export const EMPIRE_ARMY = [
  createRegiment("EMPIRE_SWORDSMAN", {
    id: "swordsmen1",
    models: 20,
    width: 5,
    position: { x: 350, y: 200 },
    facing: 0,
    baseSize: 20,
  }),
];

export const ORC_ARMY = [
  createRegiment("ORC_BOY", {
    id: "orcs1",
    models: 15,
    width: 5,
    position: { x: 335, y: 25 },
    facing: 180,
    baseSize: 25,
  }),
];


export function printRegimentSummary(regiment) {
  const profile = UNIT_PROFILES[regiment.profileId];
  const ranks = Math.floor(regiment.models / regiment.width);
  const leftover = regiment.models % regiment.width;

  return `${profile.name} (${regiment.models} models, ${regiment.width} wide → ${ranks} ranks${leftover ? ` + ${leftover} spare` : ""})
WS ${profile.ws}, S ${profile.s}, T ${profile.t}, I ${profile.i}, A ${profile.a}, Ld ${profile.ld}, Save ${profile.save}+`;
}