# Remediation

## Resize the Server

Before resizing, review workload trends to ensure the new configuration can support peak demand.

### **From Azure CLI**

```sh
az mysql server update \
    --resource-group {{resource-group}} \
    --name {{server-name}} \
    --sku-name {{new-sku-name}}
```

### **From PowerShell**

```ps
Update-AzMySqlServer `
    -ResourceGroupName {{resource-group}} `
    -Name {{server-name}} `
    -Sku {{new-sku-name}} 
```

**Note**: Resizing triggers a restart of the MySQL server, causing a short period of downtime.
