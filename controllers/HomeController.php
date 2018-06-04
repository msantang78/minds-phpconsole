<?php
namespace MindsConsole\Controllers;

class HomeController
{
	public static function index()
	{
        require_once __DIR__.'/../build/index.html';
    }
}