# Remediation

## From Azure Portal

### Part A. Select the Virtual Machine to Remediate

1. Using the search bar, search for and open the `Virtual Machines` service.
2. Click on the name of the Virtual Machine to be remediated.

### Part B. Remediate each Virtual Machine Disk individually

1. From the selected Virtual Machine resource window, expand the `Settings` menu item and click `Disks`.
2. For each disk, click the name of the disk to open the disk resource window.
3. From the selected Disk resource window, expand the `Settings` menu item, and click `Networking`.

Under Network access, select the radio button for either:

- Disable public access and enable private access
- Disable public and private access

Repeat Part B for each Disk attached to a VM.

Repeat Parts A and B to remediate all Disks in all VMs.

## From Azure CLI

To configure a disk to allow private access only, run the following command making sure you have the `Disk Access ID` from a private disk access end point:

```sh
az disk update --name <managed disk name> --resource-group <resource group name> --network-access-policy AllowPrivate --disk-access <disk access ID>
```

To completely disable public and private access for a disk, run the following command (still in preview) for each disk:

```sh
az disk update --name <managed disk name> --resource-group <resource group name> --public-network-access Disabled --network-access-policy DenyAll
```

## From PowerShell

To disable `PublicNetworkAccess` and to set a `DenyAll` setting for the disk's `NetworkAccessPolicy` for each managed disk, run the following command:

```ps
$disk = Get-AzDisk -ResourceGroupName ‘<resource group name>’ -DiskName ‘<disk name>’ $disk.NetworkAccessPolicy = 'DenyAll' $disk.PublicNetworkAccess = 'Disabled' Update-AzDisk -ResourceGroup '<resource group name> -DiskName $disk.Name -Disk $disk
```

To disable `PublicNetworkAccess` and to set an `AllowPrivate` setting for the disk's `NetworkAccessPolicy` for each managed disk, run the following command:

```ps
$disk = Get-AzDisk -ResourceGroupName ‘<resource group name>’ -DiskName ‘<disk name>’ $disk.NetworkAccessPolicy = 'AllowPrivate' $disk.PublicNetworkAccess = 'Disabled' $disk.DiskAccessId = '/subscriptions/<subscription ID>/resourceGroups/<resource group name>/providers/Microsoft.Compute/diskAccesses/<private disk access name> Update-AzDisk -ResourceGroup '<resource group name> -DiskName $disk.Name -Disk $disk
```
