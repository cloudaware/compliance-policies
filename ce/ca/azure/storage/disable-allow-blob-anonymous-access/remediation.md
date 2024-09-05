# Remediation

## From Azure Portal

1. Open the Storage Accounts blade.
2. Click on a Storage Account.
3. In the storage account menu pane, under the Settings section, click `Configuration`.
4. Under `Allow Blob Anonymous Access`, select `Disabled`.

Repeat these steps for each Storage Account.

## From Powershell

For every storage account in scope, run the following:

```ps
$storageAccount = Get-AzStorageAccount -ResourceGroupName "<yourResourceGroup>" -Name "<yourStorageAccountName>" $storageAccount.AllowBlobPublicAccess = $false Set-AzStorageAccount -InputObject $storageAccount
```
