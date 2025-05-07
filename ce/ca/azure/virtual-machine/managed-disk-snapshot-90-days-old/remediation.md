# Remediation

## Deleting Snapshots

If a snapshot is no longer required for operational, compliance, or recovery purposes, it should be permanently deleted to eliminate unnecessary storage charges.

### Azure CLI

Use the `az snapshot delete` command to remove the snapshot:

```bash
az snapshot delete \
    --resource-group {{resource-group-name}} \
    --name {{snapshot-name}} \
    --yes
```

### PowerShell

Use the `Remove-AzSnapshot` cmdlet:

```ps
Remove-AzSnapshot `
    -ResourceGroupName "{{resource-group-name}}" `
    -SnapshotName "{{snapshot-name}}" `
    -Force
```

## Archiving Snapshots

Snapshots that must be retained for compliance or archival purposes can be exported as VHDs and stored in a lower-cost blob storage tier.

### Export Snapshot to Page Blob (VHD)

Generate a short-lived SAS for the snapshot and copy it to a designated storage account container as a Page Blob:

#### Azure CLI

```sh
subscriptionId={{subscription-id}}
resourceGroupName={{resource-group-name}}
snapshotName={{snapshot-name}}
sasExpiryDuration=3600
storageAccountName={{storage-account-name}}
storageContainerName={{storage-container-name}}
storageAccountKey={{storage-account-key}}
destinationVHDFileName={{vhd-file-name}}

az account set --subscription $subscriptionId

#Generate the SAS for the snapshot
sas=$(az snapshot grant-access \
    --resource-group $resourceGroupName \
    --name $snapshotName \
    --duration-in-seconds $sasExpiryDuration \
    -o tsv)

#Copy the snapshot to the storage account 
az storage blob copy start \
    --destination-blob $destinationVHDFileName \
    --destination-container $storageContainerName \
    --account-name $storageAccountName \
    --account-key $storageAccountKey \
    --source-uri $sas
```

#### PowerShell

```ps
$subscriptionId = "{{subscription-id}}"
$resourceGroupName ="{{resource-group-name}}"
$snapshotName = "{{snapshot-name}}"
$sasExpiryDuration = "3600"
$storageAccountName = "{{storage-account-name}}"
$storageContainerName = "{{storage-container-name}}"
$storageAccountKey = "{{storage-account-key}}"
$destinationVHDFileName = "{{vhd-file-name}}"

Select-AzSubscription -SubscriptionId $SubscriptionId

#Generate the SAS for the snapshot 
$sas = Grant-AzSnapshotAccess `
    -ResourceGroupName $ResourceGroupName `
    -SnapshotName $SnapshotName  `
    -DurationInSecond $sasExpiryDuration `
    -Access Read

#Create the context for the storage account which will be used to copy snapshot to the storage account 
$destinationContext = New-AzStorageContext `
    -StorageAccountName $storageAccountName `
    -StorageAccountKey $storageAccountKey

#Copy the snapshot to the storage account 
Start-AzStorageBlobCopy `
    -AbsoluteUri $sas.AccessSAS `
    -DestContainer $storageContainerName `
    -DestContext $destinationContext `
    -DestBlob $destinationVHDFileName
```

### Copy Page Blob to Block Blob

Convert the **Page Blob** into a **Block Blob** and move it into an archive or cold tier using `AzCopy`:

```sh
source="https://$storageAccountName.blob.core.windows.net/$storageContainerName/$destinationVHDFileName?$sas"
destination="https://$storageAccountName.blob.core.windows.net/archive/{{name-of-new-block-blob}}"

azcopy copy "$source" "$destination" --blob-type BlockBlob --block-blob-tier {{Cold/Archive}}
```

### Important

Once the block blob has been successfully moved to the desired access tier, perform the following cleanup actions to prevent ongoing costs:

- Delete the original snapshot.
- Delete the intermediate Page Blob (VHD).
- Revoke the SAS token used for access to ensure security and prevent unauthorized usage:

```sh
az snapshot revoke-access --resource-group $resourceGroupName --name $snapshotName
```

```ps
Revoke-AzSnapshotAccess -ResourceGroupName $resourceGroupName -SnapshotName $snapshotName
```
