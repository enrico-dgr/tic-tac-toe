import { StyleSheet } from 'react-native';
import create from '../../style/create';

export default create(({ sizes }) => {
  return StyleSheet.create({
    container: {
      gap: 15,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }
  });
});
