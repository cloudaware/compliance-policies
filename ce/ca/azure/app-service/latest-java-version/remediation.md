# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings` section, click on `Configuration`.
5. Select the `General settings` pane and ensure that for a `Stack` of `Java`, the `Major Version` and `Minor Version` reflect a currently supported release, and that the `Java web server version` is set to the `auto-update` option.

**Note**: No action is required if `Java version` is set to `Off`, as Java is not used by your web app.

## From Azure CLI

To see the list of supported runtimes:

```sh
az webapp list-runtimes
```

To set a currently supported Java version for an existing app, run the following command:

```sh
az webapp config set \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --java-version {{java-version}} \
    --java-container {{java-container}} \
    --java-container-version {{java-container-version}} \
    --windows-fx-version {{java-runtime-version}} \
    --linux-fx-version {{java-runtime-version}}
```

If creating a new application to use a currently supported version of Java, run the following commands. To create an App Service plan:

```sh
az appservice plan create \
    --resource-group {{resource-group-name}} \
    --name {{plan-name}} \
    --location {{location}} \
    --is-linux \
    --number-of-workers {{number-of-workers}} \
    --sku {{pricing-tier}} \
    --hyper-v \
    --sku {{pricing-tier}}
```

Get the app service plan ID:

```sh
az appservice plan list --query "[].{Name:name, ID:id, SKU:sku, Location:location}"
```

To create a new Java web application using the retrieved App Service ID:

```sh
az webapp create \
    --resource-group {{resource-group-name}} \
    --plan {{app-service-plan-id}} \
    --name {{app-name}} \
    --linux-fx-version {{java-runtime-version}} \
    --windows-fx-version {{java-runtime-version}}
```

## From PowerShell

As of this writing, there is no way to update an existing application's `SiteConfig` or set a new application's `SiteConfig` settings during creation via PowerShell.
