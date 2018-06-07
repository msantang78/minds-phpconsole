#!/bin/bash
(cd .. && docker-compose exec php-fpm sh -c "cd /var/www/Minds/console/build;php -S 0.0.0.0:8000 ../server.php")
