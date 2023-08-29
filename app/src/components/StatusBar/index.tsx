import { useAppSelector } from '../../redux';
import { StyleSheet, Text, View } from 'react-native';
import style from './style';

export default function StatusBar() {
  const isConnected = useAppSelector((state) => state.socket.connected);

  const textStyle = StyleSheet.compose(
    style.common,
    isConnected ? style.connected : style.notConnected
  );

  return <Text style={textStyle}>{isConnected ? 'Connected' : 'Not connected'}</Text>;
}
