# Remediation

## From Azure Portal

1. In the Azure portal, open the portal menu in the upper left.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings` section, click on `Configuration`.
5. Select the `General settings` pane and ensure that for a `Stack` of `PHP`, the `Major Version` and `Minor Version` reflect the latest stable and supported release.

**Note**: No action is required if `PHP version` is set to `Off` or is set with an empty value, as PHP is not used by your web app.

## From Azure CLI

List the available PHP runtimes:

```sh
az webapp list-runtimes
```

To set the latest PHP version for an existing app, run the following command:

```sh
az webapp config set \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --linux-fx-version {{php-runtime-version}} \
    --php-version {{php-version}}
```

## From PowerShell

To set the latest PHP version for an existing app, run the following command:

```ps
Set-AzWebApp `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{app-name}} `
    -phpVersion {{php-version}}
```

**Note**: Currently there is no way to update an existing web app `Linux FX Version` setting using PowerShell, nor is there a way to create a new web app using PowerShell that configures the PHP runtime in the `Linux FX Version` setting.
