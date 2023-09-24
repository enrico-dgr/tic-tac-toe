import { setCookie, getCookie } from '../cookies';

describe('setCookie', () => {
  it('sets a cookie', () => {
    setCookie({
      name: 'gameId',
      value: '14'
    });
  });

  it('sets a cookie with expiration', () => {
    setCookie({
      name: 'gameIdExp',
      value: '13',
      expDays: 4
    });
  });
});

describe('getCookie', () => {
  it('gets existing cookie value', () => {
    setCookie({
      name: 'gameId',
      value: '14'
    });

    expect(getCookie('gameId')).toBe('14');
  });

  it('gets existing cookie value with Exp', () => {
    setCookie({
      name: 'gameIdExp',
      value: '13',
      expDays: 4
    });

    expect(getCookie('gameIdExp')).toBe('13');
  });

  it('returns empty string for nonexistent cookie', () => {
    expect(getCookie('no-existing-cookie')).toBe('');
  });
});
