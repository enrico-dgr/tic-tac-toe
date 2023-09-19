import { Pressable, Text } from 'react-native';
import useStyle from '../../../hooks/useStyle';
import style from './style';

const GameListItem = ({
  playersNum: players,
  size,
  name,
  onPress
}: {
  playersNum: number;
  size: number;
  name: string;
  onPress: () => void;
}) => {
  const style_ = useStyle(style);

  return (
    <Pressable onPress={onPress} style={style_.item}>
      <Text style={style_.itemText}>{name}</Text>
      <Text style={style_.itemText}>{players}/{size}</Text>
    </Pressable>
  );
};

export default GameListItem;
