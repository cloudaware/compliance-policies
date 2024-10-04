# Description

Virtual Machine Disks and snapshots can be configured to allow access from different network resources.

## Rationale

The setting `Enable public access from all networks` is, in many cases, an overly permissive setting on Virtual Machine Disks that presents atypical attack, data infiltration, and data exfiltration vectors. If a disk to network connection is required, the preferred setting is to `Disable public access and enable private access`.

## Impact

The setting `Disable public access and enable private access` will require configuring a private link (URL in references below).

The setting `Disable public and private access` is most secure and preferred where disk network access is not needed.

## Audit

### From Azure Portal

#### Part A. Select the Virtual Machine to Evaluate

1. Using the search bar, search for and open the `Virtual Machines` service.
2. Click on the name of the Virtual Machine to be audited.

#### Part B. Evaluate each Virtual Machine Disk individually

1. From the selected Virtual Machine resource window, expand the `Settings` menu item and click `Disks`.
2. For each disk, click the name of the disk to open the disk resource window.
3. From the selected Disk resource window, expand the `Settings` menu item, and click `Networking`.

Ensure that Network access is **NOT** set to `Enable public access from all networks`.

Repeat Part B for each Disk attached to a VM.

Repeat Parts A and B to evaluate all Disks in all VMs.

### From Azure CLI

For each managed disk, run the following command:

```sh
az disk show --disk-name <disk name> --resource-group <resource group name>
```

Ensure the `publicNetworkAccess` setting is set to `Disabled` and the `networkAccessPolicy` setting is set to `AllowPrivate` or `DenyAll`.

### From PowerShell

For each managed disk, run the following PowerShell command:

```ps
Get-AzDisk -ResourceGroupName <resource group name> -DiskName <disk name>
```

Ensure the `PublicNetworkAccess` setting is `Disabled` and the `NetworkAccessPolicy` is set to `AllowPrivate` or `DenyAll`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [8405fdab-1faf-48aa-b702-999c9c172094](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F8405fdab-1faf-48aa-b702-999c9c172094) - **Name**: `Managed disks should disable public network access`

## Default Value

By default, Disk Network access is set to `Enable public access from all networks`.

## References

1. <https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-private-links-for-import-export-portal>
2. <https://learn.microsoft.com/en-us/azure/virtual-machines/linux/disks-export-import-private-links-cli>
3. <https://learn.microsoft.com/en-us/azure/virtual-machines/disks-restrict-import-export-overview>
