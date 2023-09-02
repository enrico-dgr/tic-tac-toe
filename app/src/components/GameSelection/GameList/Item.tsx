import { Pressable, Text } from 'react-native';

const GameListItem = ({
  playersNum: players,
  size,
  name,
  onPress
}: {
  playersNum: number;
  size: number;
  name: string;
  onPress: () => void
}) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{name}</Text>
      <Text>Players: {players}</Text>
      <Text>Size: {size}</Text>
    </Pressable>
  );
};

export default GameListItem;
