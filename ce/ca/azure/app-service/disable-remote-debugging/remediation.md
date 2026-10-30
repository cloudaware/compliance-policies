# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Configuration`.
5. Under the `General settings` tab, set the `Remote debugging` option to `Off`.

## From Azure CLI

To set remote debugging status to `Off`, run the following command:

```sh
az webapp config set \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --remote-debugging-enabled false
```

## From PowerShell

To set remote debugging status to `Off`, run the following command:

```ps
Set-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}} `
    -RemoteDebuggingEnabled $false
```
