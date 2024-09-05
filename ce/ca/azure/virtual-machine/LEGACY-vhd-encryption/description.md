# Description

**NOTE: This is a legacy recommendation. Managed Disks are encrypted by default and recommended for all new VM implementations.**

VHD (Virtual Hard Disks) are stored in blob storage and are the old-style disks that were attached to Virtual Machines. The blob VHD was then leased to the VM. By default, storage accounts are not encrypted, and Microsoft Defender will then recommend that the OS disks should be encrypted. Storage accounts can be encrypted as a whole using PMK or CMK. This should be turned on for storage accounts containing VHDs.

## Rationale

While it is recommended to use Managed Disks which are encrypted by default, "legacy" VHDs may exist for a variety of reasons and may need to remain in VHD format. VHDs are not encrypted by default, so this recommendation intends to address the security of these disks. In these niche cases, VHDs should be encrypted using the procedures in this recommendation to encrypt and protect the data content.

If a virtual machine is using a VHD and can be converted to a managed disk, instructions for this procedure can be found in the resources section of this recommendation under the title "Convert VHD to Managed Disk."

## Impact

Depending on how the encryption is implemented will change the size of the impact. If provider-managed keys(PMK) are utilized, the impact is relatively low, but processes need to be put in place to regularly rotate the keys. If Customer-managed keys(CMK) are utilized, a key management process needs to be implemented to store and manage key rotation, thus the impact is medium to high depending on user maturity with key management.

## Audit

### From Azure CLI

For each virtual machine identify if the VM is using a legacy VHD by reviewing the VHD parameter in the output of the following command. The `VHD` parameter will contain the Storage Account name used for the VHD:

```sh
az vm show --name <MyVM> --resource-group <MyResourceGroup>
```

Next, identify if the storage account from the `VHD` parameter is encrypted by reviewing the `encryption` --> `services` --> `blob` --> `enabled` within the output of the following command and make sure its value is `True`:

```sh
az storage account show --name <storage account name> --resource-group <resource group>
```

### From PowerShell

Determine whether the VM is using a VHD for the OS Disk and any Data disks:

```ps
$virtualMachine = Get-AzVM --Name <vm name> --ResourceGroup <resource group name> |Select-Object -ExpandProperty StorageProfile $virtualMachine.OsDisk $virtualMachine.DataDisks
```

Next, use the value from `VHD` to see if the storage blob holding the VHD is encrypted:

```ps
$storageAccount = Get-AzStorageAccount -Name <storage account name from VHD setting> -ResourceGroupName <resource group name> $storageAccount.Encryption.Services.Blob
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [702dd420-7fcc-42c5-afe8-4026edd20fe0](https://portal.azure.com/#blade/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F702dd420-7fcc-42c5-afe8-4026edd20fe0) - **Name**: `OS and data disks should be encrypted with a customer-managed key`

## Default Value

The default value for encryption is `NO Encryption`.

## References

1. CLI: <https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disk-encryption-cli-quickstart>
2. Powershell: <https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disk-encryption-powershell-quickstart>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>
4. Convert VHD to Managed Disk: <https://docs.microsoft.com/en-us/previous-versions/azure/virtual-machines/scripts/virtual-machines-powershell-sample-create-managed-disk-from-vhd>
