# Remediation

## From Azure Portal

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Authentication`.
5. If no identity providers are set up, then click `Add identity provider`.
6. Choose other parameters as required and click `Add`.

To disable the `Basic Auth Publishing Credentials` setting, perform the following steps:

1. Log in to the Azure portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings`, select `Configuration`.
5. Select the `General Settings` tab.
6. Under `Platform settings`, ensure `Basic Auth Publishing Credentials` is set to `Off`.

## From Azure CLI

To set App Service Authentication for an existing app, run the following command:

```sh
az webapp auth update \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --enabled true
```

**Note**: Accessing `App Service authentication` settings for a web app using the Microsoft API requires `Website contributor` permission at the subscription level. A custom role can be created in place of `Website contributor` to provide more specific permissions and maintain the principle of least privilege.
