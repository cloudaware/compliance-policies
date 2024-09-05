# Remediation

Azure Subscriptions should log every access and operation for all resources. Logs should be sent to Storage and a Log Analytics Workspace or equivalent third-party system. Logs should be kept in readily-accessible storage for a minimum of one year, and then moved to inexpensive cold storage for a duration of time as necessary. If retention policies are set but storing logs in a Storage Account is disabled (for example, if only Event Hubs or Log Analytics options are selected), the retention policies have no effect. Enable all monitoring at first, and then be more aggressive moving data to cold storage if the volume of data becomes a cost concern.

## From Azure Portal

The specific steps for configuring resources within the Azure console vary depending on resource, but typically the steps are:

1. Go to the `resource`.
2. Click on `Diagnostic settings`.
3. In the blade that appears, click `Add diagnostic setting`.
4. Configure the diagnostic settings.
5. Click on `Save`.

## From Azure CLI

For each `resource`, run the following making sure to use a `resource` appropriate JSON encoded `category` for the `--logs` option:

```sh
az monitor diagnostic-settings create --name <diagnostic settings name> --resource <resource ID> --logs "[{category:<resource specific category>,enabled:true,rentention-policy:{enabled:true,days:180}}]" --metrics "[{category:AllMetrics,enabled:true,retention-policy:{enabled:true,days:180}}]" --event-hub <event hub ID> --event-hub-rule <event hub auth rule ID> | --storage-account <storage account ID> |--workspace <log analytics workspace ID> | --marketplace-partner-id <full resource ID of third-party solution>
```

## From PowerShell

Create the `log` settings object:

```ps
$logSettings = @() $logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -RetentionPolicyDay 180 -RetentionPolicyEnabled $true -Category <resource specific category> $logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -RetentionPolicyDay 180 -RetentionPolicyEnabled $true -Category <resource specific category number 2>
```

Create the `metric` settings object:

```ps
$metricSettings = @() $metricSettings += New-AzDiagnosticSettingMetricSettingsObject -Enabled $true -RetentionPolicyDay 180 -RetentionPolicyEnabled $true -Category AllMetrics
```

Create the `diagnostic setting` for a specific resource:

```ps
New-AzDiagnosticSetting -Name "<diagnostic settings name>" -ResourceId <resource ID> -Log $logSettings -Metric $metricSettings
```
