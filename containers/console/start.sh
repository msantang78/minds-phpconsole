#!/usr/bin/env bash
cd /var/www/Minds/console

echo "Starting console…"

npm install && npm run build

cd build && php -S 0.0.0.0:8000 ../server.php