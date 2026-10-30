# Remediation

## Resize the Server

Before resizing, review workload trends to ensure the new configuration can support peak demand.

### **From Azure CLI**

```sh
az mysql server update \
    --resource-group {{resource-group-name}} \
    --name {{server-name}} \
    --sku-name {{new-sku-name}}
```

### **From PowerShell**

```ps
Update-AzMySqlServer `
    -ResourceGroupName {{resource-group-name}} `
    -Name {{server-name}} `
    -Sku {{new-sku-name}}
```

**Note**: Resizing triggers a restart of the MySQL server, causing a short period of downtime.
