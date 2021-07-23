export function typewrite(duration: number) {
  return {
    visibility: 'visible',
    animation: `type ${duration}ms steps(60, end)`,
  }
}