import { StyleSheet, View } from 'react-native';
import Game from './Game';
import Home from './Home';
import { Theme, getThemePalette } from '../style/colors';
import useThemedStyle from '../hooks/useThemedStyle';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';

export default function Routing() {
  const styleByTheme = useThemedStyle(styles);

  return (
    <View style={styleByTheme.container}>
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

const styles = (theme: Theme) => {
  const palette = getThemePalette(theme);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
};
