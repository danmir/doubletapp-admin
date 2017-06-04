#### Admin-panel для doubletapp-api

##### Запуск локально
`REACT_APP_API_URL` - переменная окружения для api. Default: `http://localhost:4000/api`
```sh
$ npm start
```
##### Deploy
Указать `REACT_APP_API_URL` в `Dockerfile`.
```sh
docker build -t <your name>/doubletapp-admin .
docker run -p 3000:3000 <your name>/doubletapp-admin
```
