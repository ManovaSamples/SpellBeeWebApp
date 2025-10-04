const playSound = (url: string) => {
  try {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(error => {
      // Autoplay may be blocked by the browser.
      console.error("Error playing sound:", error);
    });
  } catch (e) {
      console.error("Could not play sound", e);
  }
};

export const playCorrectSound = () => {
  playSound('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
};

export const playIncorrectSound = () => {
  playSound('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-bass-buzzer-948.mp3');
};

export const playClickSound = () => {
  playSound('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
};
