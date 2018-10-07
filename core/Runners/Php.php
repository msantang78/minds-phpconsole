<?php
namespace MindsConsole\Core\Runners;

use MindsConsole\Core\Config;
use Exception;
use ParseError;
use Error;

/**
 * Php runner
 */
class Php
{
    /**
     * Run
     */
    public function run($code, $params, $subtype = null)
    {
        $response = [];

        $params = json_decode($params);
        $paramsCount = 0;

        foreach ($params as $key => $value) {
            $paramsCount++;
            $code = '$'.$key.' = "'.$value.'";'.PHP_EOL.$code;
        }

        // Execute the code
        ob_start();
        require '../'.Config::get('prepend');
        $console_execute_start = microtime(true);
        try {
            $status = @eval($code);
        } catch (ParseError $e) {
            $status = $e;
        } catch (Exception $e) {
            $status = $e;
        } catch (Error $e) {
            $status = $e;
        }
        $console_execute_end = microtime(true);
        $output = ob_get_contents();
        ob_end_clean();

        $response['time'] = round(($console_execute_end - $console_execute_start) * 1000);
        $response['output'] = $output;
        $response['output_size'] = strlen($output);
        $response['memory'] = memory_get_usage(true);
        $response['memory_peak'] = memory_get_peak_usage(true);

        if ($status === false || $status instanceof \ParseError || $status instanceof \Error || $status instanceof \Exception) {
            if (!$status) {
                $response['error'] = error_get_last();
            } else {
                $response['error'] = $status->getMessage();
                $response['file'] = $status->getFile();
                $response['line'] = $status->getLine();
                $this->normalizeEvalErrors($response, $paramsCount);
            }
        }

        return $response;
    }

    /**
     * Normalize eval errors
     *
     * @param array $response
     * @return array
     */
    protected function normalizeEvalErrors(&$response, $paramsCount)
    {
        $matches = array();
        $matched = preg_match('/^(.*?) : eval\(\)\'d code$/m',
        $response['file'], $matches);
        if ($matched) {
            $response['file'] = 'the code below';
            $response['line'] -= $paramsCount;
        } else {
            $this->getErrorLines($response);
        }
    }

    /**
     * Format error line
     *
     * @param array $response
     * @return array
     */
    protected function getErrorLines(&$response)
    {
		$file = new \SplFileObject($response['file']);
		$contents = '';
		if (!$file->eof()) {
			$file->seek($response['line']-5);

			for($i = 0; $i < 10 ; $i++) {
				if ($i == 4) $contents .= '<em class="bg-red text-white">';
				$contents.= ($response['line'] -4 + $i) ."\t<b>". $file->current().'</b>';
				if ($i == 4) $contents .= '</em>';
				$file->next();
			}
		}

		$response['section'] = $contents;
	}
}