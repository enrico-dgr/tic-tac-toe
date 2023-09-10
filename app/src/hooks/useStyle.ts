import { useMemo } from 'react';
import { Theme } from '../style/colors';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import useTheme from './useTheme';
import { Version } from '../style/create';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const useStyle = <T extends NamedStyles<T> | NamedStyles<any>>(
  getStyles: (version: Version) => (theme: Theme) => T,
  version: Version = 'primary'
) => {
  const theme = useTheme();

  return useMemo(() => getStyles(version)(theme), [theme, version]);
};

export default useStyle;
