# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `SSL settings`.
5. Under the `Bindings` pane, set `Minimum TLS Version` to `1.2` under `Protocol Settings` section.

## From Azure CLI

To set the TLS version for an existing app, run the following command:

```sh
az webapp config set \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --min-tls-version 1.2
```

## From PowerShell

```ps
Set-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}} `
    -MinTlsVersion 1.2
```
