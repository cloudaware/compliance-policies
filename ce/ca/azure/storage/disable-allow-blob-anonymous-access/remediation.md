# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Settings`, click `Configuration`.
3. Set `Allow Blob Anonymous Access` to `Disabled`.
4. Click `Save`.

## From PowerShell

For every storage account in scope, run the following:

```ps
$storageAccount = Get-AzStorageAccount `
    -ResourceGroupName "{{resource-group-name}}" `
    -Name "{{storage-account-name}}"
$storageAccount.AllowBlobPublicAccess = $false
Set-AzStorageAccount -InputObject $storageAccount
```
