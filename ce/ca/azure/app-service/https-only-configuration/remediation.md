# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Click on configuration.
5. Under the `HTTPS Only` heading select `On` to enable https only.
6. Click `Save` at the top.

## From Azure CLI

To set HTTPS-only traffic value for an existing app, run the following command:

```sh
az webapp update --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --set httpsOnly=true
```

## From PowerShell

```ps
Set-AzWebApp -ResourceGroupName <RESOURCE_GROUP_NAME> -Name <APP_NAME> -HttpsOnly $true
```
