import { StyleSheet } from 'react-native';
import { Theme, getThemePalette } from '../../style/colors';

export type ButtonVersion = 'primary' | 'secondary';

export default (version: ButtonVersion) => (theme: Theme) => {
  const palette = getThemePalette(theme);

  return StyleSheet.create({
    gameOption: {
      alignItems: 'center',
      borderColor: palette[`${version}Color`],
      borderWidth: 2,
      color: palette[`${version}Color`],
      borderTopLeftRadius: 35,
      borderBottomRightRadius: 35,
      paddingVertical: 15,
      paddingHorizontal: 20,
      width: 150
    },
    gameOptionText: {
      color: palette[`${version}Color`]
    }
  });
};
