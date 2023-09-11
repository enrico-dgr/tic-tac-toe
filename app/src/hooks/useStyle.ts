import { useMemo } from 'react';
import { ImageStyle, Platform, TextStyle, ViewStyle } from 'react-native';
import useTheme from './useTheme';
import { DepsCreatorBuilder, Version } from '../style/create';
import { Device } from '../style/size';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const useStyle = <T extends NamedStyles<T> | NamedStyles<any>>(
  getStyles: (version: Version) => (deps: DepsCreatorBuilder) => T,
  version: Version = 'primary'
) => {
  const theme = useTheme();
  const device: Device = 'Desktop';

  return useMemo(() => getStyles(version)({ theme, device }), [version, theme, device]);
};

export default useStyle;
