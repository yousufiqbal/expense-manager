import { Kysely, MysqlDialect, RawBuilder, sql } from 'kysely';
import type { DB } from 'kysely-codegen';
import { createPool } from 'mysql2';
import { DATABASE_URL } from '$env/static/private'

export const db = new Kysely<DB>({

  dialect: new MysqlDialect({
    pool: createPool({
      uri: DATABASE_URL
    }),
  }),

  log: event => {
    if (event.level === 'query') {
      console.log(event.query.sql)
      console.log(event.query.parameters)
      console.log('\n')
    }
  },

})

// From discord kosmikas
// select(coalesce(db.fn.sum<bigint>('price'), 0).as('sum'))
export function coalesce<T>(expr: RawBuilder<T>, value: T): RawBuilder<T> {
  return sql`coalesce(${expr}, ${value})`
}
