import React from 'react';
import { View, Text } from 'react-native';
import style from './style';
import Header from '../../components/Header';
import Link from '../../components/Link';
import GameSelection from '../../components/GameSelection';

const Home = () => {
  return (
    <View style={style.container}>
      <GameSelection />
    </View>
  );
};

export default Home;
