# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, Click on `Configuration`.
5. Under the `General settings` tab, set the `Remote debugging` option to `Off`.

## From Azure CLI

To set remote debugging status to off, run the following command:

```sh
az webapp config set --resource-group <resource_group_name> --name <app_name> --remote-debugging-enabled false
```

## From PowerShell

To set remote debugging status to off, run the following commandЖ

```ps
Set-AzWebApp -ResourceGroupName <resource_group_name> -Name <app_name> -RemoteDebuggingEnabled $false
```
