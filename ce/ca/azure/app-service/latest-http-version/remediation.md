# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, Click on `Configuration`.
5. Set `HTTP version` to `2.0` under `General settings`.

**NOTE**: Most modern browsers support HTTP 2.0 protocol over TLS only, while non-encrypted traffic continues to use HTTP 1.1. To ensure that client browsers connect to your app with HTTP/2, either buy an App Service Certificate for your app's custom domain or bind a third party certificate.

## From Azure CLI

To set HTTP 2.0 version for an existing app, run the following command:

```sh
az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --http20-enabled true
```

## From PowerShell

To enable HTTP 2.0 version support, run the following command:

```ps
Set-AzWebApp -ResourceGroupName <app resource group> -Name <app name> -Http20Enabled $true
```
