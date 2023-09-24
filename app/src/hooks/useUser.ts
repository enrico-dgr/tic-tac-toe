import { useEffect } from 'react';
import { useAppSelector } from '../redux';
import { useDispatch } from 'react-redux';
import { logout, set } from '../redux/slices/user';
import { getCookie, setCookie } from '../utils/cookies';
import UsersHTTPService from '../services/http/users';

/**
 * Custom hook to get the current user name.
 */
const useUser = () => {
  const dispatch = useDispatch();

  // Get the user name from the Redux store
  const name = useAppSelector((state) => state.user.name);

  useEffect(() => {
    // If no user name, try to get it from local storage
    if (name === '') {
      const username = getCookie('user');

      // If available, dispatch the user name
      if (username) {
        UsersHTTPService.getByUsername({
          username
        })
          .then((resUser) => {
            dispatch(set(resUser));
          })
          .catch(() => {
            dispatch(logout());
          });
      } else {
        // Otherwise fetch a new guest user from the API
        UsersHTTPService.getNewGuest().then((resUser) => {
          dispatch(set(resUser));
          setCookie({ name: 'user', value: resUser.name });
        });
      }
    }
  }, [name]);

  return name;
};

export default useUser;
