# Minds PHP Console

## Install

Clone to a folder inside the minds project

```
git clone git@github.com:msantang78/minds-phpconsole.git console
```
Install dependecies and build
```
yarn install
yarn build
```

## Configure docker

Open port 8000 and add the volume editing in your php-fpm container in Mind's docker-compose.yml:
```
 ports:
    - "8000:8000"

 volumes:
    - "./console/:/var/www/Minds/console"
```

## Run
```
docker-compose exec php-fpm sh
cd ../Minds/console/build
php -S 0.0.0.0:8000 ../server.php
```

## Development mode
You can run the react app in development mode using
```
yarn start
```
This will reload the page on any change made to a file.

The proxy for the api is already configured to localhost:8000 on package.json
