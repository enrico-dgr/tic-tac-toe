import { Pressable, Text } from 'react-native';
import useThemedStyle from '../../hooks/useThemedStyle';
import style, { ButtonVersion } from './style';

type Props = { onPress: () => void; text: string; version?: ButtonVersion };

const Button = (props: Props) => {
  const themedStyle = useThemedStyle(style(props.version ?? 'primary'));

  return (
    <Pressable onPress={props.onPress} style={themedStyle.gameOption}>
      <Text style={themedStyle.gameOptionText}>{props.text}</Text>
    </Pressable>
  );
};
export default Button;
