import { useState } from "react";
import { BOARD_HEIGHT, BOARD_WIDTH, SCALE } from "../data/constants";
import { getFullRanks, getRearRankSize } from "../engine/regiment";

export function UnitBox({ regiment, x, y, facing }) {
  // States
  const [hovered, setHovered] = useState(false);
  
  // Size of regiment rectangle based on ranks and base size, then scale to board
  const frontRank = Math.min(regiment.width, regiment.models);
  const ranks = getFullRanks(regiment);
  const rearRankSize = getRearRankSize(regiment);
  const base = regiment.profile.baseSize;
  const boxWidth = frontRank * base * SCALE; // 100 * 1 = 100mm
  const boxHeight = base * ranks * SCALE;
  
  // Calculate percentage for responive css
  const leftPct = (x / BOARD_WIDTH) * 100;
  const topPct  = (y / BOARD_HEIGHT) * 100;
  const widthPct = (boxWidth / BOARD_WIDTH) * 100; // (100/1600)*100 = 6,25%
  const heightPct = (boxHeight / BOARD_HEIGHT) * 100;

  // Facing: "up" = 0deg, "down" = 180deg
  const rotation = facing === "down" ? "180deg" : "0deg";

  // Generate soldier squares
  const soldiers = [];
  let modelCount = regiment.models;
  for (let r = 0; r < ranks; r++) {
    for (let c = 0; c < frontRank; c++) {
      if (modelCount > 0) {
        soldiers.push(
          <div
            key={`soldier-${r}-${c}`}
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #fff",
              background: regiment.id === "Empire Swordsmen" ? "#a10202" : "#00850f",
            }}
          />
        );
        modelCount--;
      }
    }
  }

  // Add rear rank if any
   if (rearRankSize > 0) {
    for (let c = 0; c < rearRankSize; c++) {
      soldiers.push(
        <div
          key={`soldier-rear-${c}`}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #fff",
            background: regiment.id === "Empire Swordsmen" ? "#a10202" : "#00850f",
          }}
        />
      );
    }
   }
  
  // Info box position: above for attacker, below for defender
  const infoBoxStyle = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: "120px",
    background: "#222",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #fff",
    fontSize: "0.95rem",
    zIndex: 10,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    top: facing === "down" ? "100%" : undefined,
    bottom: facing === "up" ? "100%" : undefined,
    marginTop: facing === "down" ? "8px" : undefined,
    marginBottom: facing === "up" ? "8px" : undefined,
  };

  return (
   <div
    style={{
      position: "absolute",
      left: `${leftPct}%`,
      top: `${topPct}%`,
      width: `${widthPct}%`,
      height: `${heightPct}%`,
    }}
  >
    {/* Regiment box with rotation, so attacker faces up and defender down */}
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${frontRank}, 1fr)`,
        gridTemplateRows: `repeat(${ranks + (rearRankSize > 0 ? 1 : 0)}, 1fr)`,
        gap: "0px",
        boxSizing: "border-box",
        cursor: "pointer",
        transform: `rotate(${rotation})`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {soldiers}
    </div>
    {/* Info box, outside rotation to prevent it being upside down for defender */}
    {hovered && (
      <div style={{
        ...infoBoxStyle,
        top: facing === "down" ? "100%" : undefined,
        bottom: facing === "up" ? "100%" : undefined,
      }}>
        <strong>{regiment.id}</strong> ({regiment.models} models)
      </div>
    )}
  </div>
  )
};