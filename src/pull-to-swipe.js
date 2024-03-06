const MIN_SWIPE_LENGTH = 150;
const MAX_OFF_PATH = 150;

let startX = null;
let startY = null;
let currentX = null;
let currentY = null;

const cleanUp = () => {
  startX = null;
  startY = null;
  currentX = null;
  currentY = null;
};

const handleStart = (e) => {
  if (e.touches.length !== 1) return;
  startX = e.touches.item(0).clientX;
  startY = e.touches.item(0).clientY;
};

const handleMove = (e) => {
  if (e.touches.length !== 1) return;
  currentX = e.touches.item(0).clientX;
  currentY = e.touches.item(0).clientY;
};

const handleCancel = () => {
  cleanUp();
};

const handleEnd = (callback) => {
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

export const pullToSwipe = (callback) => {
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
