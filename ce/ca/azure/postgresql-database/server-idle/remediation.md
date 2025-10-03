# Remediation

## Considerations

- Confirm with application owners that the server is no longer required or can be safely resized.
- Ensure any critical data is backed up before deletion or resizing.
- Deleting or resizing a server may trigger a brief period of downtime.

## Resize the PostgreSQL Server

### **From Azure CLI**

```sh
az postgres server update \
    --name {{server-name}} \
    --resource-group {{resource-group-name}} \
    --sku-name {{new-sku-name}}
```

Monitor CPU, memory, and I/O metrics after resizing.

## Delete the PostgreSQL Server

### Create a Backup

#### **From Azure CLI**

```sh
az postgres server backup create \
    --name {{server-name}} \
    --resource-group {{resource-group-name}} \
    --backup-name {{backup-name}}
```

### Delete the PostgreSQL Server

This operation is irreversible. Ensure backups are taken if data is needed.

#### **From Azure CLI**

```sh
az postgres server delete \
    --name {{server-name}} \
    --resource-group {{resource-group-name}} \
    --yes
```
