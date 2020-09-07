# Deploy Server

1. ke config/config.json
```json
"production": {
    "use_env_variable": "DATABASE_URL"
}
```
2. package.json tambahin script di bawah
```json
 "scripts": {
    "start": "node.app.js"
  }
```
3. datfar dan login sesuai step

4.  remote to heroku
```
heroku git:remote -a <app name>
```

5. untuk push 1 folder aja , misal server
```
git subtree push --prefix server heroku master
```
6. tapi kalo udah di root, langsung aja
```
git push heroku master
```

7. klik 
```
https://abdul-fancy-todo.herokuapp.com/ deployed to Heroku
```
8. akan muncul error

9. buka dashboard heroku

10. masuk ke setting , reveal config vars, lalu isi yg diperlukan (ex SECRET, API_KEY) poko nya samain kyk di .env

11. pindah ke overview, configure add-on, lalu cari heroku postgres

12. masuk ke bash heroku >> heroku run bash

13. npm install -g sequelize-cli

14. sequelize db:migrate