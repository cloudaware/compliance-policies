# Remediation

If the data stored on an unattached Managed Disk is no longer required, it is recommended to delete the disk to eliminate unnecessary costs. If the data must be preserved for archival or future use, consider creating a snapshot or image prior to deletion.

## Delete the Unattached Managed Disk

### Azure CLI

```sh
az disk delete --name {{disk-name}} \
--resource-group {{resource-group-name}}
```

### PowerShell

```ps
Remove-AzDisk -DiskName "{{disk-name}}" `
    -ResourceGroupName "{{resource-group-name}}" -Force
```

## Archive the Disk via Snapshot

### Azure CLI

```sh
az snapshot create \
--resource-group {{resource-group-name}} \
--source {{resource-id-of-source-disk}} \
--name {{snapshot-name}} \
--sku {{Standard_LRS / Standard_ZRS}} \
--location {{snapshot-location}}
```

### PowerShell

```ps
$resourceGroup = "{{resource-group-name}}"
$sourceResourceId = "{{resource-id-of-source-disk}}"
$newSnapshotName = "{{snapshot-name}}"
$location = "{{snapshot-location}}"

# Create snapshot configuration
$snapshotConfig = New-AzSnapshotConfig 
    -SourceUri $sourceResourceId `
    -Location $location `
    -CreateOption Copy `
    -SkuName "{{Standard_LRS or Standard_ZRS}}"

# Create the snapshot
New-AzSnapshot `
    -Snapshot $snapshotConfig `
    -ResourceGroupName $resourceGroup `
    -SnapshotName $newSnapshotName
```

**Note**: After successfully creating the snapshot, you may delete the original Managed Disk to free up resources.
