# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Configuration`.
5. Set `HTTP version` to `2.0` under `General settings`.

**Note**: Most modern browsers support HTTP 2.0 over TLS only, while non-encrypted traffic continues to use HTTP 1.1. To ensure that client browsers connect to your app with HTTP/2, either buy an App Service Certificate for your app's custom domain or bind a third-party certificate.

## From Azure CLI

To set HTTP 2.0 version for an existing app, run the following command:

```sh
az webapp config set \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --http20-enabled true
```

## From PowerShell

To enable HTTP 2.0 version support, run the following command:

```ps
Set-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}} `
    -Http20Enabled $true
```
