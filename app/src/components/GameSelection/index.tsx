import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import ConfigurationGameLocal from './ConfigurationGame/Local';
import ConfigurationGameOnline from './ConfigurationGame/Online';
import OnlineGamesList from './OnlineGamesList';
import style from './style';
import Button from '../Button';
import useStyle from '../../hooks/useStyle';

/**
 * React Native component that displays an interface
 * to select 'local' or 'online'.
 *
 * When clicking 'local', a configuration game window will show up.
 *
 * When clicking 'online', a window with online games list shows up
 * and player can choose:
 * - to enter an existing game -> redirect to game page
 * - create a new one -> configuration window -> redirect to lobby page
 */
const GameSelection = () => {
  const style_ = useStyle(style);
  const [state, setState] = useState({
    configs: {
      local: false,
      online: false
    },
    gamesList: false
  });

  const localConfigs = (open: boolean) => () =>
    setState({ ...state, configs: { ...state.configs, local: open } });

  const onlineConfigs = (open: boolean) => () =>
    setState({ ...state, configs: { ...state.configs, online: open } });

  const gamesList = (open: boolean) => () => setState({ ...state, gamesList: open });

  return (
    <View style={style_.container}>
      <Button onPress={localConfigs(true)} text='Local' />
      <Button onPress={gamesList(true)} text='Online >' />

      {/* <Link text="Multiplayer" to="/game/multiplayer/lobby" /> */}

      {/* {state.configs.local && <ConfigurationGameLocal />} */}
      {/* For development purpose */}
      <ConfigurationGameLocal />

      {state.configs.online && <ConfigurationGameOnline />}
      
      {state.gamesList && (
        <OnlineGamesList openConfigs={onlineConfigs(true)} close={gamesList(false)} />
      )}
    </View>
  );
};

export default GameSelection;


