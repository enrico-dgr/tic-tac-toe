import { Connection, ResultSetHeader } from 'mysql2/promise';
import parseError from './parseError';
import parseSuccess from './parseSuccess';

type Deps = {
  update: string;
  set: Object;
  where: Object;
};

const update =
  (db: Promise<Connection>) =>
  async ({ update, set, where }: Deps) => {
    // `id = ?, name = ?`
    const keysSet = Object.keys(set)
      .map((k) => k + '= ?')
      .join(', ');
    const valuesSet = Object.values(set);

    // `id = ?, name = ?`
    const keysWhere = Object.keys(where)
      .map((k) => k + '= ?')
      .join(', ');
    const valuesWhere = Object.values(where);

    const sql = `UPDATE ${update} SET ${keysSet} WHERE ${keysWhere}`;

    const cn = await db;

    return cn
      .query(sql, [...valuesSet, ...valuesWhere])
      .then(([result, fieldPackets]) => {
        return {
          result: result as ResultSetHeader,
          fieldPackets
        };
      })
      .then(parseSuccess)
      .catch(parseError);
  };

export default update;
