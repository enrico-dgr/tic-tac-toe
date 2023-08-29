import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../redux';
import { useDispatch } from 'react-redux';
import { set } from '../redux/slices/user';

const useUser = () => {
  const dispatch = useDispatch();
  const name = useAppSelector((s) => s.user.name);

  useEffect(() => {
    let userName;

    if (!name) {
      const storageUser = window.localStorage.getItem('user');

      userName = JSON.parse(storageUser ?? '{}').name;

      if (typeof userName === 'string') {
        dispatch(set(userName));
      } else {
        fetch('http://localhost:3000/users/guest', {
          method: 'GET'
        })
          .then((res) => res.json())
          .then((user) => {
            dispatch(set(user.name));
            window.localStorage.setItem('user', JSON.stringify(user));
          });
      }
    }
  }, [name]);

  return name;
};

export default useUser;
