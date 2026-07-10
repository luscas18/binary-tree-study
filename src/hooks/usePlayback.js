import { useEffect, useRef, useState } from 'react';

export const SPEEDS = { slow: 1400, normal: 800, fast: 350 };

// Generic step-by-step playback controller: play/pause, step back/forward,
// adjustable speed. `onComplete` fires once per run, when stepIdx first reaches length.
export function usePlayback(length, onComplete) {
  const [stepIdx, setStepIdx]   = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [speed, setSpeed]       = useState('normal');
  const timerRef      = useRef(null);
  const completedRef  = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!playing || stepIdx >= length) return;
    const isLast = stepIdx + 1 >= length;
    timerRef.current = setTimeout(() => {
      setStepIdx((i) => Math.min(i + 1, length));
      if (isLast) setPlaying(false);
    }, SPEEDS[speed]);
    return () => clearTimeout(timerRef.current);
  }, [playing, stepIdx, length, speed]);

  useEffect(() => {
    if (length > 0 && stepIdx >= length && !completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [stepIdx, length]);

  function play() { setPlaying(true); }
  function pause() { setPlaying(false); clearTimeout(timerRef.current); }
  function stepForward() {
    pause();
    setStepIdx((i) => Math.min(i + 1, length));
  }
  function stepBack() {
    pause();
    setStepIdx((i) => Math.max(i - 1, 0));
  }
  function reset() {
    pause();
    completedRef.current = false;
    setStepIdx(0);
  }

  return { stepIdx, playing, speed, setSpeed, play, pause, stepForward, stepBack, reset };
}
