import { Pressable, StyleSheet, Text } from 'react-native';
import style from './style';
import useStyle from '../../hooks/useStyle';
import { Version } from '../../style/create';
import { useMemo, useState } from 'react';

type Props = { onPress?: () => void; text: string; version?: Version };

const Button = (props: Props) => {
  const style_ = useStyle(style);

  const [state, setState] = useState({
    pressed: false
  });

  const onPressIn = () => setState({ ...state, pressed: true });

  const onPressOut = () => setState({ ...state, pressed: false });

  const pressableStyle = useMemo(
    () => StyleSheet.compose(style_.pressable, state.pressed ? style_.pressed : {}),
    [state.pressed]
  );

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={pressableStyle}
    >
      <Text style={style_.text} selectable={false}>
        {props.text}
      </Text>
    </Pressable>
  );
};
export default Button;
