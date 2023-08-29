import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import StatusBar from '../../components/StatusBar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { isConnected } from '../../redux/slices/socket';
import style from './style';
import Board from '../../components/Board';
import socket from '../../services/socket';
import Header from '../../components/Header';
import ProfileBar from '../../components/ProfileBar';

const Game = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on('connect', () => dispatch(isConnected(true)));
  }, []);

  return (
    <View style={style.container}>
      <Header>
        <ProfileBar />
        <StatusBar />
      </Header>
      <Board height={3} width={3} />
    </View>
  );
};

export default Game;
