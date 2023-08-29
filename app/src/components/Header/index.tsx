import React from 'react';
import style from './style';
import { View } from 'react-native';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <View style={style.container}>{children}</View>;
};

export default Header;
