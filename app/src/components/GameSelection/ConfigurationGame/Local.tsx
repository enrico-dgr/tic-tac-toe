import { Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import style from './style';
import InputField from '../../InputField';
import useStyle from '../../../hooks/useStyle';
import Button from '../../Button';
import GamesServices from '../../../services/fetch/games';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { set } from '../../../redux/slices/game';

/**
 * ConfigurationGameLocal React component.
 *
 * Renders a modal UI to configure options for starting a new local game.
 * Allows the user to set the board size and difficulty level.
 *
 * Uses React state and callbacks to update the configuration locally.
 * Calls the GamesService API to create a new game when user confirms.
 *
 * Renders InputField components for size and difficulty selection.
 * Allows size values from 3 to 5 selected from a dropdown.
 * Difficulty can be set to 'easy', 'normal', or 'hard'.
 *
 * On create game, passes the state object as body for creation.
 */
const ConfigurationGameLocal = () => {
  const style_ = useStyle(style);

  const dispatch = useDispatch();

  // State to store configuration
  const [state, setState] = useState({
    name: 'default',
    size: 3,
    difficulty: 'normal'
  });

  // Callback to update board size
  const onSizeChange = useCallback((text: string) => {
    setState((s) => ({
      ...s,
      size: parseInt(text)
    }));
  }, []);

  // Callback to update difficulty
  const onDifficultyChange = useCallback((text: string) => {
    setState((s) => ({
      ...s,
      difficulty: text
    }));
  }, []);

  // Callback to create new game
  const createGame = useCallback(
    () =>
      GamesServices.create({
        body: JSON.stringify(state)
      }).then(res => res.json())
      .then(game => {
        dispatch(set(game));
      }),
    [state]
  );

  // Render UI for configuring game
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
