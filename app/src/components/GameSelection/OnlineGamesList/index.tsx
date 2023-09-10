import { Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import GameListItem from './Item';
import Header from '../../Header';
import Footer from '../../Footer';
import useThemedStyle from '../../../hooks/useThemedStyle';
import style from './style';
import Button from '../../Button';
import GameListFields from './Fields';

type Game = { id: number; playersNum: number; size: number; name: string };

const GamesList = (props: { close: () => void; openConfigs: () => void }) => {
  // games list component.
  // list all online games, get the games by fetching an api.
  // on every row is showed a game with infos ( players number and grid size ) and the button to join the game

  const themeStyle = useThemedStyle(style);
  const [state, setState] = useState<{ gameIdToJoin: number; games: Game[] }>({
    gameIdToJoin: 0,
    games: []
  });

  const setGameIdToJoin = (gameIdToJoin: number) => setState({ ...state, gameIdToJoin });

  // Add logic to fetch and render list of games
  const setGames = (games: Game[]) => setState({ ...state, games: games });

  useEffect(() => {
    // Fake API call to get list of games
    setGames([
      { id: 1, playersNum: 2, size: 3, name: 'random1' },
      { id: 2, playersNum: 4, size: 4, name: 'random2' }
    ]);
  }, []);

  const gamesList = useMemo(
    () =>
      state.games.map((game) => (
        <GameListItem
          key={game.id}
          name={game.name}
          playersNum={game.playersNum}
          size={game.size}
          onPress={() => setGameIdToJoin(game.id)}
        />
      )),
    [state.games]
  );

  return (
    <View style={themeStyle.container}>
      <Header style={themeStyle.header}>
        <Button onPress={props.close} text="X" version="secondary" />
      </Header>
      <ScrollView style={themeStyle.list}>
        <GameListFields fields={['Name', 'players']} />
        {gamesList}
      </ScrollView>
      <Footer style={themeStyle.footer}>
        <Button onPress={props.openConfigs} text="Create" version="secondary" />
      </Footer>
    </View>
  );
};

export default GamesList;
