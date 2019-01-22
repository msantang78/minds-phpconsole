#!/usr/bin/env bash
cd /var/www/Minds/console/build
echo "Starting console…"
php -S 0.0.0.0:8000 ../server.php