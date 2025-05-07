# Remediation

## Important Considerations

- Refer to the official Microsoft documentation for up-to-date guidance on limitations, replication options, and capabilities.
- Always validate replication changes in a non-production environment before applying them in production to avoid service disruptions or data loss.

## Switching to Geo-Redundant Storage

### Azure CLI

```sh
az storage account update \
--name {{storage-account-name}} \
--resource-group {{resource-group-name}} \
--sku {{sku}}
```

### PowerShell

```ps
Set-AzStorageAccount `
    -ResourceGroupName "{{resource-group-name}}" `
    -Name "{{storage-account-name}}" `
    -SkuName "{{sku}}"
```

**Note**: To migrate to Geo-Zone-Redundant Storage (GZRS), you must first switch the account to GRS. Afterward, you can convert it to GZRS using the migration commands described in the next section.

## Conversion to Zone-Redundant Storage

A redundancy "conversion" is the process of changing the zone-redundancy aspect of a storage account to convert from LRS to Zone-Redundant Storage (ZRS), or from GRS to Geo-Zone-Redundant Storage (GZRS).

### Azure CLI

```sh
az storage account migration start  \
-- account-name {{storage-account-name}} \
--resource-group {{resource-group-name}} \
--sku {{sku}} \
--no-wait
```

### PowerShell

```ps
Start-AzStorageAccountMigration
    -AccountName "{{storage-account-name}}"
    -ResourceGroupName "{{resource-group-name}}"
    -TargetSku "{{sku}}"
    -AsJob
```
