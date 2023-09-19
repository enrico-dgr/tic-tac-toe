import { Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import Modal from './Modal';
import style from './style';
import useStyle from '../../../hooks/useStyle';
import Button from '../../Button';

const ConfigurationGameOnline = () => {
  // configuration game component.
  // player can select the number of cells, options are squared values of numbers from 3 to 6
  
  const style_ = useStyle(style);
  const [size, setSize] = useState(3);

  // Add logic to render UI for configuring game
  return (
    <Modal>
      <View style={style_.configs}>
        <Text>Configure Game</Text>
        <TextInput
          inputMode="numeric"
          value={String(size)}
          onChangeText={(text) => setSize(parseInt(text))}
        />
      </View>
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <Button text="Create" />
      </View>
    </Modal>
  );
};

export default ConfigurationGameOnline;
