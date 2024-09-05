# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, Click on `SSL settings`.
5. Under the `Bindings` pane, set `Minimum TLS Version` to `1.2` under `Protocol Settings` section.

## From Azure CLI

To set TLS Version for an existing app, run the following command:

```sh
az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --min-tls-version 1.2
```

## From PowerShell

```ps
Set-AzWebApp -ResourceGroupName <RESOURCE_GROUP_NAME> -Name <APP_NAME> -MinTlsVersion 1.2
```
