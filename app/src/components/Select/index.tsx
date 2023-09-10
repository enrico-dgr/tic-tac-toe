import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import useStyle from '../../hooks/useStyle';
import style from './style';

interface SelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
}

const Select = ({ label, value, onValueChange, items }: SelectProps) => {
  const [value_, setValue_] = useState(value);
  const [pick, setPick] = useState(false);
  const style_ = useStyle(style);

  useEffect(() => {
    onValueChange(value_);
  }, [value_]);

  return (
    <View style={style_.container}>
      <Pressable onPress={() => setPick(true)}>
        <Text style={style_.label}>{value_}</Text>
      </Pressable>
      {pick && (
        <ScrollView style={style_.picker}>
          {items.map((item) => (
            <Pressable key={label + item} onPress={() => {
              setValue_(item)
              setPick(false);
            }}>
              <Text>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Select;
