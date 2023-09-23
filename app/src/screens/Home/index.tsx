import React from 'react';
import { View } from 'react-native';
import style from './style';
import GameSelection from '../../components/GameSelection';
import { useAppSelector } from '../../redux';
import { Navigate } from 'react-router-native';

const Home = () => {
  const gameName = useAppSelector((state) => state.game.name);

  return (
    <View style={style.container}>
      {gameName !== '' && <Navigate to={'/game'} />}
      <GameSelection />
    </View>
  );
};

export default Home;
