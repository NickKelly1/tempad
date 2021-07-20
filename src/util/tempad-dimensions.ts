import { Dispatch } from "@reduxjs/toolkit";
import { $Action } from "../store";

const ASPECT_RATIO = 16 / 9;


type Dimensions = { width: number, height: number }
export function tempadDimensions(maximums: HTMLDivElement): Dimensions {
  // maintain aspect ratio of tempad
  const maxDimensions = maximums.getBoundingClientRect();
  const maxHeight = maxDimensions.height;
  const maxWidth = maxDimensions.width;

  // modify width to maintain aspect ratio
  const nextWidth = (1 / ASPECT_RATIO) * maxHeight;
  let fin_height: number;
  let fin_width: number;
  if (nextWidth <= maxWidth) {
    fin_height = maxHeight;
    fin_width = nextWidth;
  } else {
    const nextHeight = ASPECT_RATIO * maxWidth;
    fin_height = nextHeight;
    fin_width = maxWidth;
  }

  return { width: fin_width, height: fin_height };
}