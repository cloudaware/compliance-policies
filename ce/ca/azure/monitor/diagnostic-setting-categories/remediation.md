# Remediation

## From Azure Portal

1. Go to `Azure Monitor`.
2. Click `Activity log`.
3. Click on `Export Activity Logs`.
4. Select the `Subscription` from the drop down menu.
5. Click `Edit setting` next to a diagnostic setting.
6. Check the following categories: `Administrative`, `Alert`, `Policy`, and `Security`.
7. Choose the destination details according to your organization's needs.
8. Click `Save`.

## From Azure CLI

```sh
az monitor diagnostic-settings subscription create \
    --subscription {{subscription-id}} \
    --name {{diagnostic-setting-name}} \
    --location {{location}} \
    --event-hub {{event-hub-id}} \
    --event-hub-auth-rule {{event-hub-auth-rule-id}} \
    --storage-account {{storage-account-id}} \
    --workspace {{log-analytics-workspace-id}} \
    --logs "[{category:Security,enabled:true},{category:Administrative,enabled:true},{category:Alert,enabled:true},{category:Policy,enabled:true}]"
```

## From PowerShell

```ps
$logCategories = @()
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Administrative -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Security -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Alert -Enabled $true
$logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Policy -Enabled $true

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
