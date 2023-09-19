import useStyle from '../../hooks/useStyle';
import socket from '../../services/socket';
import { TouchableOpacity, View } from 'react-native';
import style from './style';

const Cell = (i: number) => {
  const style_ = useStyle(style);

  return (
    <TouchableOpacity
      key={i}
      onPress={() => {
        socket.emit('make move', { cellId: i });
      }}
    >
      <View style={style_.cell} />
    </TouchableOpacity>
  );
};

export default Cell;