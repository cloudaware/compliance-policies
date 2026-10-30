# Remediation

Azure Subscriptions should log every access and operation for all resources. Logs should be sent to Storage and a Log Analytics Workspace or an equivalent third-party system. Logs should be kept in readily accessible storage for a minimum of one year, and then moved to inexpensive cold storage for as long as necessary. If retention policies are set but storing logs in a Storage Account is disabled, for example, if only Event Hubs or Log Analytics options are selected, the retention policies have no effect. Enable all monitoring at first, then move data to cold storage more aggressively if the volume becomes a cost concern.

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
az monitor diagnostic-settings create \
    --name {{diagnostic-setting-name}} \
    --resource {{resource-id}} \
    --logs "[{category:{{resource-specific-category}},enabled:true,retention-policy:{enabled:true,days:180}}]" \
    --metrics "[{category:AllMetrics,enabled:true,retention-policy:{enabled:true,days:180}}]" \
    --event-hub {{event-hub-id}} \
    --event-hub-rule {{event-hub-auth-rule-id}} \
    --storage-account {{storage-account-id}} \
    --workspace {{log-analytics-workspace-id}} \
    --marketplace-partner-id {{marketplace-partner-id}}
```

## From PowerShell

Create the `log` settings object:

```ps
$logSettings = @()
$logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -RetentionPolicyDay 180 -RetentionPolicyEnabled $true -Category {{resource-specific-category}}
$logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -RetentionPolicyDay 180 -RetentionPolicyEnabled $true -Category {{resource-specific-category-2}}
```

Create the `metric` settings object:

```ps
$metricSettings = @()
$metricSettings += New-AzDiagnosticSettingMetricSettingsObject -Enabled $true -RetentionPolicyDay 180 -RetentionPolicyEnabled $true -Category AllMetrics
```

Create the `diagnostic setting` for a specific resource:

```ps
New-AzDiagnosticSetting `
    -Name {{diagnostic-setting-name}} `
    -ResourceId {{resource-id}} `
    -Log $logSettings `
    -Metric $metricSettings
```
