import { StyleSheet } from 'react-native';
import { Theme, getThemePalette } from '../../../style/colors';

export default (theme: Theme) => {
  const palette = getThemePalette(theme);

  return StyleSheet.create({
    container: {
      backgroundColor: palette.backgroundColor,
      position: 'absolute',
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    },
    header: {
      padding: 40,
      marginBottom: 20
    },
    footer: {
      marginTop: 20,
      padding: 40
    },
    list: {
      maxHeight: 200,
      width: 600
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: palette.primaryAccentColor
    },
    itemText: {
      color: palette.primaryColor,
      fontSize: 18
    }
  });
};
