import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePlaybackClock } from "@/quran/hooks/usePlaybackClock";

function media() {
  const audio = document.createElement("audio");
  audio.src = "/audio/murattal/1.mp3";
  Object.defineProperty(audio, "duration", { configurable: true, value: 51.945583 });
  return audio;
}

describe("media clock synchronization", () => {
  it("reads the actual elapsed time on playback, pause and seeking", () => {
    const audio = media();
    const ref = { current: audio };
    const { result } = renderHook(() => usePlaybackClock(ref, "/audio/murattal/1.mp3"));
    act(() => { audio.currentTime = 12.75; audio.dispatchEvent(new Event("timeupdate")); });
    expect(result.current.currentTime).toBe(12.75);
    expect(result.current.duration).toBe(51.945583);
    act(() => { audio.currentTime = 13.25; audio.dispatchEvent(new Event("pause")); });
    expect(result.current.currentTime).toBe(13.25);
    act(() => result.current.seekTo(80));
    expect(audio.currentTime).toBe(51.945583);
    expect(result.current.currentTime).toBe(51.945583);
  });
  it("discards invalid durations instead of retaining an outdated total", () => {
    const audio = media();
    const ref = { current: audio };
    const { result } = renderHook(() => usePlaybackClock(ref, "/audio/murattal/1.mp3"));
    act(() => audio.dispatchEvent(new Event("loadedmetadata")));
    expect(result.current.duration).toBe(51.945583);
    act(() => {
      Object.defineProperty(audio, "duration", { value: Infinity });
      audio.dispatchEvent(new Event("durationchange"));
    });
    expect(result.current.duration).toBe(0);
    act(() => result.current.seekTo(10));
    expect(audio.currentTime).toBe(0);
  });
  it("resets on a new source and ignores the previous surah's events", () => {
    const audio = media();
    const ref = { current: audio };
    const { result, rerender } = renderHook(({ url }) => usePlaybackClock(ref, url), {
      initialProps: { url: "/audio/murattal/1.mp3" },
    });
    act(() => { audio.currentTime = 40; audio.dispatchEvent(new Event("timeupdate")); });
    expect(result.current.currentTime).toBe(40);
    rerender({ url: "/audio/murattal/2.mp3" });
    act(() => audio.dispatchEvent(new Event("durationchange")));
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
  });
});