# Remediation

## From Azure Portal

1. Go to `Storage accounts`.
2. Click the name of a storage account.
3. Under `Settings`, click `Configuration`.
4. Under `Default to Microsoft Entra authorization in the Azure portal`, click the radio button next to `Enabled`.
5. Click `Save`.
6. Repeat steps 1-5 for each storage account requiring remediation.

## From Azure CLI

For each storage account requiring remediation, run the following command to enable `defaultToOAuthAuthentication`:

```sh
az storage account update --resource-group <resource-group> --name <storage-account> --set defaultToOAuthAuthentication=true
```
