# Remediation

## From Azure Portal

1. From Azure Home open the Portal Menu in the top left.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane and ensure that the `Major Version` and the `Minor Version` is set to the latest stable version available (Python 3.11, at the time of writing).

**NOTE**: No action is required if Python version is set to Off, as Python is not used by your web app.

## From Azure CLI

To see the list of supported runtimes:

```sh
az webapp list-runtimes
```

To set latest Python version for an existing app, run the following command:

```sh
az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --windows-fx-version "PYTHON|3.11" --linux-fx-version "PYTHON|3.11"
```

## From PowerShell

As of this writing, there is no way to update an existing application's `SiteConfig` or set the a new application's `SiteConfig` settings during creation via PowerShell.
