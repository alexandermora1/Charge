import { describe, it, expect } from "vitest";
import { toHitChart } from "./tables";
import { toWoundChart } from "./tables";
import { armourSave } from "./tables";

describe("toHitChart", () => {
  it("handles attacker better", () => {
    expect(toHitChart(5, 3)).toBe(3);
    expect(toHitChart(4, 3)).toBe(3);
  });

  it("handles equal WS", () => {
    expect(toHitChart(3, 3)).toBe(4);
  });

  it("handles defender advantage up to +3", () => {
    expect(toHitChart(3, 4)).toBe(4);
    expect(toHitChart(3, 5)).toBe(4);
    expect(toHitChart(3, 6)).toBe(4);
  });

  it("handles defender advantage 4 or more", () => {
    expect(toHitChart(3, 7)).toBe(5);
    expect(toHitChart(3, 8)).toBe(5);
  });
});

describe("toWoundChart", () => {
  it("returns correct values", () => {
    expect(toWoundChart(6, 3)).toBe(2);
    expect(toWoundChart(5, 3)).toBe(2);
    expect(toWoundChart(4, 3)).toBe(3);
    expect(toWoundChart(3, 3)).toBe(4);
    expect(toWoundChart(3, 4)).toBe(5);
    expect(toWoundChart(3, 5)).toBe(6);
    expect(toWoundChart(3, 6)).toBe(6);
    expect(toWoundChart(3, 7)).toBe(6);
  });
});

describe("armourSave", () => {
  it("applies modifiers and caps", () => {
    expect(armourSave(2, 3)).toBe(2);
    expect(armourSave(2, 4)).toBe(3);
    expect(armourSave(2, 5)).toBe(4);
    expect(armourSave(2, 6)).toBe(5);
    expect(armourSave(2, 7)).toBe(6);
    expect(armourSave(2, 8)).toBe(null);
  });
});
