import useThemedStyle from '../../hooks/useThemedStyle';
import socket from '../../services/socket';
import style from './style';
import { TouchableOpacity, View } from 'react-native';

const Cell = (i: number) => {
  const styleByTheme = useThemedStyle(style);

  return (
    <TouchableOpacity
      key={i}
      onPress={() => {
        socket.emit('make move', { cellId: i });
      }}
    >
      <View style={styleByTheme.cell} />
    </TouchableOpacity>
  );
};

export default Cell;
