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
az monitor diagnostic-settings update \
    --name {{diagnostic-setting-name}} \
    --resource {{key-vault-id}}
```

To create a new Diagnostic Settings:

```sh
az monitor diagnostic-settings create \
    --name {{diagnostic-setting-name}} \
    --resource {{key-vault-id}} \
    --logs "[{category:audit,enabled:true},{category:allLogs,enabled:true}]" \
    --metrics "[{category:AllMetrics,enabled:true}]" \
    --event-hub {{event-hub-id}} \
    --event-hub-rule {{event-hub-auth-rule-id}} \
    --storage-account {{storage-account-id}} \
    --workspace {{log-analytics-workspace-id}} \
    --marketplace-partner-id {{marketplace-partner-id}}
```

## From PowerShell

Create the `Log` settings object:

```ps
$logSettings = @()
$logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -Category audit
$logSettings += New-AzDiagnosticSettingLogSettingsObject -Enabled $true -Category allLogs
```

Create the `Metric` settings object:

```ps
$metricSettings = @()
$metricSettings += New-AzDiagnosticSettingMetricSettingsObject -Enabled $true -Category AllMetrics
```

Create the `Diagnostic Settings` for each `Key Vault`:

```ps
New-AzDiagnosticSetting `
    -Name {{diagnostic-setting-name}} `
    -ResourceId {{key-vault-id}} `
    -Log $logSettings `
    -Metric $metricSettings `
    -StorageAccountId {{storage-account-id}} `
    -EventHubName {{event-hub-name}} `
    -EventHubAuthorizationRuleId {{event-hub-auth-rule-id}} `
    -WorkSpaceId {{log-analytics-workspace-id}} `
    -MarketPlacePartnerId {{marketplace-partner-id}}
```
