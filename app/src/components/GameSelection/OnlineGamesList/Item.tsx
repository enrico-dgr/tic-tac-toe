import { Pressable, Text } from 'react-native';
import useThemedStyle from '../../../hooks/useThemedStyle';
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
  const themedStyle = useThemedStyle(style);

  return (
    <Pressable onPress={onPress} style={themedStyle.item}>
      <Text style={themedStyle.itemText}>{name}</Text>
      <Text style={themedStyle.itemText}>{players}/{size}</Text>
    </Pressable>
  );
};

export default GameListItem;
