import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme, ThemeColors, getThemePalette } from './colors';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type Version = 'primary' | 'secondary';

export default <T extends NamedStyles<T> | NamedStyles<any>>(
    styleSheetCreate: (deps: {
      version: Version;
      theme: Theme;
      palette: ThemeColors;
    }) => T | NamedStyles<T>
  ) =>
  (version: Version) =>
  (theme: Theme) =>
    StyleSheet.create<T>(
      styleSheetCreate({
        version,
        theme,
        palette: getThemePalette(theme)
      })
    );
