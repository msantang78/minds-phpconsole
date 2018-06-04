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
		$estatus = @eval($code);
		$console_execute_end = microtime(true);
		$output = ob_get_contents();
		ob_end_clean();

        $response = [];
		if ($estatus === false) {
			$response['error'] = error_get_last();
		}

		$response['time'] = round(($console_execute_end - $console_execute_start) * 1000);
		$response['output'] = $output;
		$response['output_size'] = strlen($output);
		$response['memory'] = memory_get_usage(true);
		$response['memory_peak'] = memory_get_peak_usage(true);

		return json_encode($response);
	}
}