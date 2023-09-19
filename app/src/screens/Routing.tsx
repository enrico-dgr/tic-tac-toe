import { View } from 'react-native';
import create from '../style/create';
import Game from './Game';
import Home from './Home';
import { Theme, getThemePalette } from '../style/colors';
import useStyle from '../hooks/useStyle';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';

export default function Routing() {
  const style_ = useStyle(style);

  return (
    <View style={style_.container}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/home'} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </NativeRouter>
    </View>
  );
}

const style = create(({ palette }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
