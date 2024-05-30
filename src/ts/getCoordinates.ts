import { Corner } from "./Corner";

export function getCoordinates(boxRect: DOMRect, corner: Corner) {
  let x, y;
  switch (corner) {
    case Corner.Center:
      x = boxRect.left + boxRect.width / 2;
      y = boxRect.top + boxRect.height / 2;
      break;
    case Corner.TopLeft:
      x = boxRect.left;
      y = boxRect.top;
      break;
    case Corner.TopRight:
    case Corner.BottomRight:
      x = boxRect.left + boxRect.width;
      y = corner === Corner.TopRight ? boxRect.top : boxRect.top + boxRect.height;
      break;
    case Corner.BottomLeft:
    case Corner.Top:
    case Corner.Bottom:
      x = corner === Corner.BottomLeft ? boxRect.left : boxRect.left + boxRect.width / 2;
      y = corner === Corner.Top ? boxRect.top : boxRect.top + boxRect.height;
      break;
    case Corner.Left:
    case Corner.Right:
      x = corner === Corner.Left ? boxRect.left : boxRect.left + boxRect.width;
      y = boxRect.top + boxRect.height / 2;
      break;
  }
  return [ x, y ];
}