<?php
namespace MindsConsole\Core\Runners;

use Minds\Core\Di\Di;
use Minds\Core\Data\Cassandra\Prepared;
use MindsConsole\Core\Config;
use Exception;
use ParseError;
use Error;

/**
 * Sql runner
 */
class Sql
{
    /**
     * Run
     */
    public function run($code, $params, $subtype = null)
    {
        $response = [];

        // Execute the code
        ob_start();
        require '../'.Config::get('prepend');
        $console_execute_start = microtime(true);
        try {
            if ($subtype === 'sql') {
                $db = Di::_()->get('Database\PDO');
                $statement = $db->prepare($code);
                $statement->execute();
                $output = $statement->fetchAll(\PDO::FETCH_ASSOC);
            } else {
                $cql = new CqlDriver;
                $prepared = new Prepared\Custom();
                $prepared->query($code);
                $output = $cql->request($prepared);
                if ($output) {
                    $result = [];
                    foreach ($output as $key => $value) {
                        $result[] = $value;
                    }
                    $output = $result;
                }
            }
        } catch (Exception $e) {
            $status = $e;
        } catch (Error $e) {
            $status = $e;
        }

        $console_execute_end = microtime(true);

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
            }
        }

        return $response;
    }


}