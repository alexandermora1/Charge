import { BOARD_HEIGHT, BOARD_WIDTH, SCALE } from "../data/constants";
import { getFullRanks } from "../engine/regiment";

export function UnitBox({ regiment, x, y, facing }) {
  
  // Size of regiment rectangle based on ranks and base size, then scale to board
  const frontRank = Math.min(regiment.width, regiment.models);
  const ranks = getFullRanks(regiment);
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

  return (
    <div
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(-50%, -50%) rotate(${rotation})`,
        width: `${widthPct}%`,
        height: `${heightPct}%`,
        background: regiment.id === "Empire Swordsmen" ? "#a10202" : "#00850f",
        border: "1px solid #fff",
        opacity: regiment.models > 0 ? 1 : 0.3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
        boxSizing: "border-box",
      }}>
      <strong>{regiment.id} ({regiment.models})</strong>
    </div>
  )
};