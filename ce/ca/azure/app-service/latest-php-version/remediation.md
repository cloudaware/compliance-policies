# Remediation

## From Azure Portal

1. From Azure Home open the Portal Menu in the top left.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane, ensure that for a `Stack` of `PHP` the `Major Version` and `Minor Version` reflect the latest stable and supported release.

**NOTE**: No action is required If `PHP version` is set to `Off` or is set with an empty value as PHP is not used by your web app.

## From Azure CLI

List the available PHP runtimes:

```sh
az webapp list-runtimes
```

To set latest PHP version for an existing app, run the following command:

```sh
az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --linux-fx-version <PHP_RUNTIME_VERSION> --php-version <PHP_VERSION>
```

## From PowerShell

To set latest PHP version for an existing app, run the following command:

```ps
Set-AzWebApp -ResourceGroupName <RESOURCE_GROUP_NAME> -Name <APP_NAME> -phpVersion <PHP_VERSION>
```

**NOTE**: Currently there is no way to update an existing web app `Linux FX Version` setting using PowerShell, nor is there a way to create a new web app using PowerShell that configures the PHP runtime in the `Linux FX Version` setting.
