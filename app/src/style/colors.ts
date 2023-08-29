export type Theme = 'light' | 'dark';

type ThemeColors = {
  primaryColor: string;
  secondaryColor: string;
  accentColor1: string;
  accentColor2: string;
  backgroundColor: string;
};

const light: ThemeColors = {
  /**
   * This bright blue shade will serve as the primary color for your game-page. It represents a sense of excitement and engagement.
   */
  primaryColor: '#00AEEF',

  /**
   * Use this warm orange tone as the secondary color in your design. It adds energy and playfulness to the overall aesthetic.
   */
  secondaryColor: '#FFB800',

  /**
   * For some extra flair, incorporate this bold pinkish-red hue as an accent color throughout your game-page. It brings a touch of intensity and liveliness.
   */
  accentColor1: '#FF3D71',

  /**
   * Consider using this deep purple shade sparingly to create visual interest or highlight certain elements within your tic tac toe game-page.
   */
  accentColor2: '#9C27B0',

  /**
   * Opt for a light grayish-blue background that provides contrast with the other vibrant colors while maintaining a clean and modern feel.
   */
  backgroundColor: '#F6F8FA'
};

const dark: ThemeColors = {
  /**
   * This vibrant blue hue will serve as the primary color in your dark-themed design.
   */
  primaryColor: '#00AEEF',

  /**
   * Use this warm orange tone as the secondary color to add contrast and visual interest in your dark palette.
   */
  secondaryColor: '#FFB800',

  /**
   * Incorporate this bold pinkish-red accent color sparingly to create focal points or highlight specific elements on your game-page.
   */
  accentColor1: '#FF3D71',

  /**
   * Consider using this deep purple shade selectively to bring depth and richness to certain parts of your design.
   */
  accentColor2: '#9C27B0',

  /**
   * Opt for a solid black background that provides a sleek and stylish base for your dark-themed tic tac toe game-page.
   */
  backgroundColor: '#212121'
};

export const getThemePalette = (theme: Theme): ThemeColors => {
  if (theme === 'light') {
    return light;
  } else {
    return dark;
  }
};
