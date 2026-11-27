/** Never invent a duration when the media engine has not measured it yet. */
export function measuredDuration(seconds: number): number {
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
}

export function measuredPosition(seconds: number, duration: number): number {
  const position = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const length = measuredDuration(duration);
  return length ? Math.min(position, length) : position;
}

export function formatPlaybackTime(seconds: number): string {
  const total = Math.floor(measuredPosition(seconds, 0));
  return `${Math.floor(total / 3600)}:${String(Math.floor(total / 60) % 60).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}