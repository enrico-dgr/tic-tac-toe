import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import useStyle from '../../hooks/useStyle';
import style from './style';

interface SelectProps {
  /**
   * Needed for items' keys
   */
  label: string;
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onValueChange: (value: string) => void;
  items: string[];
}

const Select = ({
  label,
  value,
  onValueChange,
  items,
  containerStyle,
  textStyle
}: SelectProps) => {
  const [value_, setValue_] = useState(value);
  const [pick, setPick] = useState(false);
  const style_ = useStyle(style);

  const containerStyle_ = useMemo(
    () => StyleSheet.compose(style_.container, containerStyle),
    [...(containerStyle ? Object.values(containerStyle) : [])]
  );

  const labelStyle_ = useMemo(
    () => StyleSheet.compose(style_.label, textStyle),
    [...(textStyle ? Object.values(textStyle) : [])]
  );

  const pickerItemStyle = useMemo(
    () => StyleSheet.compose(style_.pickerItem, textStyle),
    [...(textStyle ? Object.values(textStyle) : [])]
  );

  useEffect(() => {
    onValueChange(value_);
  }, [value_]);

  return (
    <View style={containerStyle_} onPointerLeave={() => setPick(false)}>
      <Pressable onPress={() => setPick(!pick)}>
        <Text selectable={false} style={labelStyle_}>
          {value_}
        </Text>
      </Pressable>
      {pick && (
        <ScrollView style={style_.picker}>
          {items.map((item) => (
            <Pressable
              key={label + item}
              onPress={() => {
                setValue_(item);
                setPick(false);
              }}
              style={containerStyle_}
            >
              <Text selectable={false} style={pickerItemStyle}>
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Select;
