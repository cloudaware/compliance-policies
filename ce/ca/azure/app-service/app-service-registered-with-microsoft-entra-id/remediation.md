# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, Click on `Identity`.
5. Under the `System assigned` pane, set `Status` to `On`.

## From Azure CLI

To register with Entra ID for an existing app, run the following command:

```sh
az webapp identity assign --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME>
```

## From PowerShell

To register with Entra ID for an existing app, run the following command:

```ps
Set-AzWebApp -AssignIdentity $True -ResourceGroupName <resource_Group_Name> -Name <App_Name>
```
