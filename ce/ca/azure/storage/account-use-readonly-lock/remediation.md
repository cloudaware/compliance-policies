# Remediation

## From Azure Portal

1. Navigate to the storage account in the Azure portal.
2. Under the `Settings` section, select `Locks`.
3. Select `Add`.
4. Provide a Name, and choose `ReadOnly` for the type of lock.
5. Add a note about the lock if desired.

## From Azure CLI

Replace the information within <> with appropriate values:

```sh
az lock create --name <lock> \ --resource-group <resource-group> \ --resource <storage-account> \ --lock-type ReadOnly \ --resource-type Microsoft.Storage/storageAccounts
```

## From Powershell

Replace the information within <> with appropriate values:

```ps
New-AzResourceLock -LockLevel ReadOnly ` -LockName <lock> ` -ResourceName <storage-account> ` -ResourceType Microsoft.Storage/storageAccounts ` -ResourceGroupName <resource-group>
```
