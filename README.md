# Minds PHP Console

## Install

clone to a folder inside the minds proyect

git clone git@github.com:msantang78/minds-phpconsole.git console

open the fpm-php port 8000 and add the volume editing the docker file
 ports:
    - "8000:8000"

 volumes:
    - "./console/:/var/www/Minds/console"


#running
docker-compose exec php-fpm sh
cd ../Minds/console/build
php -S 0.0.0.0:8000 ../server.php