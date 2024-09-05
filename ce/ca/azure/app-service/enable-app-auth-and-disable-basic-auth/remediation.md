# Remediation

## From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Setting` section, click on `Authentication`.
5. If no identity providers are set up, then click `Add identity provider`.
6. Choose other parameters as per your requirements and click on `Add`.

To disable the `Basic Auth Publishing Credentials` setting, perform the following steps:

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings`, click on `Configuration`.
5. Click on the `General Settings` tab.
6. Under `Platform settings`, ensure `Basic Auth Publishing Credentials` is set to `Off`.

## From Azure CLI

To set App Service Authentication for an existing app, run the following command:

```sh
az webapp auth update --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --enabled true
```

**Note**: In order to access `App Service authentication` settings for Web app using Microsoft API requires `Website contributor` permission at subscription level. A custom role can be created in place of `Website contributor` to provide more specific permission and maintain the principle of least privileged access.
