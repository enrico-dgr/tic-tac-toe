import { StyleSheet } from 'react-native';
import create from '../../style/create';

const cellSide = 100;

export default create(({ palette }) => StyleSheet.create({
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
}));