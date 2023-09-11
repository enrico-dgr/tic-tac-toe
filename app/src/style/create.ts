import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme, ThemeColors, getThemePalette } from './colors';
import { Device, DeviceSizes, getDeviceSizes } from './size';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type Version = 'primary' | 'secondary';

export type DepsCreatorBuilder = {
  theme: Theme;
  device: Device;
};

type DepsCreator = {
  version: Version;
  sizes: DeviceSizes;
  palette: ThemeColors;
};

export default <T extends NamedStyles<T> | NamedStyles<any>>(
    styleSheetCreate: (deps: DepsCreator) => T | NamedStyles<T>
  ) =>
  (version: Version) =>
  ({ device, theme }: DepsCreatorBuilder) =>
    StyleSheet.create<T>(
      styleSheetCreate({
        version,
        sizes: getDeviceSizes(device),
        palette: getThemePalette(theme)
      })
    );
