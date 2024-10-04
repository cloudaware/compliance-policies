# Description

Resource Logs capture activity to the data access plane while the Activity log is a subscription-level log for the control plane. Resource-level diagnostic logs provide insight into operations that were performed within that resource itself; for example, reading or updating a secret from a Key Vault. Currently, 95 Azure resources support Azure Monitoring (See the more information section for a complete list), including Network Security Groups, Load Balancers, Key Vault, AD, Logic Apps, and CosmosDB. The content of these logs varies by resource type.

A number of back-end services were not configured to log and store Resource Logs for certain activities or for a sufficient length. It is crucial that monitoring is correctly configured to log all relevant activities and retain those logs for a sufficient length of time. Given that the mean time to detection in an enterprise is 240 days, a minimum retention period of two years is recommended.

## Rationale

A lack of monitoring reduces the visibility into the data plane, and therefore an organization's ability to detect reconnaissance, authorization attempts or other malicious activity. Unlike Activity Logs, Resource Logs are not enabled by default. Specifically, without monitoring it would be impossible to tell which entities had accessed a data store that was breached. In addition, alerts for failed attempts to access APIs for Web Services or Databases are only possible when logging is enabled.

## Impact

Costs for monitoring varies with Log Volume. Not every resource needs to have logging enabled. It is important to determine the security classification of the data being processed by the given resource and adjust the logging based on which events need to be tracked. This is typically determined by governance and compliance requirements.

## Audit

### From Azure Portal

The specific steps for configuring resources within the Azure console vary depending on resource, but typically the steps are:

1. Go to the `resource`.
2. Click on `Diagnostic settings`.
3. In the blade that appears, click `Add diagnostic setting`.
4. Configure the diagnostic settings.
5. Click on `Save`.

### From Azure CLI

List all `resources` for a subscription:

```sh
az resource list --subscription <subscription id>
```

For each `resource` run the following:

```sh
az monitor diagnostic-settings list --resource <resource ID>
```

An empty result means a `diagnostic settings` is not configured for that resource. An error message means a `diagnostic settings` is not supported for that resource.

### From PowerShell

Get a list of `resources` in a subscription context and store in a variable:

```ps
$resources = Get-AzResource
```

Loop through each `resource` to determine if a diagnostic setting is configured or not:

```ps
foreach ($resource in $resources) {$diagnosticSetting = Get-AzDiagnosticSetting -ResourceId $resource.id -ErrorAction "SilentlyContinue"; if ([string]::IsNullOrEmpty($diagnosticSetting)) {$message = "Diagnostic Settings not configured for resource: " + $resource.Name;Write-Output $message}else{$diagnosticSetting}}
```

A result of `Diagnostic Settings not configured for resource: <resource name>` means a `diagnostic settings` is not configured for that resource. Otherwise, the output of the above command will show configured `Diagnostic Settings` for a resource.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [cf820ca0-f99e-4f3e-84fb-66e913812d21](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fcf820ca0-f99e-4f3e-84fb-66e913812d21) - **Name**: `Resource logs in Key Vault should be enabled`
- **Policy ID**: [91a78b24-f231-4a8a-8da9-02c35b2b6510](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F91a78b24-f231-4a8a-8da9-02c35b2b6510) - **Name**: `App Service apps should have resource logs enabled`
- **Policy ID**: [428256e6-1fac-4f48-a757-df34c2b3336d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F428256e6-1fac-4f48-a757-df34c2b3336d) - **Name**: `Resource logs in Batch accounts should be enabled`
- **Policy ID**: [057ef27e-665e-4328-8ea3-04b3122bd9fb](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F057ef27e-665e-4328-8ea3-04b3122bd9fb) - **Name**: `Resource logs in Azure Data Lake Store should be enabled`
- **Policy ID**: [c95c74d9-38fe-4f0d-af86-0c7d626a315c](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc95c74d9-38fe-4f0d-af86-0c7d626a315c) - **Name**: `Resource logs in Data Lake Analytics should be enabled`
- **Policy ID**: [83a214f7-d01a-484b-91a9-ed54470c9a6a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F83a214f7-d01a-484b-91a9-ed54470c9a6a) - **Name**: `Resource logs in Event Hub should be enabled`
- **Policy ID**: [383856f8-de7f-44a2-81fc-e5135b5c2aa4](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F383856f8-de7f-44a2-81fc-e5135b5c2aa4) - **Name**: `Resource logs in IoT Hub should be enabled`
- **Policy ID**: [34f95f76-5386-4de7-b824-0d8478470c9d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F34f95f76-5386-4de7-b824-0d8478470c9d) - **Name**: `Resource logs in Logic Apps should be enabled`
- **Policy ID**: [b4330a05-a843-4bc8-bf9a-cacce50c67f4](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fb4330a05-a843-4bc8-bf9a-cacce50c67f4) - **Name**: `Resource logs in Search services should be enabled`
- **Policy ID**: [f8d36e2f-389b-4ee4-898d-21aeb69a0f45](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff8d36e2f-389b-4ee4-898d-21aeb69a0f45) - **Name**: `Resource logs in Service Bus should be enabled`
- **Policy ID**: [f9be5368-9bf5-4b84-9e0a-7850da98bb46](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff9be5368-9bf5-4b84-9e0a-7850da98bb46) - **Name**: `Resource logs in Azure Stream Analytics should be enabled`

## Default Value

By default, Azure Monitor Resource Logs are `Disabled` for all resources.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-5-centralize-security-log-management-and-analysis>
3. <https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/monitor-azure-resource>
4. Supported Log Categories: <https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories>
5. Logs and Audit - Fundamentals: <https://docs.microsoft.com/en-us/azure/security/fundamentals/log-audit>
6. Collecting Logs: <https://docs.microsoft.com/en-us/azure/azure-monitor/platform/collect-activity-logs>
7. Key Vault Logging: <https://docs.microsoft.com/en-us/azure/key-vault/key-vault-logging>
8. Monitor Diagnostic Settings: <https://docs.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest>
9. Overview of Diagnostic Logs: <https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-logs-overview>
10. Supported Services for Diagnostic Logs: <https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-logs-schema>
11. Diagnostic Logs for CDNs: <https://docs.microsoft.com/en-us/azure/cdn/cdn-azure-diagnostic-logs>
