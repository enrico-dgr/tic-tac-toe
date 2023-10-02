import { Connection, ResultSetHeader } from 'mysql2/promise';
import parseError from './parseError';
import parseSuccess from './parseSuccess';

type Deps = {
  into: string;
  properties: Object;
};

const insert =
  (db: Promise<Connection>) =>
  async ({ into, properties }: Deps) => {
    const keys = Object.keys(properties).join(', ');
    const values = Object.values(properties);
    const questionMarks = values.map(() => '?').join(', ');

    const sql = `INSERT INTO ${into} (${keys}) VALUES (${questionMarks})`;

    const cn = await db;

    return cn
      .query(sql, values)
      .then(([result, fieldPackets]) => {
        return {
          result: result as ResultSetHeader,
          fieldPackets
        };
      })
      .then(parseSuccess)
      .catch(parseError);
  };

export default insert;
