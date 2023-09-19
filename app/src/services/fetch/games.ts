const create = ({ body }: { body: RequestInit['body'] }) =>
  fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });

const GamesServices = {
  create
};

export default GamesServices;
