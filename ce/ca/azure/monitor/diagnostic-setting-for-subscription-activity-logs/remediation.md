# Remediation

## From Azure Portal

To enable Diagnostic Settings on a Subscription:

1. Go to `Monitor`.
2. Click on `Activity Log`.
3. Click on `Export Activity Logs`.
4. Click `+ Add diagnostic setting`.
5. Enter a `Diagnostic setting name`.
6. Select `Categories` for the diagnostic settings.
7. Select the appropriate `Destination details` (this may be Log Analytics, Storage Account, Event Hub, or Partner solution).
8. Click `Save`.

To enable Diagnostic Settings on a specific resource:

1. Go to `Monitor`.
2. Click `Diagnostic settings`.
3. Click on the resource that has a diagnostics status of `disabled`.
4. Select `Add Diagnostic Setting`.
5. Enter a `Diagnostic setting name`.
6. Select the appropriate log, metric, and destination. (this may be Log Analytics, Storage Account, Event Hub, or Partner solution).
7. Click `Save`.

Repeat these steps for all resources as needed.

## From Azure CLI

To configure Diagnostic Settings on a Subscription:

```sh
az monitor diagnostic-settings subscription create \
    --subscription {{subscription-id}} \
    --name {{diagnostic-setting-name}} \
    --location {{location}} \
    --event-hub {{event-hub-id}} \
    --event-hub-auth-rule {{event-hub-auth-rule-id}} \
    --storage-account {{storage-account-id}} \
    --workspace {{log-analytics-workspace-id}} \
    --logs "{{json-encoded-categories}}"
```

To configure Diagnostic Settings on a specific resource:

```sh
az monitor diagnostic-settings create \
    --subscription {{subscription-id}} \
    --resource {{resource-id}} \
    --name {{diagnostic-setting-name}} \
    --event-hub {{event-hub-id}} \
    --event-hub-rule {{event-hub-auth-rule-id}} \
    --storage-account {{storage-account-id}} \
    --workspace {{log-analytics-workspace-id}} \
    --logs {{resource-specific-json-encoded-log-settings}} \
    --metrics {{metric-settings-shorthand-or-json-or-yaml}}
```

## From PowerShell

To configure Diagnostic Settings on a subscription:

```ps
$logCategories = @()
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Administrative -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Security -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category ServiceHealth -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Alert -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Recommendation -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Policy -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Autoscale -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category ResourceHealth -Enabled $true

New-AzSubscriptionDiagnosticSetting `
    -SubscriptionId {{subscription-id}} `
    -Name {{diagnostic-setting-name}} `
    -EventHubAuthorizationRuleId {{event-hub-auth-rule-id}} `
    -EventHubName {{event-hub-name}} `
    -StorageAccountId {{storage-account-id}} `
    -WorkSpaceId {{log-analytics-workspace-id}} `
    -MarketplacePartnerId {{marketplace-partner-id}} `
    -Log $logCategories
```

To configure Diagnostic Settings on a specific resource:

```ps
$logCategories = @()
$logCategories += New-AzDiagnosticSettingLogSettingsObject -Category {{resource-specific-log-category}} -Enabled $true

$metricCategories = @()
$metricCategories += New-AzDiagnosticSettingMetricSettingsObject -Enabled $true -Category {{resource-specific-metric-category-or-allmetrics}}

New-AzDiagnosticSetting `
    -ResourceId {{resource-id}} `
    -Name {{diagnostic-setting-name}} `
    -Log $logCategories `
    -Metric $metricCategories `
    -EventHubAuthorizationRuleId {{event-hub-auth-rule-id}} `
    -EventHubName {{event-hub-name}} `
    -StorageAccountId {{storage-account-id}} `
    -WorkspaceId {{log-analytics-workspace-id}} `
    -MarketplacePartnerId {{marketplace-partner-id}}
```
