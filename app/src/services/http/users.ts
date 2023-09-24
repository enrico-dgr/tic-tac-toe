import { flow } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { match } from 'fp-ts/Either';
import { User, UserValidator } from '../../types/user';

const baseUrl = `http://localhost:3000/users`;

const validateUserOrThrow: (i: unknown) => User = flow(
  UserValidator.decode,
  match(
    (e) => {
      throw Error(`Could not validate data: ${failure(e).join('\n')}`);
    },
    (r) => r
  )
);

const getByUsername = ({ username }: { username: string }): Promise<User> =>
  fetch(`${baseUrl}/${username}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then(validateUserOrThrow);

const getNewGuest = (): Promise<User> =>
  fetch(`${baseUrl}/newGuest`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then(validateUserOrThrow);

const UsersHTTPService = {
  getByUsername,
  getNewGuest
};

export default UsersHTTPService;
