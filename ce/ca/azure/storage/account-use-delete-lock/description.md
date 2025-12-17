# Description

Azure Resource Manager CannotDelete (Delete) locks can prevent users from accidentally or maliciously deleting a storage account. This feature ensures that while the Storage account can still be modified or used, deletion of the Storage account resource requires removal of the lock by a user with appropriate permissions.

This feature is a protective control for the availability of data. By ensuring that a storage account or its parent resource group cannot be deleted without first removing the lock, the risk of data loss is reduced.

While an automated assessment procedure exists for this recommendation, the assessment status remains manual. Determining storage accounts that require CannotDelete locks depends on the context and requirements of each organization and environment.

## Rationale

Applying a Delete lock on storage accounts protects the availability of data by preventing the accidental or unauthorized deletion of the entire storage account. It is a fundamental protective control that can prevent data loss

## Impact

- Prevents the deletion of the Storage account Resource entirely.
- Prevents the deletion of the parent Resource Group containing the locked Storage account resource.
- Does not prevent other control plane operations, including modification of configurations, network settings, containers, and access.
- Does not prevent deletion of containers or other objects within the storage account.

## Audit

### From Azure Portal

1. Navigate to the storage account in the Azure portal.
2. For each storage account, under `Settings`, click `Locks`.
3. Ensure that a `Delete` lock exists on the storage account.

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
