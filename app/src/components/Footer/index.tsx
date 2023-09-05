import React, { useMemo } from 'react';
import style from './style';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface FooterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Footer = ({ children, style: styleOverride }: FooterProps) => {
  const containerStyle = useMemo(
    () => StyleSheet.compose(style.container, styleOverride ?? {}),
    [styleOverride]
  );


  return <View style={containerStyle}>{children}</View>;
};

export default Footer;
