# Description

Enable AppServiceHTTPLogs diagnostic log category for Azure App Service instances to ensure all http requests are captured and centrally logged.

## Rationale

Capturing web requests can be important supporting information for security analysts performing monitoring and incident response activities. Once logging, these logs can be ingested into SIEM or other central aggregation point for the organization.

## Impact

Log consumption and processing will incur additional cost.

## Audit

### From Azure Portal

1. Go to `App Services`.

For each `App Service`:

2. Go to `Diagnostic Settings`.
3. Ensure that 'HTTP logs' is configured to log to a destination aligned to your environments approach to log consumption (event hub, storage account, etc. dependent on what is consuming the logs such as SIEM or other log aggregation utility).

## Default Value

Not configured.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
