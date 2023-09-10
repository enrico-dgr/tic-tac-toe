import React from 'react';
import { View, Text, TextInput, InputModeOptions } from 'react-native';
import style from './style';
import useStyle from '../../hooks/useStyle';

interface Props {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  inputMode?: InputModeOptions;
}

const InputField: React.FC<Props> = ({ label, value, onChangeText, inputMode }) => {
  const style_ = useStyle(style);

  return (
    <View style={style_.container}>
      <Text style={style_.label}>{label}</Text>
      <TextInput
        style={style_.input}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
      />
    </View>
  );
};

export default InputField;
