# Minds PHP Console

## Install

clone to a folder inside the minds project

git clone git@github.com:msantang78/minds-phpconsole.git console

## Configure

open port 8000 and add the volume editing in your php-fpm container in Mind's docker-compose.yml:
 ```
 ports:
    - "8000:8000"

 volumes:
    - "./console/:/var/www/Minds/console"
```

## Run
There's a pre-compiled version already included, so you only need to do:
```
docker-compose exec php-fpm sh
cd ../Minds/console/build
php -S 0.0.0.0:8000 ../server.php
```