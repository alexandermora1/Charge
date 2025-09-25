// Unit 1 - Empire Swordsman: Human soldier with slightly better training than ordinary soldiers, so has +1 WS
// Unit 2 - Orc Boy: Basic Orc warrior.
// m=movement, ws=weapon skill, bs=ballistic skill, s=strength, t=toughness, w=wounds, i=initiative, a=attacks, ld=leadership, save=armour save

export const UNIT_PROFILES = {
  EMPIRE_SWORDSMAN: {
    id: "EMPIRE_SWORDSMAN",
    name: "Empire Swordsman",
    type: "infantry",
    baseSize: 20,
    m: 4, ws: 4, bs: 3, s: 3, t: 3, w: 1, i: 3, a: 1, ld: 7, save: 5,
    equipment: ["hand-weapon", "shield", "light-armor"],
  },
  ORC_BOY: {
    id: "ORC_BOY",
    name: "Orc Boy",
    type: "infantry",
    baseSize: 25,
    m: 4, ws: 3, bs: 3, s: 3, t: 4, w: 1, i: 2, a: 1, ld: 7, save: 6,
    equipment: ["hand-weapon", "shield"],
  }
};



