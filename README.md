## Skeleton Quasar

### Start environment
```
$ cp .env.js.develop .env.js
$ cp quasar.env.example quasar.env
$ cp docker-compose.yml.develop docker-compose.yml
$ docker-compose up -d
```

### Build example in /docs
```
$ docker exec -it skeleton-quasar-app sh /var/www/app/quasar.build.sh
```

### Open in browser
```
$ xdg-open http://localhost:8000 </dev/null &>/dev/null &
```
