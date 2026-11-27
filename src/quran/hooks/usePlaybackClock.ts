import { useCallback, useEffect, useState, type RefObject } from "react";
import { measuredDuration, measuredPosition } from "@/quran/lib/playback-time";

/** Read the media clock, not wall time: pauses, buffering and seeks cannot cause drift. */
export function usePlaybackClock(audioRef: RefObject<HTMLAudioElement | null>, expectedUrl: string) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const syncTime = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !expectedUrl || audio.src !== new URL(expectedUrl, window.location.href).href ||
      (audio.currentSrc && audio.currentSrc !== audio.src)) return;
    const length = measuredDuration(audio.duration);
    setDuration(length);
    setCurrentTime(measuredPosition(audio.currentTime, length));
  }, [audioRef, expectedUrl]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    const audio = audioRef.current;
    if (!audio) return;
    const events = ["loadedmetadata", "durationchange", "timeupdate", "seeking", "seeked", "pause", "playing", "ended"];
    for (const event of events) audio.addEventListener(event, syncTime);
    document.addEventListener("visibilitychange", syncTime);
    return () => {
      for (const event of events) audio.removeEventListener(event, syncTime);
      document.removeEventListener("visibilitychange", syncTime);
    };
  }, [audioRef, syncTime]);

  const seekTo = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !expectedUrl || audio.src !== new URL(expectedUrl, window.location.href).href ||
      !measuredDuration(audio.duration) || !Number.isFinite(seconds)) return;
    audio.currentTime = measuredPosition(seconds, audio.duration);
    syncTime();
  }, [audioRef, expectedUrl, syncTime]);

  return { currentTime, duration, setCurrentTime, setDuration, syncTime, seekTo };
}