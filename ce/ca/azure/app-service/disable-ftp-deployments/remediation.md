# Remediation

## From Azure Portal

1. Go to the Azure Portal.
2. Select `App Services`.
3. Click on an app.
4. Select `Settings` and then `Configuration`.
5. Under `General Settings`, for the `Platform Settings`, the `FTP state` should be set to `Disabled` or `FTPS Only`.

## From Azure CLI

For each out of compliance application, run the following choosing either `disabled` or `FtpsOnly` as appropriate:

```sh
az webapp config set --resource-group <resource group name> --name <app name> --ftps-state [disabled|FtpsOnly]
```

## From PowerShell

For each out of compliance application, run the following:

```ps
Set-AzWebApp -ResourceGroupName <resource group name> -Name <app name> -FtpsState <Disabled or FtpsOnly>
```
