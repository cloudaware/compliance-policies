# Description

Ensure that OS disks (boot volumes) and data disks (non-boot volumes) are encrypted with CMK (Customer Managed Keys). Customer Managed keys can be either ADE or Server Side Encryption (SSE).

## Rationale

Encrypting the IaaS VM's OS disk (boot volume) and Data disks (non-boot volume) ensures that the entire content is fully unrecoverable without a key, thus protecting the volume from unwanted reads. PMK (Platform Managed Keys) are enabled by default in Azure-managed disks and allow encryption at rest. CMK is recommended because it gives the customer the option to control which specific keys are used for the encryption and decryption of the disk. The customer can then change keys and increase security by disabling them instead of relying on the PMK key that remains unchanging. There is also the option to increase security further by using automatically rotating keys so that access to disk is ensured to be limited. Organizations should evaluate what their security requirements are, however, for the data stored on the disk. For high-risk data using CMK is a must, as it provides extra steps of security. If the data is low risk, PMK is enabled by default and provides sufficient data security.

## Impact

Using CMK/BYOK will entail additional management of keys.
NOTE: You must have your key vault set up to utilize this.

## Audit

### From Azure Portal

1. Go to `Virtual machines`.
2. For each virtual machine, go to `Settings`.
3. Click on `Disks`.
4. Ensure that the `OS disk` and `Data disks` have encryption set to CMK.

### From PowerShell

```ps
$ResourceGroupName="yourResourceGroupName" $DiskName="yourDiskName" $disk=Get-AzDisk -ResourceGroupName $ResourceGroupName -DiskName $DiskName $disk.Encryption.Type
```

№№№ From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: 0961003e-5a0a-4549-abde-af6a37f2724d - **Name**: `Virtual machines should encrypt temp disks, caches, and data flows between Compute and Storage resources`

## Default Value

By default, Azure disks are encrypted using SSE with PMK.

## References

1. <https://docs.microsoft.com/azure/security/fundamentals/azure-disk-encryption-vms-vmss>
2. <https://docs.microsoft.com/en-us/azure/security-center/security-center-disk-encryption?toc=%2fazure%2fsecurity%2ftoc.json>
3. <https://docs.microsoft.com/azure/security/fundamentals/data-encryption-best-practices#protect-data-at-resthttps://docs.microsoft.com/azure/virtual-machines/windows/disk-encryption-portal-quickstart>
4. <https://docs.microsoft.com/en-us/rest/api/compute/disks/delete>
5. <https://docs.microsoft.com/en-us/rest/api/compute/disks/update#encryptionsettings>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required>
7. <https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disks-enable-customer-managed-keys-powershell>
8. <https://docs.microsoft.com/en-us/azure/virtual-machines/disk-encryption>
