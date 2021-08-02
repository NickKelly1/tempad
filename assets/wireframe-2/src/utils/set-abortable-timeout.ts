export function setAbortableTimeout(
  fn: () => any,
  delay: number,
  signal?: undefined | null | AbortSignal,
): undefined | ReturnType<typeof setTimeout> {
  if (signal) {
    if (signal.aborted) return undefined;
    signal.addEventListener('abort', (evt) => {
      clearTimeout(to);
    });
  }
  const to = setTimeout(() => {
    if (signal?.aborted) clearTimeout(to);
    else fn();
  }, delay);
  return to;
}