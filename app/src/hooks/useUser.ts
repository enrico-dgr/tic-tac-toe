import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../redux';
import { useDispatch } from 'react-redux';
import { set } from '../redux/slices/user';

/**
 * Custom hook to get the current user name.
 */
const useUser = () => {
  const dispatch = useDispatch();

  // Get the user name from the Redux store
  const name = useAppSelector(state => state.user.name);

  useEffect(() => {
    let userName;

    // If no user name, try to get it from local storage
    if (!name) {
      const storageUser = window.localStorage.getItem('user');

      userName = JSON.parse(storageUser ?? '{}').name;

      // If got a string, dispatch the user name
      if (typeof userName === 'string') {
        dispatch(set(userName)); 
      } else {
        
        // Otherwise fetch a guest user from the API
        fetch('http://localhost:3000/users/guest', {
          method: 'GET'
        })
          .then(res => res.json())
          .then(user => {
            dispatch(set(user.name));
            window.localStorage.setItem('user', JSON.stringify(user));  
          });
      }
    }
  }, [name]);

  return name;
};

export default useUser;
