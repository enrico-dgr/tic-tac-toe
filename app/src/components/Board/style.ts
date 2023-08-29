import { StyleSheet } from 'react-native';
import { Theme, getThemePalette } from '../../style/colors';

const cellSide = 100;

export default (theme: Theme) => {
  const palette = getThemePalette(theme);

  return StyleSheet.create({
    cell: {
      width: cellSide,
      height: cellSide,
      borderWidth: 1,
      borderColor: palette.secondaryColor
    },
    board: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  });
};
