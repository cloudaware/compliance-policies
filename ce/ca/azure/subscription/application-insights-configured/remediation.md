# Remediation

## From Azure Portal

1. Navigate to `Application Insights`.
2. Under the `Basics` tab within the `PROJECT DETAILS` section, select the `Subscription`.
3. Select the `Resource group`.
4. Within the `INSTANCE DETAILS`, enter a `Name`.
5. Select a `Region`.
6. Next to `Resource Mode`, select `Workspace-based`.
7. Within the `WORKSPACE DETAILS`, select the `Subscription` for the log analytics workspace.
8. Select the appropriate `Log Analytics Workspace`.
9. Click `Next:Tags >`.
10. Enter the appropriate `Tags` as `Name`, `Value` pairs.
11. Click `Next:Review+Create`.
12. Click `Create`.

## From Azure CLI

```sh
az monitor app-insights component create --app <app name> --resource-group <resource group name> --location <location> --kind "web" --retention-time <INT days to retain logs> --workspace <log analytics workspace ID> --subscription <subscription ID>
```

## From PowerShell

```ps
New-AzApplicationInsights -Kind "web" -ResourceGroupName <resource group name> -Name <app insights name> -location <location> -RetentionInDays <INT days to retain logs> -SubscriptionID <subscription ID> -WorkspaceResourceId <log analytics workspace ID>
```
