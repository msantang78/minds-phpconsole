<?php
namespace MindsConsole\Core\Runners;

use Cassandra as Driver;
use Minds\Core;
use Minds\Core\Data\Interfaces;
use Minds\Core\Config;

/**
 * Cql driver
 */
class CqlDriver
{
    private $cluster;
    private $session;
    private $prepared;
    protected $debug;

    public function __construct()
    {
        $config = Config::_()->cassandra;
        $retry_policy = new Driver\RetryPolicy\DowngradingConsistency();

        $this->cluster = Driver::cluster()
        ->withContactPoints(... $config->cql_servers)
        ->withLatencyAwareRouting(true)
        ->withDefaultConsistency(Driver::CONSISTENCY_QUORUM)
        ->withRetryPolicy(new Driver\RetryPolicy\Logging($retry_policy))
        ->withPort(9042)
        ->build();
        $this->session = $this->cluster->connect($config->keyspace);

        $this->debug = (bool) Core\Di\Di::_()->get('Config')->get('minds_debug');
    }

    public function request(Interfaces\PreparedInterface $request, $silent = false)
    {
        $cql = $request->build();

        $statement = $this->session->prepare($cql['string']);
        $future = $this->session->executeAsync(
            $statement,
            new Driver\ExecutionOptions(array_merge(
                [
                    'arguments' => $cql['values']
                ],
                $request->getOpts()
                ))
            );
        if ($silent) {
            return $future;
        } else {
            return $response = $future->get();
        }
    }
}