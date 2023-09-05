import { Text, View } from 'react-native';
import useThemedStyle from '../../../hooks/useThemedStyle';
import style from './style';
import { useMemo } from 'react';

const GameListFields = ({ fields }: { fields: string[] }) => {
  const themedStyle = useThemedStyle(style);
  const fieldsJsx = useMemo(
    () =>
      fields.map((text, i) => (
        <Text key={text + i} style={themedStyle.itemText}>
          {text}
        </Text>
      )),
    fields
  );

  return <View style={themedStyle.item}>{fieldsJsx}</View>;
};

export default GameListFields;
