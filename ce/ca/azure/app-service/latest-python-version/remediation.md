# Remediation

## From Azure Portal

1. In the Azure portal, open the portal menu in the upper left.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings` section, click on `Configuration`.
5. Select the `General settings` pane and ensure that the `Major Version` and `Minor Version` are set to a currently supported release.

**Note**: No action is required if `Python version` is set to `Off`, as Python is not used by your web app.

## From Azure CLI

To see the list of supported runtimes:

```sh
az webapp list-runtimes
```

To set the latest Python version for an existing app, run the following command:

```sh
az webapp config set \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --windows-fx-version "PYTHON|{{python-version}}" \
    --linux-fx-version "PYTHON|{{python-version}}"
```

## From PowerShell

As of this writing, there is no way to update an existing application's `SiteConfig` or set a new application's `SiteConfig` settings during creation via PowerShell.
