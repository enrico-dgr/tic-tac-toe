import { Text, TextInput, View } from 'react-native';
import { useState } from 'react';

const ConfigurationGameOnline = () => {
  // configuration game component.
  // player can select the number of cells, options are squared values of numbers from 3 to 6

  const [size, setSize] = useState(3);

  // Add logic to render UI for configuring game
  return (
    <View>
      <Text>Configure Game</Text>
      <TextInput
        inputMode="numeric"
        value={String(size)}
        onChangeText={(text) => setSize(parseInt(text))}
      />
    </View>
  );
};

export default ConfigurationGameOnline;
