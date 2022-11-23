import { Kysely, MysqlDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import { createPool } from 'mysql2';
import { DATABASE_URL } from '$env/static/private'

export const db = new Kysely<DB>({

  dialect: new MysqlDialect({
    pool: createPool({
      uri: DATABASE_URL
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