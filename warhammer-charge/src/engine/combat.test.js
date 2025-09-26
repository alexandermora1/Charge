import { describe, it, expect, vi } from "vitest";
import { resolveMelee } from "./combat";
import { UNIT_PROFILES } from "../data/units";

// Helper: make a regiment instance quickly
const reg = (profileId, models, width) => ({
  id: `${profileId}-${models}`,
  profileId,
  models,
  width,
  hasStandard: false,
  hasMusician: false,
  hasChampion: false,
  position: { x: 0, y: 0 },
  facing: 0,
});

describe("resolveMelee (one-side melee pipeline)", () => {
  it("happy path: hits → wounds → saves (with armour)", () => {
    // Arrange
    const attacker = reg("EMPIRE_SWORDSMAN", 20, 5); // WS4 S3 A1
    const defender = reg("ORC_BOY", 20, 5);         // WS3 T4 Save 6+

    // Deterministic RNG: first call (to-hit), second (to-wound), third (saves)
    const rng = {
      diceOverTargetValue: vi
        .fn()
        // To-hit: need 3+ (WS4 vs WS3 in 7e) → 5 attacks rolled → 3 hits
        .mockReturnValueOnce({ rolls: [6, 2, 5, 4, 1], successes: 3 })
        // To-wound: need 5+ (S3 vs T4) → 3 wound rolls → 2 wounds
        .mockReturnValueOnce({ rolls: [5, 1, 6], successes: 2 })
        // Armour saves: 6+ → 2 save rolls → 1 saved
        .mockReturnValueOnce({ rolls: [6, 2], successes: 1 }),
    };

    // Act
    const { modelsKilled, trace } = resolveMelee(attacker, defender, rng);

    // Assert
    expect(modelsKilled).toBe(1); // 2 wounds - 1 save = 1
    // A couple of key trace lines (don’t over-specify formatting)
    expect(trace.join("\n")).toMatch(/Front rank .* total of 5 attacks/);
    expect(trace.join("\n")).toMatch(/To hit needed: 3\+ \(WS4 vs WS3\)/);
    expect(trace.join("\n")).toMatch(/To wound needed: 5\+ \(S3 vs T4\)/);
    expect(trace.join("\n")).toMatch(/Defenders armour save: 6\+/);
    expect(trace.at(-1)).toMatch(/Models killed: 1/);
  });

  it("no eligible attackers returns zero with a clear trace", () => {
    const attacker = reg("EMPIRE_SWORDSMAN", 0, 5); // 0 models
    const defender = reg("ORC_BOY", 20, 5);

    const rng = {
      diceOverTargetValue: vi.fn(), // shouldn't be called
    };

    const { modelsKilled, trace } = resolveMelee(attacker, defender, rng);

    expect(modelsKilled).toBe(0);
    expect(trace.join("\n")).toMatch(/No eligible attackers/i);
    expect(rng.diceOverTargetValue).not.toHaveBeenCalled();
  });

  it("handles 'no armour save' (save target becomes null)", () => {
    // Create a temporary high-Strength profile to force null save on a 6+ base
    UNIT_PROFILES.TEST_HAMMERER = {
      ...UNIT_PROFILES.EMPIRE_SWORDSMAN,
      id: "TEST_HAMMERER",
      name: "Test Hammerer",
      s: 4, // base 6+ + (S-3)=+1 → 7+ (no save)
    };

    const attacker = reg("TEST_HAMMERER", 20, 5); // WS4 S4 A1
    const defender = reg("ORC_BOY", 20, 5);       // Save 6+

    const rng = {
      diceOverTargetValue: vi
        .fn()
        // To-hit: WS4 vs WS3 → 3+; 5 attacks → say 4 hits
        .mockReturnValueOnce({ rolls: [6, 5, 4, 3, 1], successes: 4 })
        // To-wound: S4 vs T4 → 4+; 4 rolls → say 3 wounds
        .mockReturnValueOnce({ rolls: [6, 2, 5, 4], successes: 3 }),
        // No third call for saves (no armour save)
    };

    const { modelsKilled, trace } = resolveMelee(attacker, defender, rng);

    expect(modelsKilled).toBe(3); // all wounds go through
    expect(trace.join("\n")).toMatch(/No armour save available/);

    // Cleanup the temporary test profile
    delete UNIT_PROFILES.TEST_HAMMERER;
  });
});
