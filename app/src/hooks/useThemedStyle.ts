import { useMemo } from 'react';
import { Theme } from '../style/colors';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import useTheme from './useTheme';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const useThemedStyle = <T extends NamedStyles<T> | NamedStyles<any>>(
  getStyles: (theme: Theme) => T
) => {
  const theme = useTheme();

  return useMemo(() => getStyles(theme), [theme]);
};

export default useThemedStyle;
