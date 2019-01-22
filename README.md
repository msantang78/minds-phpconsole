# Minds PHP Console

## Cloning
Clone to a folder inside the minds project

```
git clone git@github.com:msantang78/minds-phpconsole.git console
```

## Using Docker
Go to Mind's root folder and create a file called `docker-compose.override.yml` with the following content:

```
  console:
    build:
      context: ./console
      dockerfile: ./containers/console/Dockerfile
    volumes:
      - "./console/:/var/www/Minds/console:cached"
      - "./engine/:/var/www/Minds/engine:cached"
    networks:
      - app
    ports:
      - "8000:8000"

```

run:
`docker-compose up -d console`

## Without Docker

### Run
```
docker-compose exec php-fpm sh
cd ../Minds/console/build
php -S 0.0.0.0:8000 ../server.php
```

### Development mode

Install dependecies and build
```
yarn install
```

You can run the react app in development mode using
```
yarn start
```
This will reload the page on any change made to a file.

The proxy for the api is already configured to localhost:8000 inside the package.json
