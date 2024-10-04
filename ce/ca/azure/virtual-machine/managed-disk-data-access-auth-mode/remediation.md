# Remediation

## From Azure Portal

### Part A. Select the Virtual Machine to Remediate

1. Using the search bar, search for and open the `Virtual Machines` service.
2. Click on the name of the Virtual Machine to be remediated.

### Part B. Remediate each Virtual Machine Disk individually

1. From the selected Virtual Machine resource window, expand the `Settings` menu item and click `Disks`.
2. For each disk, click the name of the disk to open the disk resource window.
3. From the selected Disk resource window, expand the `Settings` menu item, and click `Disk Export`.

Check the checkbox next to `Enable Data Access Authentication Mode`.

Repeat Part B for each Disk attached to a VM.

Repeat Parts A and B to remediate all Disks in all VMs.

## From Azure CLI

Ensure that each disk is detached from its associated `Virtual Machine` before proceeding. Once detached, run the following for each disk:

```sh
az disk update --name <disk_name> --resource-group <resource_group_name> --data-access-auth-mode AzureActiveDirectory
```

## From PowerShell

Ensure that each disk is detached from its associated `Virtual Machine` before proceeding. Once detached, run the following for each disk:

```ps
$disk = Get-AzDisk -ResourceGroupName '<resource_group_name>' -DiskName '<disk_name>' $disk.DataAccessAuthMode = 'AzureActiveDirectory' Update-AzDisk -ResourceGroup '<resource_group_name>' -DiskName $disk.Name -Disk $disk
```
