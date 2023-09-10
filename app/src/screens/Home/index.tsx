import React from 'react';
import { View } from 'react-native';
import style from './style';
import GameSelection from '../../components/GameSelection';

const Home = () => {
  return (
    <View style={style.container}>
      <GameSelection />
    </View>
  );
};

export default Home;
