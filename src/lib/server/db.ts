import { Kysely, MysqlDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import { createPool } from 'mysql2';

export const db = new Kysely<DB>({

  dialect: new MysqlDialect({
    pool: createPool({
      host: 'localhost',
      user: 'root',
      password: '486426486426',
      database: 'expense-manager'
    }),
  }),

  // log: event => {
  //   if (event.level === 'query') {
  //     console.log(event.query.sql)
  //     console.log(event.query.parameters)
  //     console.log('\n')
  //   }
  // },

})