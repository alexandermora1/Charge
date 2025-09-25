import { describe, it, expect, vi, afterEach } from "vitest";
import { rollD6, rollMoreDice, diceOverTargetValue, diceUnderOrEqualSum } from "./rng";


describe("rollD6", () => {
  it("returns a number between 1 and 6", () => {
    for (let i = 0; i < 100; i++) {
      const result = rollD6();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });
});

describe("rollMoreDice", () => {
  it("returns the correct number of dice", () => {
    const rolls = rollMoreDice(5);
    expect(rolls).toHaveLength(5);
    rolls.forEach(r => {
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(6);
    });
  });
});

describe("diceOverTargetValue", () => {
  it("counts successes correctly", () => {
    // Mock Math.random to return fixed values
    // Values: 0 → die=1, 0.9 → die=6
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.9)  // 6
      .mockReturnValueOnce(0.1)  // 1
      .mockReturnValueOnce(0.5); // 4

    const result = diceOverTargetValue(3, 4);

    expect(result.rolls).toEqual([6, 1, 4]);
    expect(result.successes).toBe(2); // 6 and 4 succeed
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});

describe("diceUnderOrEqualSum", () => {
  it("passes if sum is <= target", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.0) // 1
      .mockReturnValueOnce(0.2); // 2

    const result = diceUnderOrEqualSum(2, 5);

    expect(result.rolls).toEqual([1, 2]);
    expect(result.total).toBe(3);
    expect(result.passed).toBe(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
