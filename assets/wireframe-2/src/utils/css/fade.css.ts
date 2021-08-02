export function fade(duration: number) {
  return {
    opacity: 0,
    // transition: `opacity ${duration}ms linear`,
    animation: `fade ${duration}ms linear`,
  }
}