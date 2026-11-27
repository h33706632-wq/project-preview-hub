import { describe, expect, it } from "vitest";
import { measuredDuration, measuredPosition, formatPlaybackTime } from "@/quran/lib/playback-time";

describe("accurate recitation timing", () => {
  it("uses the measured duration without rounding away its precision", () => {
    expect(measuredDuration(51.945583)).toBe(51.945583);
    expect(measuredDuration(NaN)).toBe(0);
    expect(measuredDuration(Infinity)).toBe(0);
    expect(measuredDuration(-1)).toBe(0);
  });
  it("keeps elapsed time within the recitation and rejects invalid positions", () => {
    expect(measuredPosition(72, 51.945583)).toBe(51.945583);
    expect(measuredPosition(-10, 51.945583)).toBe(0);
    expect(measuredPosition(NaN, 51.945583)).toBe(0);
    expect(measuredPosition(10.75, 51.945583)).toBe(10.75);
  });
  it("formats elapsed whole seconds without premature minute or hour rollover", () => {
    expect(formatPlaybackTime(59.999)).toBe("0:00:59");
    expect(formatPlaybackTime(60)).toBe("0:01:00");
    expect(formatPlaybackTime(3600)).toBe("1:00:00");
    expect(formatPlaybackTime(-1)).toBe("0:00:00");
  });
});