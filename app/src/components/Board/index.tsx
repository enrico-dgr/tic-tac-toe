import { StyleSheet, View } from 'react-native';
import style from './style';
import Cell from './Cell';
import useThemedStyle from '../../hooks/useThemedStyle';

type Props = {
  height: number;
  width: number;
};

const Board = ({ height, width }: Props) => {
  const styleByTheme = useThemedStyle(style);

  const boardSize = height * width;
  const boardWidthPx = width * styleByTheme.cell.width;
  const boardStyle = StyleSheet.compose(styleByTheme.board, { width: boardWidthPx });
  const cells = [];

  for (let i = 0; i < boardSize; i++) {
    cells.push(Cell(i));
  }

  return <View style={boardStyle}>{cells}</View>;
};

export default Board;
