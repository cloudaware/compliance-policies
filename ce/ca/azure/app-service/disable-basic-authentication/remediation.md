# Remediation

## From Azure Portal

1. Search for and open `App Services` from the search bar.
2. For each App Service listed, do the following:
3. Select the App Service name.
4. Under the `Settings` menu item, click on `Configuration`.
5. Under the `General settings` tab, scroll down to locate the two Basic Auth settings:
    - Set the `SCM Basic Auth Publishing Credentials` radio button to `Off`.
    - Set the `FTP Basic Auth Publishing Credentials` radio button to `Off`.

**CAUTION**: The new settings are not yet applied. Applying them may cause your App Service resource to restart. Proceed with caution. Click the `Save` button, then click `Continue` to apply the updated configuration. Repeat this procedure for each App Service.
