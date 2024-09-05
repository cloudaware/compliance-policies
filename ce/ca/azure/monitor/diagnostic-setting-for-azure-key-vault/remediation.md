# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. Select a Key vault.
3. Select `Diagnostic settings`.
4. Click `Edit setting` to update an existing diagnostic setting, or `Add diagnostic setting` to create a new one.
5. If creating a new diagnostic setting, provide a name.
6. Configure an appropriate destination.
7. Under `Category groups`, check `audit` and `allLogs`.
8. Click `Save`.

## From Azure CLI

To update an existing `Diagnostic Settings`:

```sh
az monitor diagnostic-settings update --name "<diagnostic_setting_name>" --resource <key_vault_id>
```

To create a new Diagnostic Settings:

```sh
az monitor diagnostic-settings create --name "<diagnostic_setting_name>" --resource <key_vault_id> --logs "[{category:audit,enabled:true},{category:allLogs,enabled:true}]" --metrics "[{category:AllMetrics,enabled:true}]" --event-hub <event_hub_ID> --event-hub-rule <event_hub_auth_rule_ID> | --storage-account <storage_account_ID> |--workspace <log_analytics_workspace_ID> | --marketplace-partner-id <solution_resource_ID>
```

## From PowerShell

Create the `Log` settings object:

```ps
$logSettings = @() $logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -Category audit $logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -Category allLogs
```

Create the `Metric` settings object:

```ps
$metricSettings = @() $metricSettings += New-AzDiagnosticSettingMetricSettingsObject -Enabled $true -Category AllMetrics
```

Create the `Diagnostic Settings` for each `Key Vault`:

```ps
New-AzDiagnosticSetting -Name "<diagnostic_setting_name>" -ResourceId <key_vault_id> -Log $logSettings -Metric $metricSettings [-StorageAccountId <storage_account_ID> | -EventHubName <event_hub_name> -EventHubAuthorizationRuleId <event_hub_auth_rule_ID> | -WorkSpaceId <log analytics workspace ID> | -MarketPlacePartnerId <full resource ID for third-party solution>]
```
