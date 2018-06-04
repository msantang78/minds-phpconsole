<?php
namespace MindsConsole\Core;


/**
 * Config loader
 */
class Config
{
    public static function get($name) {
        $config = include '../config.php';
        return @$config[$name];
    }
}