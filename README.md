#### Admin-panel для doubletapp-api

##### Запуск локально
`REACT_APP_API_URL` - переменная окружения для api. Default: `http://localhost:4000/api`
```sh
$ PORT=4005 npm start
```
##### Deploy
Указать `REACT_APP_API_URL` в `Dockerfile`.
```sh
docker build -t <your name>/doubletapp-admin .
docker run -p 4000:4005 <your name>/doubletapp-admin
```
