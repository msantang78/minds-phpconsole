<?php
require 'autoload.php';

Autoloader::register('MindsConsole\\Controllers\\', 'controllers');
Autoloader::register('MindsConsole\\Core\\', 'core');

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);
if ($uri !== '/' && file_exists(__DIR__.'/build/'.$uri)) {
    return false;
}


/**
 * Create router, define rutes and dispatch the request
 */
$router = new MindsConsole\Core\Router(new MindsConsole\Core\Request);

$router
    ->define('', 'get', ['HomeController', 'index']) // home route /
    ->define('api/execute', 'post', ['ExecuteController', 'run'])
    ->define('api/lint', 'post', ['ExecuteController', 'lint'])
    ->dispatch();



