import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  InputModeOptions,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native';
import style from './style';
import useStyle from '../../hooks/useStyle';
import Select from '../Select';

interface CommonProps {
  label: string;
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  onValueChange: (value: string) => void;
}

interface TextInputProps {
  type: 'text';
  inputMode?: InputModeOptions;
}

interface SelectProps {
  type: 'select';
  items: string[];
}

type Props = CommonProps & (TextInputProps | SelectProps);

const InputField: React.FC<Props> = ({
  label,
  value,
  containerStyle,
  onValueChange,
  ...propsByType
}) => {
  const style_ = useStyle(style);

  const containerStyle_ = useMemo(
    () => StyleSheet.compose(style_.container, containerStyle),
    [...(containerStyle ? Object.values(containerStyle) : [])]
  );

  const input = useMemo(() => {
    switch (propsByType.type) {
      case 'text':
        return (
          <TextInput
            style={StyleSheet.compose(style_.inputContainer, style_.inputText)}
            value={value}
            onChangeText={onValueChange}
            inputMode={propsByType.inputMode}
          />
        );
      case 'select':
        return (
          <Select
            containerStyle={style_.inputContainer}
            textStyle={style_.inputText}
            label={label}
            value={value}
            onValueChange={onValueChange}
            items={propsByType.items}
          />
        );
    }
  }, [propsByType.type]);

  return (
    <View style={containerStyle_}>
      <Text style={style_.label}>{label}</Text>
      {input}
    </View>
  );
};

export default InputField;
