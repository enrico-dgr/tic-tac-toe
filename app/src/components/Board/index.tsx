import { StyleSheet, View } from 'react-native';
import style from './style';
import Cell from './Cell';
import useStyle from '../../hooks/useStyle';

type Props = {
  height: number;
  width: number;
};

const Board = ({ height, width }: Props) => {
  const style_ = useStyle(style);

  const boardSize = height * width;
  const boardWidthPx = width * style_.cell.width;
  const boardStyle = StyleSheet.compose(style_.board, { width: boardWidthPx });
  const cells = [];

  for (let i = 0; i < boardSize; i++) {
    cells.push(Cell(i));
  }

  return <View style={boardStyle}>{cells}</View>;
};

export default Board;
