# Description

Data Access Authentication Mode provides a method of uploading or exporting Virtual Machine Disks.

## Rationale

Enabling `data access authentication mode` adds a layer of protection using an Entra ID role to further restrict users from creating and using Secure Access Signature (SAS) tokens for exporting a detached managed disk or virtual machine state. Users will need the `Data operator for managed disk` role within Entra ID in order to download a VHD or VM Guest state using a secure URL.

## Impact

In order to apply this setting, the virtual machine to which the disk or disks are attached will need to be powered down and have their disk detached. Users without the `Data operator for managed disk` role within Entra ID will not be able to export VHD or VM Guest state using the secure download URL.

## Audit

### From Azure Portal

#### Part A. Select the Virtual Machine to Evaluate

1. Using the search bar, search for and open the `Virtual Machines` service.
2. Click on the name of the Virtual Machine to be audited.

#### Part B. Evaluate each Virtual Machine Disk individually

1. From the selected Virtual Machine resource window, expand the `Settings` menu item and click `Disks`.
2. For each disk, click the name of the disk to open the disk resource window.
3. From the selected Disk resource window, expand the `Settings` menu item, and click `Disk Export`.

Ensure that `Enable Data Access Authentication Mode` is checked.

Repeat Part B for each Disk attached to a VM.

Repeat Parts A and B to evaluate all Disks in all VMs.

### From Azure CLI

Run the following command for each disk:

```sh
az disk show --disk-name <disk_name> --resource-group <resource_group_name>
```

Ensure the `dataAccessAuthMode` setting is set to `AzureActiveDirectory`.

### From PowerShell

Run the following command for each disk:

```ps
Get-AzDisk -ResourceGroupName <resource_group_name> -DiskName <disk_name>
```

Ensure the `DataAccessAuthMode` setting displays `AzureActiveDirectory` next to it.

## Default Value

By default, Data Access Authentication Mode is `Disabled`.

## References

1. <https://learn.microsoft.com/en-us/azure/virtual-machines/windows/download-vhd?tabs=azure-portal#secure-downloads-and-uploads-with-microsoft-entra-id>
2. <https://learn.microsoft.com/en-us/azure/virtual-machines/windows/download-vhd?tabs=azure-portal#secure-downloads-and-uploads-with-microsoft-entra-id>
