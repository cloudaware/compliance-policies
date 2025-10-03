# Remediation

## Resize the Server

Before resizing, review workload trends to ensure the new configuration can support peak demand.

### **From Azure CLI**

```sh
az postgres server update \
    --resource-group {{resource-group}} \
    --name {{server-name}} \
    --sku-name {{new-sku-name}}
```

### **From PowerShell**

```ps
Update-AzPostgreSqlServer `
    -ResourceGroupName {{resource-group}} `
    -Name {{server-name}} `
    -Sku {{new-sku-name}} 
```

**Note**: Resizing triggers a restart of the PostgreSQL server, causing a short period of downtime.
