import { useEffect, useState, type RefObject } from "react";
import { readAudioClock } from "@/quran/lib/audio-clock";

export function useAudioClock(ref: RefObject<HTMLAudioElement | null>, sourceKey: string) {
  const [clock, setClock] = useState({ sourceKey, currentTime: 0, duration: 0 });
  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    let frame = 0;
    const sync = () => {
      if (audio.dataset['sourceKey'] !== sourceKey) return;
      const next = readAudioClock(audio.currentTime, audio.duration);
      setClock(previous => previous.sourceKey === sourceKey && previous.currentTime === next.currentTime && previous.duration === next.duration
        ? previous : { sourceKey, ...next });
    };
    const tick = () => {
      sync();
      if (!audio.paused && !audio.ended) frame = requestAnimationFrame(tick);
    };
    const start = () => { cancelAnimationFrame(frame); tick(); };
    const stop = () => { cancelAnimationFrame(frame); sync(); };
    const events = ['loadedmetadata', 'durationchange', 'timeupdate', 'seeking', 'seeked', 'emptied', 'loadeddata'] as const;
    events.forEach(event => audio.addEventListener(event, sync));
    audio.addEventListener('playing', start);
    audio.addEventListener('pause', stop);
    audio.addEventListener('ended', stop);
    document.addEventListener('visibilitychange', sync);
    sync();
    if (!audio.paused) start();
    return () => {
      cancelAnimationFrame(frame);
      events.forEach(event => audio.removeEventListener(event, sync));
      audio.removeEventListener('playing', start);
      audio.removeEventListener('pause', stop);
      audio.removeEventListener('ended', stop);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [ref, sourceKey]);
  return clock.sourceKey === sourceKey ? clock : { currentTime: 0, duration: 0 };
}