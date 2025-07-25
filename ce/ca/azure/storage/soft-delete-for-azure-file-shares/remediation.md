# Remediation

## From Azure Portal

1. Go to `Storage accounts`.
2. For each storage account with file shares, under `Data storage`, click `File shares`.
3. Under `File share settings`, click the value next to `Soft delete`.
4. Under `Soft delete for all file shares`, click the toggle to set it to `Enabled`.
5. Under `Retention policies`, set an appropriate number of days to retain soft deleted data between 1 and 365, inclusive.
6. Click `Save`.

## From Azure CLI

For each storage account requiring remediation, run the following command to enable soft delete for file shares and set an appropriate number of days for deleted data to be retained, between 1 and 365, inclusive:

```sh
az storage account file-service-properties update --account-name <storage-account> --enable-delete-retention true --delete-retention-days <retention-days>
```

## From PowerShell

For each storage account requiring remediation, run the following command to enable soft delete for file shares and set an appropriate number of days for deleted data to be retained, between 1 and 365, inclusive:

```ps
Update-AzStorageFileServiceProperty -ResourceGroupName <resource-group> -AccountName <storage-account> -EnableShareDeleteRetentionPolicy $true -ShareRetentionDays <retention-days>
```
