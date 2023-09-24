export const setCookie = ({
  name,
  value,
  expDays
}: {
  name: string;
  value: string;
  expDays?: number;
}) => {
  let expires;

  if (expDays) {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);

    expires = 'expires=' + date.toUTCString() + ';';
  }

  document.cookie = `${name}=${value};${expires}path=/`;
};

export const getCookie = (name: string | RegExp) => {
  const regex = typeof name === 'string' ? new RegExp(` *${name}=`) : name;
  let value = '';

  const decodedCookie = decodeURIComponent(document.cookie);

  const cookies = decodedCookie.split(';');

  const cookie = cookies.find((c) => regex.test(c));

  if (cookie) {
    value = cookie.split('=')[1];
  }

  return value;
};
