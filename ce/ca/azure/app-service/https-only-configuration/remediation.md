# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. For each App Service, do the following:
4. Under `Settings`, select `Configuration`.
5. Under the `General Settings` tab, set `HTTPS Only` to `On` under `Platform Settings`.

## From Azure CLI

To set HTTPS-only traffic value for an existing app, run the following command:

```sh
az webapp update \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --set httpsOnly=true
```

## From PowerShell

```ps
Set-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}} `
    -HttpsOnly $true
```
