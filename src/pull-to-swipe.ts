type AnyCallback = (...args: unknown[]) => unknown;
type Coordinate = number | null;

const MIN_SWIPE_LENGTH = 150;
const MAX_OFF_PATH = 150;

let startX: Coordinate = null;
let startY: Coordinate = null;
let currentX: Coordinate = null;
let currentY: Coordinate = null;

const cleanUp = () => {
  startX = null;
  startY = null;
  currentX = null;
  currentY = null;
};

const handleStart = (e: TouchEvent) => {
  if (e.touches.length !== 1) return;
  startX = e.touches.item(0)?.clientX ?? null;
  startY = e.touches.item(0)?.clientY ?? null;
};

const handleMove = (e: TouchEvent) => {
  if (e.touches.length !== 1) return;
  currentX = e.touches.item(0)?.clientX ?? null;
  currentY = e.touches.item(0)?.clientY ?? null;
};

const handleCancel = () => {
  cleanUp();
};

const handleEnd = (callback: AnyCallback) => {
  if (!startX || !startY || !currentX || !currentY) {
    cleanUp();
    return;
  }

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  const isOnPath = Math.abs(deltaX) < MAX_OFF_PATH;
  const isLongEnough = deltaY > MIN_SWIPE_LENGTH;

  if (isLongEnough && isOnPath) {
    callback();
  }
  cleanUp();
};

export const pullToSwipe = (callback: AnyCallback) => {
  const boundEndHandler = () => handleEnd(callback);

  return {
    init: () => {
      document.addEventListener("touchstart", handleStart, false);
      document.addEventListener("touchmove", handleMove, false);
      document.addEventListener("touchcancel", handleCancel, false);
      document.addEventListener("touchend", boundEndHandler, false);
    },
  };
};
