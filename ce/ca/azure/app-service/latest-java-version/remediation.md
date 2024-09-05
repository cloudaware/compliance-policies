# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane and ensure that for a `Stack` of `Java` the `Major Version` and `Minor Version` reflect the latest stable and supported release, and that the `Java web server version` is set to the `auto-update` option.

**NOTE**: No action is required if `Java version` is set to `Off`, as Java is not used by your web app.

## From Azure CLI

To see the list of supported runtimes:

```sh
az webapp list-runtimes
```

To set latest Java version for an existing app, run the following command:

```sh
az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --java-version <JAVA_VERSION> --java-container <JAVA_CONTAINER> --java-container-version <JAVA_CONTAINER_VERSION> --windows-fx-version <java runtime version> --linux-fx-version <java runtime version version>
```

If creating a new web application to use a currently supported version of Java, run the following commands. To create an app service plan:

```sh
az appservice plan create --resource-group <resource group name> --name <plan name> --location <location> --is-linux --number-of-workers <int> --sku <pricing tier> --hyper-v --sku <pricing tier>
```

Get the app service plan ID:

```sh
az appservice plan list --query "[].{Name:name, ID:id, SKU:sku, Location:location}"
```

To create a new Java web application using the retrieved app service ID:

```sh
az webapp create --resource-group <resource group name> --plan <app service plan ID> --name <app name> --linux-fx-version <java run time version> --windows-fx-version <java run time version>
```

## From PowerShell

As of this writing, there is no way to update an existing application's `SiteConfig` or set a new application's `SiteConfig` settings during creation via PowerShell.
