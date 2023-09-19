import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import style from './style';
import useStyle from '../../../hooks/useStyle';

const Modal = ({ children }: PropsWithChildren) => {
  const style_ = useStyle(style);
  return (
    <View style={style_.container}>
      <View style={style_.modal}>{children}</View>
    </View>
  );
};

export default Modal;
