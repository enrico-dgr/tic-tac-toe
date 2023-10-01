import { Connection } from 'mysql2/promise';
import parseError from './parseError';
import parseSuccess from './parseSuccess';

type Deps = {
  from: string;
  /**
   * Fields to retrieve.
   *
   * Converts to `(id, name, ...)`.
   *
   * If undefined is set to `*`
   */
  properties?: string[];
  where: Object;
};

const select =
  (db: Promise<Connection>) =>
  async <T extends Object>({ from, properties, where }: Deps) => {
    // `(id, name)` or `*`
    const fields = properties ? `(${properties.join(', ')})` : '*';
    // `id = ?, name = ?`
    const keysWhere = Object.keys(where)
      .map((k) => k + '= ?')
      .join(', ');
    const valuesWhere = Object.values(where);

    const sql = `SELECT ${fields} FROM ${from} WHERE ${keysWhere}`;

    const cn = await db;

    return cn
      .query(sql, valuesWhere)
      .then(([results, fieldPackets]) => {
        return {
          results: results as T[],
          fieldPackets
        };
      })
      .then(parseSuccess)
      .catch(parseError);
  };

export default select;
