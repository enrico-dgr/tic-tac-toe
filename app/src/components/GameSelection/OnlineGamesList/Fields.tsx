import { Text, View } from 'react-native';
import useStyle from '../../../hooks/useStyle';
import style from './style';
import { useMemo } from 'react';

const GameListFields = ({ fields }: { fields: string[] }) => {
  const style_ = useStyle(style);
  const fieldsJsx = useMemo(
    () =>
      fields.map((text, i) => (
        <Text key={text + i} style={style_.itemText}>
          {text}
        </Text>
      )),
    fields
  );

  return <View style={style_.item}>{fieldsJsx}</View>;
};

export default GameListFields;
