import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../redux';
import { useDispatch } from 'react-redux';
import { set } from '../redux/slices/game';

/**
 * Custom hook to get the current game instance.
 */
const useGame = () => {
  const dispatch = useDispatch();

  // Get the game instance from the Redux store
  const { gameName, userName } = useAppSelector((state) => ({
    gameName: state.game.name,
    userName: state.game.name
  }));

  useEffect(() => {
    const userIsLogged = userName !== '';

    // If no game instance, try to get it from local storage
    if (userIsLogged && gameName === '') {
      // Otherwise fetch a guest game from the API
      fetch('http://localhost:3000/games/', {
        method: 'GET'
      })
        .then((res) => res.json())
        /**
         * @todo add dynamic type validation
         */
        .then((game) => {
          dispatch(set(game));
        })
        .catch(() => {
          /**
           * @todo Handle error
           */
        });
    }
  }, [gameName, userName]);

  return gameName;
};

export default useGame;
