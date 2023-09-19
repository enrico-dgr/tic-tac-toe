import { Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import style from './style';
import InputField from '../../InputField';
import useStyle from '../../../hooks/useStyle';
import Button from '../../Button';
import GamesServices from '../../../services/fetch/games';
import Modal from './Modal';

const ConfigurationGameLocal = () => {
  // configuration game component.
  // player can select the number of cells, options are squared values of numbers from 3 to 6

  const style_ = useStyle(style);
  const [state, setState] = useState({
    name: 'default',
    size: 3,
    difficulty: 'normal'
  });

  const onSizeChange = useCallback((text: string) => {
    setState((s) => ({
      ...s,
      size: parseInt(text)
    }));
  }, []);

  const onDifficultyChange = useCallback((text: string) => {
    setState((s) => ({
      ...s,
      difficulty: text
    }));
  }, []);

  const createGame = useCallback(
    () =>
      GamesServices.create({
        body: JSON.stringify(state)
      }),
    [state]
  );

  // Add logic to render UI for configuring game
  return (
    <Modal>
      <View style={style_.configs}>
        <Text style={style_.configTitle}>Configure Game</Text>
        <InputField
          label="Board's size"
          type="select"
          items={['3', '4', '5']}
          onValueChange={onSizeChange}
          value={String(state.size)}
          containerStyle={{ zIndex: 1 }}
        />
        <InputField
          label="Difficulty"
          type="select"
          value={state.difficulty}
          items={['easy', 'normal', 'hard']}
          onValueChange={onDifficultyChange}
        />
      </View>
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <Button text="Create" onPress={createGame} />
      </View>
    </Modal>
  );
};

export default ConfigurationGameLocal;
