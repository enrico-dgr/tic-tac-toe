import { Text, View } from 'react-native';
import { useState } from 'react';
import style from './style';
import InputField from '../../InputField';
import useStyle from '../../../hooks/useStyle';

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
          type="select"
          items={['3', '4', '5']}
          onValueChange={(text) =>
            setState({
              ...state,
              size: parseInt(text)
            })
          }
          value={String(state.size)}
          containerStyle={{ zIndex: 1 }}
        />
        <InputField
          label="Difficulty"
          type="select"
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
