# Remediation

Azure does not currently support changing the storage tier (SKU) of an existing snapshot. To transition a snapshot from Premium SSD to a Standard storage, the current Premium snapshot must be re-created using a Standard SKU (Standard_LRS or Standard_ZRS). This re-creation can be done from either the original managed disk, if it still exists or the existing premium snapshot itself.

## Create a New Snapshot Using a Standard SKU

Specify the appropriate source resource ID in the `--source` or `-SourceUri` field.

### Azure CLI

```sh
az snapshot create \
--resource-group {{resource-group-name}} \
--source {{resource-id-of-source-disk-or-snapshot}} \
--name {{new-standard-snapshot-name}} \
--sku {{Standard_LRS / Standard_ZRS}} \
--location {{snapshot-location}}
```

- `--source` can be a Managed Disk name (if in the same resource group), or the full resource ID of a snapshot or disk.

### PowerShell

```ps
$resourceGroup = "{{resource-group-name}}"
$sourceResourceId = "{{resource-id-of-source-disk-or-snapshot}}"
$newSnapshotName = "{{new-standard-snapshot-name}}"
$location = "{{snapshot-location}}"

# Configure the new snapshot with Standard SKU
$snapshotConfig = New-AzSnapshotConfig -SourceUri $sourceResourceId `
    -Location $location `
    -CreateOption Copy `
    -SkuName "{{Standard_LRS or Standard_ZRS}}"

# Create the new snapshot
New-AzSnapshot -Snapshot $snapshotConfig -ResourceGroupName $resourceGroup -SnapshotName $newSnapshotName
```

## Delete the Original Premium SSD Snapshot

After validating that the new Standard-tier snapshot is functional and correctly configured, delete the original Premium snapshot to eliminate unnecessary cost.

### Azure CLI

```sh
az snapshot delete \
--name {{old-premium-snapshot-name}} \
--resource-group {{resource-group-name}}
```

### PowerShell

```ps
Remove-AzSnapshot -ResourceGroupName "{{resource-group-name}}" -SnapshotName "{{old-premium-snapshot-name}}" -Force
```
