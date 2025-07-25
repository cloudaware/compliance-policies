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

2. Under `Monitoring`, go to `Diagnostic Settings`.
3. Ensure a diagnostic setting exists that logs `HTTP logs` to a destination aligned to your environment's approach to log consumption (event hub, storage account, etc. dependent on what is consuming the logs such as SIEM or other log aggregation utility).

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [91a78b24-f231-4a8a-8da9-02c35b2b6510](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailAdaptor.ReactView/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F91a78b24-f231-4a8a-8da9-02c35b2b6510) - **Name:** 'App Service apps should have resource logs enabled'
- **Policy ID:** [d639b3af-a535-4bef-8dcf-15078cddf5e2](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailAdaptor.ReactView/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fd639b3af-a535-4bef-8dcf-15078cddf5e2) - **Name:** 'App Service app slots should have resource logs enabled'

## Default Value

Not configured.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
