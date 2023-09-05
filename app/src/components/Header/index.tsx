import React, { useMemo } from 'react';
import style from './style';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface HeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header = ({ children, style: styleOverride }: HeaderProps) => {
  const containerStyle = useMemo(
    () => StyleSheet.compose(style.container, styleOverride ?? {}),
    [styleOverride]
  );

  return <View style={containerStyle}>{children}</View>;
};

export default Header;
