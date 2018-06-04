<?php
namespace MindsConsole\Controllers;

use MindsConsole\Core\Config;

class ExecuteController
{
	/**
	 * Executes a code and returns the result
	 *
	 * @param  string $code
	 *
	 * @return array
	 */
	public function run()
	{
		$code = $_POST['code'];

		// Execute the code
		ob_start();
		require '../'.Config::get('prepend');
		$console_execute_start = microtime(true);
		try {
			$estatus = @eval($code);
		} catch (\ParseError $e) {
			$estatus = $e;
		}
		$console_execute_end = microtime(true);
		$output = ob_get_contents();
		ob_end_clean();

		$response = [];
		if ($estatus === false || $estatus instanceof \ParseError) {
			$response['error'] = !$estatus ? error_get_last() : (string) $e;
		}

		$response['time'] = round(($console_execute_end - $console_execute_start) * 1000);
		$response['output'] = $output;
		$response['output_size'] = strlen($output);
		$response['memory'] = memory_get_usage(true);
		$response['memory_peak'] = memory_get_peak_usage(true);

		return json_encode($response);
	}

	public function lint()
	{
		$errorlevel = 0;
		$output = [];

		if (trim($_POST['code'])) {
			$tmp = tempnam('/tmp', 'mc-' . microtime(true) . '.php');
			$code = '<'. '?php ' . $_POST['code'];
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
