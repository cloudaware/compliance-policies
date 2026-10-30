# Remediation

## From Azure Portal

1. Navigate to the specific Azure Resource or Resource Group.
2. For each mission critical resource, click `Locks`.
3. Click `Add`.
4. Give the lock a name and a description, then select the type, `Read-only` or `Delete` as appropriate.
5. Click `OK`.

## From Azure CLI

To lock a resource, provide the name of the resource, its resource type, and its resource group name:

```sh
az lock create \
    --name {{lock-name}} \
    --lock-type {{CanNotDelete/Read-only}} \
    --resource-group {{resource-group-name}} \
    --resource-name {{resource-name}} \
    --resource-type {{resource-type}}
```

## From Powershell

```ps
Get-AzResourceLock `
    -ResourceName {{resource-name}} `
    -ResourceType {{resource-type}} `
    -ResourceGroupName {{resource-group-name}} `
    -Locktype {{can-not-delete-or-read-only}}
```
