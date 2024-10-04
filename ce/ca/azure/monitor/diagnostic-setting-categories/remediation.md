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
az monitor diagnostic-settings subscription create --subscription <subscription id> --name <diagnostic settings name> --location <location> --event-hub <event hub ID> --event-hub-auth-rule <event hub auth rule ID> --storage-account <storage account ID> --workspace <log analytics workspace ID> --logs "[{category:Security,enabled:true},{category:Administrative,enabled:true},{category:Alert,enabled:true},{category:Policy,enabled:true}]"
```

## From PowerShell

```ps
$logCategories = @(); $logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Administrative -Enabled $true $logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Security -Enabled $true $logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Alert -Enabled $true $logCategories += New-AzDiagnosticSettingSubscriptionLogSettingsObject -Category Policy -Enabled $true New-AzSubscriptionDiagnosticSetting -SubscriptionId <subscription ID> -Name <Diagnostic settings name> <[-EventHubAuthorizationRule <event hub auth rule ID> -EventHubName <event hub name>] [-StorageAccountId <storage account ID>] [-WorkSpaceId <log analytics workspace ID>] [-MarketplacePartner ID <full ARM Marketplace resource ID>]> -Log $logCategories
```
