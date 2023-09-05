import { StyleSheet } from 'react-native';
import { Theme, getThemePalette } from '../../style/colors';

export default (theme: Theme) => {
  const palette = getThemePalette(theme);

  return StyleSheet.create({
    container: {
      gap: 15,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    },
  });
};
