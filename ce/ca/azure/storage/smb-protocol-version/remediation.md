# Remediation

## From Azure Portal

1. Go to `Storage accounts`.
2. Click the name of a storage account.
3. Under `Data storage`, click `File shares`.
4. Under `File share settings`, click the link next to `Security`.
5. If `Profile` is set to `Maximum compatibility`, click the drop-down menu and select `Maximum security` or `Custom`.
6. If selecting `Custom`, under `SMB protocol versions`, uncheck the boxes next to `SMB 2.1` and `SMB 3.0`.
7. Click `Save`.
8. Repeat steps 1-7 for each storage account requiring remediation.

## From Azure CLI

For each storage account requiring remediation, run the following command to set the SMB protocol version:

```sh
az storage account file-service-properties update --resource-group <resource-group> --account-name <storage-account> --versions SMB3.1.1
```

## From PowerShell

For each storage account requiring remediation, run the following command to set the SMB protocol version:

```ps
Update-AzStorageFileServiceProperty -ResourceGroupName <resource-group> -StorageAccountName <storage-account> -SmbProtocolVersion SMB3.1.1
```
