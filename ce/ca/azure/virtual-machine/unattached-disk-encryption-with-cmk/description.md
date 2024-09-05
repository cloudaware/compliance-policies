# Description

Ensure that unattached disks in a subscription are encrypted with a Customer Managed Key (CMK).

## Rationale

Managed disks are encrypted by default with Platform-managed keys. Using Customer-managed keys may provide an additional level of security or meet an organization's regulatory requirements. Encrypting managed disks ensures that its entire content is fully unrecoverable without a key and thus protects the volume from unwarranted reads. Even if the disk is not attached to any of the VMs, there is always a risk where a compromised user account with administrative access to VM service can mount/attach these data disks, which may lead to sensitive information disclosure and tampering.

## Impact

**NOTE**: You must have your key vault set up to utilize this. Encryption is available only on Standard tier VMs. This might cost you more.

Utilizing and maintaining Customer-managed keys will require additional work to create, protect, and rotate keys.

## Audit

### From Azure Portal

1. Go to `Disks`.
2. Click on `Add Filter`.
3. In the `filter` field select `Disk state`.
4. In the `Value` field select `Unattached`.
5. Click `Apply`.
6. for each disk listed ensure that `Encryption type` in the `encryption` blade is `Encryption at-rest with a customer-managed key`.

### From Azure CLI

Ensure command below does not return any output:

```sh
az disk list --query '[? diskstate == `Unattached`].{encryptionSettings: encryptionSettings, name: name}' -o json
```

Sample Output:

```json
[ 
    { 
        "encryptionSettings": null, 
        "name": "<Disk1>" 
    }, 
    { 
        "encryptionSettings": null, 
        "name": "<Disk2>" 
    } 
]
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [ca91455f-eace-4f96-be59-e6e2c35b4816](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fca91455f-eace-4f96-be59-e6e2c35b4816) - **Name**: `Managed disks should be double encrypted with both platform-managed and customer-managed keys`

## Default Value

By default, managed disks are encrypted with a Platform-managed key.

## References

1. <https://docs.microsoft.com/en-us/azure/security/fundamentals/azure-disk-encryption-vms-vmss>
2. <https://docs.microsoft.com/en-us/azure/security-center/security-center-disk-encryption?toc=%2fazure%2fsecurity%2ftoc.json>
3. <https://docs.microsoft.com/en-us/rest/api/compute/disks/delete>
4. <https://docs.microsoft.com/en-us/cli/azure/disk?view=azure-cli-latest#az-disk-delete>
5. <https://docs.microsoft.com/en-us/rest/api/compute/disks/update#encryptionsettings>
6. <https://docs.microsoft.com/en-us/cli/azure/disk?view=azure-cli-latest#az-disk-update>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required>
