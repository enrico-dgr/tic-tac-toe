import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../redux';
import { useDispatch } from 'react-redux';
import { logout, set } from '../redux/slices/user';

/**
 * Custom hook to get the current user name.
 */
const useUser = () => {
  const dispatch = useDispatch();

  // Get the user name from the Redux store
  const name = useAppSelector(state => state.user.name);

  useEffect(() => {
    // If no user name, try to get it from local storage
    if (name === '') {
      const storageUser = window.localStorage.getItem('user');

      /**
       * @todo Add dynamic type validation
       */
      const user = storageUser ? JSON.parse(storageUser) : undefined;

      // If available, dispatch the user name
      if (user) {
        fetch('http://localhost:3000/users/guest', {
          method: 'GET'
        })
          .then(res => res.json())
          .then(user => {
            dispatch(set(user));
          })
          .catch(() => {
            dispatch(logout(user));
          })
      } else {
        
        // Otherwise fetch a guest user from the API
        fetch('http://localhost:3000/users/guest', {
          method: 'GET'
        })
          .then(res => res.json())
          /**
           * @todo add dynamic type validation
           */
          .then(user => {
            dispatch(set(user));
            window.localStorage.setItem('user', JSON.stringify(user.name));  
          })
          .catch(() => {
            /**
             * @todo Handle error
             */
          });
      }
    }
  }, [name]);

  return name;
};

export default useUser;
