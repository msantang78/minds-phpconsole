<?php
namespace MindsConsole\Controllers;

use MindsConsole\Core\Runners\Php;
use MindsConsole\Core\Runners\Sql;
use MindsConsole\Core\Config;
use Error;
use ParseError;
use Exception;

class ExecuteController
{
	/**
     * Executes a code and returns the result
     *
     * @param  string $code
     *
     * @return array
     */
	public function run($request)
	{
		$type = $request->get('type');
		$code = $request->get('code');
		$params = $request->get('params');
		$subtype = $request->get('subtype');

		switch ($type) {
            case 'ace/mode/php':
                $runner = new Php;
                $response = $runner->run($code, $params, $subtype);
                break;
            case 'ace/mode/sql':
                $runner = new Sql;
                $response = $runner->run($code, $params, $subtype);
                break;
            default:
                # code...
                break;
        }

		return json_encode($response);
	}

	public function lint($request)
	{
		$errorlevel = 0;
		$output = [];

		if (trim($request->get('code'))) {
			$tmp = tempnam('/tmp', 'mc-' . microtime(true) . '.php');
			$code = '<'. '?php ' . $request->get('code');
			file_put_contents($tmp, $code);

			exec("php -l {$tmp} 2>&1", $output, $errorlevel);

			unlink($tmp);

			array_walk($output, function (&$line) use ($tmp) {
				$line = str_replace(" in {$tmp}", '', $line);
			});
		}

		array_pop($output);

		return json_encode([
			'pass' => $errorlevel == 0,
			'output' => $output
            ]);
        }
    }
