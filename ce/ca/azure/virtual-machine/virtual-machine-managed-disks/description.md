# Description

Migrate blob-based VHDs to Managed Disks on Virtual Machines to exploit the default features of this configuration. The features include:

1. Default Disk Encryption.
2. Resilience, as Microsoft will managed the disk storage and move around if underlying hardware goes faulty.
3. Reduction of costs over storage accounts.

## Rationale

Managed disks are by default encrypted on the underlying hardware, so no additional encryption is required for basic protection. It is available if additional encryption is required. Managed disks are by design more resilient that storage accounts.

For ARM-deployed Virtual Machines, Azure Adviser will at some point recommend moving VHDs to managed disks both from a security and cost management perspective.

## Impact

There are additional costs for managed disks based off of disk space allocated. When converting to managed disks, VMs will be powered off and back on.

## Audit

### From Azure Portal

1. Using the search feature, go to `Virtual Machines`.
2. Click the `Manage view` dropdown, then select `Edit columns`.
3. Add `Uses managed disks` to the selected columns.
4. Select `Save`.
5. Ensure all virtual machines listed are using managed disks.

### From PowerShell

Run the following command:

```ps
Get-AzVM | ForEach-Object {"Name: " + $_.Name;"ManagedDisk Id: " + $_.StorageProfile.OsDisk.ManagedDisk.Id;""}
```

Example output:

```
Name: vm1 
ManagedDisk Id: /disk1/id 

Name: vm2 
ManagedDisk Id: /disk2/id
```

If the `ManagedDisk Id` field is empty the os disk for that vm is not managed.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [06a78e20-9358-41c9-923c-fb736d382a4d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F06a78e20-9358-41c9-923c-fb736d382a4d) - **Name**: `Audit VMs that do not use managed disks`

## Default Value

Managed disks or are an option upon the creation of VMs.

## References

1. <https://docs.microsoft.com/en-us/azure/virtual-machines/windows/convert-unmanaged-to-managed-disks>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>
3. <https://docs.microsoft.com/en-us/azure/virtual-machines/faq-for-disks>
4. <https://azure.microsoft.com/en-us/pricing/details/managed-disks/>
