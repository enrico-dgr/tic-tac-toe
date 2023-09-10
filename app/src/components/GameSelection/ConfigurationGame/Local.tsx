import { Text, View } from 'react-native';
import { useState } from 'react';
import useThemedStyle from '../../../hooks/useThemedStyle';
import style from './style';
import InputField from '../../InputField';
import useStyle from '../../../hooks/useStyle';
import Select from '../../Select';

const ConfigurationGameLocal = () => {
  // configuration game component.
  // player can select the number of cells, options are squared values of numbers from 3 to 6

  const style_ = useStyle(style);
  const [state, setState] = useState({
    size: 3,
    difficulty: 'normal'
  });

  // Add logic to render UI for configuring game
  return (
    <View style={style_.container}>
      <View style={style_.modal}>
        <Text style={style_.configTitle}>Configure Game</Text>
        <InputField
          label="Board's size"
          inputMode="numeric"
          onChangeText={(text) =>
            setState({
              ...state,
              size: parseInt(text)
            })
          }
          value={String(state.size)}
        />
        <Select
          label="Difficulty"
          value={state.difficulty}
          items={['easy', 'normal', 'hard']}
          onValueChange={(text) =>
            setState({
              ...state,
              difficulty: text
            })
          }
        />
      </View>
    </View>
  );
};

export default ConfigurationGameLocal;
