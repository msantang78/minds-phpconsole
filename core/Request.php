<?php
namespace MindsConsole\Core;

/**
 * Minimalistic request class
 */
class Request
{
    /**
     * Returns request uri without parameters
     * @return string
     */
    public function uri()
    {
        $uri = trim($_SERVER['REQUEST_URI'], '/');
        if ($uri) {
            $uri = strtok($uri ,'?');
        }
        return $uri;
    }

    /**
     * Returns the request method in lowercase
     * @return string
     */
    public function method()
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    /**
     * Returns $name request parameter
     * @param  string $name
     * @return mixed
     */
    public function get($name)
    {
        return @$_REQUEST[$name];
    }
}