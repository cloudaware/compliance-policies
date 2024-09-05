# Description

Resource Manager Locks provide a way for administrators to lock down Azure resources to prevent deletion of, or modifications to, a resource. These locks sit outside of the Role Based Access Controls (RBAC) hierarchy and, when applied, will place restrictions on the resource for all users. These locks are very useful when there is an important resource in a subscription that users should not be able to delete or change. Locks can help prevent accidental and malicious changes or deletion.

## Rationale

As an administrator, it may be necessary to lock a subscription, resource group, or resource to prevent other users in the organization from accidentally deleting or modifying critical resources. The lock level can be set to to `CanNotDelete` or `ReadOnly` to achieve this purpose.

- `CanNotDelete` means authorized users can still read and modify a resource, but they cannot delete the resource.
- `ReadOnly` means authorized users can read a resource, but they cannot delete or update the resource. Applying this lock is similar to restricting all authorized users to the permissions granted by the Reader role.

## Impact

There can be unintended outcomes of locking a resource. Applying a lock to a parent service will cause it to be inherited by all resources within. Conversely, applying a lock to a resource may not apply to connected storage, leaving it unlocked. Please see the documentation for further information.

## Audit

### From Azure Portal

1. Navigate to the specific Azure Resource or Resource Group
2. Click on `Locks`
3. Ensure the lock is defined with name and description, with type `Read-only` or `Delete` as appropriate.

### From Azure CLI

Review the list of all locks set currently:

```sh
az lock list --resource-group <resourcegroupname> --resource-name <resourcename> --namespace <Namespace> --resource-type <type> --parent ""
```

### From Powershell

Run the following command to list all resources:

```ps
Get-AzResource
```

For each resource, run the following command to check for Resource Locks:

```ps
Get-AzResourceLock -ResourceName <Resource Name> -ResourceType <Resource Type> -ResourceGroupName <Resource Group Name>
```

Review the output of the `Properties` setting. Compliant settings will have the `CanNotDelete` or `ReadOnly` value.

## Default Value

By default, no locks are set.

## References

1. <https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-lock-resources>
2. <https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-subscription-governance#azure-resource-locks>
3. <https://docs.microsoft.com/en-us/azure/governance/blueprints/concepts/resource-locking>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-asset-management#am-4-limit-access-to-asset-management>
