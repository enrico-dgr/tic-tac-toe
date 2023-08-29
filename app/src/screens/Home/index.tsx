import React from 'react';
import { View, Text } from 'react-native';
import style from './style';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-native';
import Link from '../../components/Link';

const Home = () => {
  const navigate = useNavigate();

  return (
    <View style={style.container}>
      <Header>
        <Link to="game" text="Game" />
      </Header>
      <Text style={{ color: 'white' }}>Home Screen</Text>
    </View>
  );
};

export default Home;
