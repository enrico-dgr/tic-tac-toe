import { useAppSelector } from '../../redux';
import { StyleSheet, Text, View } from 'react-native';
import style from './style';
import useUser from '../../hooks/useUser';

export default function ProfileBar() {
  const user = useUser();

  return <Text style={style.text}>{user}</Text>;
}
