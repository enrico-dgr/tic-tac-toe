import React from 'react';
import style from './style';
import { View } from 'react-native';

interface FooterProps {
  children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <View style={style.container}>{children}</View>;
};

export default Footer;
