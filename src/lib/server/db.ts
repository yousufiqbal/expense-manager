import { Kysely, MysqlDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import { createPool } from 'mysql2';
import { DATABASE_URL } from '$env/static/private'

export const db = new Kysely<DB>({

  dialect: new MysqlDialect({
    pool: createPool({
      uri: DATABASE_URL
    }),
  })

})