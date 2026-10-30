# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Identity`.
5. Under the `System assigned` pane, set `Status` to `On`.

## From Azure CLI

To register with Entra ID for an existing app, run the following command:

```sh
az webapp identity assign \
    --resource-group {{resource-group-name}} \
    --name {{app-name}}
```

## From PowerShell

To register with Entra ID for an existing app, run the following command:

```ps
Set-AzWebApp `
    -AssignIdentity $True `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}}
```
