import { describe, expect, it } from 'vitest';
import { formatAudioTime, readAudioClock, seekAudio } from '@/quran/lib/audio-clock';

describe('recitation clock', () => {
  it('uses actual media elapsed time and duration without estimation', () => {
    expect(readAudioClock(65.75, 3661.5)).toEqual({ currentTime: 65.75, duration: 3661.5 });
    expect(formatAudioTime(3661.5)).toBe('1:01:01');
  });
  it('never exposes negative or non-finite timing values', () => {
    expect(readAudioClock(NaN, Infinity)).toEqual({ currentTime: 0, duration: 0 });
    expect(formatAudioTime(-10)).toBe('0:00:00');
    expect(readAudioClock(70, 65)).toEqual({ currentTime: 65, duration: 65 });
  });
  it('seeks ten seconds using the actual clock and bounds of the recording', () => {
    const audio = { currentTime: 25, duration: 60, seekable: { length: 1, start: () => 0, end: () => 60 } } as unknown as HTMLAudioElement;
    seekAudio(audio, audio.currentTime + 10);
    expect(audio.currentTime).toBe(35);
    seekAudio(audio, 100);
    expect(audio.currentTime).toBe(60);
    seekAudio(audio, -10);
    expect(audio.currentTime).toBe(0);
  });
  it('does not pretend to seek when duration or seekable data is missing', () => {
    const audio = { currentTime: 25, duration: NaN, seekable: { length: 0 } } as unknown as HTMLAudioElement;
    seekAudio(audio, 35);
    expect(audio.currentTime).toBe(25);
  });
});