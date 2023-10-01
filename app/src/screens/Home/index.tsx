import React from 'react';
import { View } from 'react-native';
import style from './style';
import GameSelection from '../../components/GameSelection';
import { useAppSelector } from '../../redux';
import { Navigate } from 'react-router-native';
import Header from '../../components/Header';
import ProfileBar from '../../components/ProfileBar';

const Home = () => {
  const gameName = useAppSelector((state) => state.game.name);

  return (
    <View style={style.container}>
      <Header>
        <ProfileBar />
      </Header>
      {gameName !== '' && <Navigate to={'/game'} />}
      <GameSelection />
    </View>
  );
};

export default Home;
