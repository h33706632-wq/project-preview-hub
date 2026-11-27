/** Only the media element's clock is authoritative; unknown lengths stay unknown. */
export function readAudioClock(currentTime: number, duration: number) {
  const length = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const elapsed = Number.isFinite(currentTime) ? Math.max(0, currentTime) : 0;
  return { currentTime: length ? Math.min(elapsed, length) : elapsed, duration: length };
}

export function formatAudioTime(seconds: number) {
  const total = Number.isFinite(seconds) ? Math.floor(Math.max(0, seconds)) : 0;
  return `${Math.floor(total / 3600)}:${String(Math.floor(total / 60) % 60).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function seekAudio(audio: HTMLAudioElement, requested: number) {
  if (!Number.isFinite(requested) || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
  let target = Math.min(Math.max(0, requested), audio.duration);
  // Streaming audio can only seek inside the ranges the browser actually exposes.
  if (!audio.seekable.length) return;
  let nearest = audio.seekable.start(0);
  let distance = Infinity;
  for (let i = 0; i < audio.seekable.length; i += 1) {
    const start = audio.seekable.start(i);
    const end = audio.seekable.end(i);
    if (target >= start && target <= end) { nearest = target; break; }
    const candidate = target < start ? start : end;
    if (Math.abs(candidate - target) < distance) {
      nearest = candidate;
      distance = Math.abs(candidate - target);
    }
  }
  target = nearest;
  try { audio.currentTime = target; } catch { /* Keep the real clock if seeking is unavailable. */ }
}