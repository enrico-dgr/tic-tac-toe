import { Theme } from '../style/colors';
import { useColorScheme } from 'react-native';

const useTheme = (): Theme => {
  const theme = useColorScheme() ?? 'light';
  return theme;
};

export default useTheme;