# Description

Adding an Azure Resource Manager `ReadOnly` lock can prevent users from accidentally or maliciously deleting a storage account, modifying its properties and containers, or creating access assignments. The lock must be removed before the storage account can be deleted or updated. It provides more protection than a `CannotDelete`-type of resource manager lock.

This feature prevents `POST` operations on a storage account and containers to the Azure Resource Manager control plane, management.azure.com. Blocked operations include `listKeys` which prevents clients from obtaining the account shared access keys.

Microsoft does not recommend `ReadOnly` locks for storage accounts with Azure Files and Table service containers.

This Azure Resource Manager REST API documentation (spec) provides information about the control plane `POST` operations for *Microsoft.Storage* resources.

## Rationale

Applying a `ReadOnly` lock on storage accounts protects the confidentiality and availability of data by preventing the accidental or unauthorized deletion of the entire storage account and modification of the account, container properties, or access permissions. It can offer enhanced protection for blob and queue workloads with tradeoffs in usability and compatibility for clients using account shared access keys.

## Impact

- Prevents the deletion of the Storage account Resource entirely.
- Prevents the deletion of the parent Resource Group containing the locked Storage account resource.
- Prevents clients from obtaining the storage account shared access keys using a `listKeys` operation.
- Requires Entra credentials to access blob and queue data in the Portal.
- Data in Azure Files or the Table service may be inaccessible to clients using the account shared access keys.
- Prevents modification of account properties, network settings, containers, and RBAC assignments.
- Does not prevent access using existing account shared access keys issued to clients.
- Does not prevent deletion of containers or other objects within the storage account.

## Audit

### From Azure Portal

1. Navigate to the storage account in the Azure portal.
2. For each storage account, under `Settings`, click `Locks`.
3. Ensure that a `ReadOnly` lock exists on the storage account.

### From Azure CLI

```sh
az lock list --resource-group <resource-group> \ --resource-name <storage-account> \ --resource-type "Microsoft.Storage/storageAccounts"
```

### From Powershell

```ps
Get-AzResourceLock -ResourceGroupName <RESOURCEGROUPNAME> ` -ResourceName <STORAGEACCOUNTNAME> ` -ResourceType "Microsoft.Storage/storageAccounts"
```

### From Azure Policy

There is currently no built-in Microsoft policy to audit resource locks on storage accounts.

Custom and community policy definitions can check for the existence of a “Microsoft.Authorization/locks” resource with an AuditIfNotExists effect.

## Default Value

By default, no locks are applied to Azure resources, including storage accounts. Locks must be manually configured after resource creation.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/common/lock-account-resource>
2. <https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources>
3. <https://github.com/Azure/azure-rest-api-specs/tree/main/specification/storage>
