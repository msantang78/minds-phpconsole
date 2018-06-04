<?php
namespace MindsConsole\Core;

use Request;

/**
 * Minimalistic Router
 */
class Router
{
    const BASE_CONTROLLER_NAMESPACE = 'MindsConsole\Controllers';
    protected $routes  = [];
    protected $request = null;

    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * Dispatch the current request to the cotroller
     */
    public function dispatch()
    {
        $controller = $this->getController($this->request->method(), $this->request->uri());

        try {
            // support for callback controller
            if (is_callable($controller)) {
                echo $controller($this->request);
                return;
            }

            // support for controllers
            if (is_array($controller)) {
                list($controllerName, $method) = $controller;

                $controllerClass = Static::BASE_CONTROLLER_NAMESPACE . '\\' . $controllerName;
                $instance        = new $controllerClass;

                echo $instance->$method($this->request);
                return;
            }
        } catch(\Exception $e) {
            http_response_code (500);
            echo 'Oops an error has occurred in the application';
            return;
        }

        http_response_code (404);
        echo 'Oops!!! the page you are looking for could not be found';
    }

    /**
     * Define a new route
     * @param  string $route
     * @param  string $method
     * @param  mixed $controller Array or a closure
     * @return Router
     */
    public function define($route, $method , $controller)
    {
        $this->routes[$route][$method] = $controller;
        return $this;
    }

    /**
     * Get a controller definition for a route and method
     * @param  string $method
     * @param  string $rute
     * @return mixed  Return an array, a closure or null
     */
    protected function getController($method, $route)
    {
        if (isset($this->routes[$route][$method])) {
            return $this->routes[$route][$method];
        }

        return null;
    }
}