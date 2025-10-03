# Remediation

Before performing any changes, review historical performance metrics to ensure the new configuration can handle periodic or seasonal peaks in workload.

## Resize the SQL Managed Instance

### **From Azure CLI**

```sh
az sql mi update \
    --resource-group {{resource-group}} \
    --name {{managed-instance-name}} \
    --storage {{max-size-in-GB}}
    --capacity {{2}}
    --edition {{GeneralPurpose | BusinessCritical}}
    --family {{Gen4}}
```

### **From PowerShell**

```ps
Set-AzSqlInstance `
    -ResourceGroupName "{{resource-group}}" `
    -Name "{{managed-instance-name}}" `
    -VCore {{new-vcore-count}} `
    -StorageSizeInGB {{max-size-in-GB}} `
    -Edition {{GeneralPurpose | BusinessCritical}} `
    -ComputeGeneration {{Gen5}}
```
