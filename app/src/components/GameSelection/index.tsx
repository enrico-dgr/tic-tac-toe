import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import ConfigurationGameLocal from './ConfigurationGame/Local';
import ConfigurationGameOnline from './ConfigurationGame/Online';
import GamesList from './GameList';

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
    <View>
      <Pressable onPress={localConfigs(true)}>
        <Text>Local</Text>
      </Pressable>

      <Pressable onPress={gamesList(true)}>
        <Text>Online {'>'}</Text>
      </Pressable>
      {/* <Link text="Multiplayer" to="/game/multiplayer/lobby" /> */}

      {state.configs.local && <ConfigurationGameLocal />}
      {state.configs.online && <ConfigurationGameOnline />}
      {state.gamesList && (
        <GamesList openConfigs={onlineConfigs(true)} close={gamesList(false)} />
      )}
    </View>
  );
};

export default GameSelection;
