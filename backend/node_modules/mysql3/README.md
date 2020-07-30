## Node MySQL 3

A small OOP wrapper around [mysqljs/mysql](https://github.com/mysqljs/mysql). 


### Installation

```bash
yarn add mysql3
# or
npm i mysql3
```

### Usage

```js
import {ConnectionPool, sql} from 'mysql3';

(async () => {
    const db = new ConnectionPool({
        user: 'AzureDiamond',
        password: 'hunter2',
        host: 'bash.org',
        database: 'irc',
    });
    
    const username = "Cthon98";
    const users = await db.query(sql`select * from users where username=${username}`);

    db.close();
})();
```

See `tests/test.ts` for more.
