import React from 'react';
import { Pressable } from 'react-native';
import style from './style';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-native';

type RoutePath = 'home' | 'game';

const Link = ({ text, to }: { text: string; to: RoutePath }) => {
  const navigate = useNavigate();

  return (
    <Pressable style={style.container} onPress={() => navigate('/' + to)}>
      {text}
    </Pressable>
  );
};

export default Link;
