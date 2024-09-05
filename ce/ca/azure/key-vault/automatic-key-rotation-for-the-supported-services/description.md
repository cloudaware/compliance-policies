# Description

Automatic Key Rotation is available in Public Preview. The currently supported applications are Key Vault, Managed Disks, and Storage accounts accessing keys within Key Vault. The number of supported applications will incrementally increased.

## Rationale

Once set up, Automatic Private Key Rotation removes the need for manual administration when keys expire at intervals determined by your organization's policy. The recommended key lifetime is 2 years. Your organization should determine its own key expiration policy.

## Impact

There are an additional costs per operation in running the needed applications.

## Audit

### From Azure Portal

1. From Azure Portal select the Portal Menu in the top left.
2. Select `Key Vaults`.
3. Select a Key Vault to audit.
4. Under `Objects` select `Keys`.
5. Select a key to audit.
6. In the top row select `Rotation policy`.
7. Ensure `Enable auto rotation` is set to `Enabled`.
8. Repeat steps 3-7 for each Key Vault and Key.

### From Azure CLI

Run the following command:

```sh
az keyvault key rotation-policy show --vaultname <vaultName> --name <keyName>
```

### From PowerShell

Run the following command:

```ps
Get-AzKeyVaultKeyRotationPolicy -VaultName <vaultName> -Name <keyName>
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [d8cf8476-a2ec-4916-896e-992351803c44](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fd8cf8476-a2ec-4916-896e-992351803c44) - **Name**: `Keys should have a rotation policy ensuring that their rotation is scheduled within the specified number of days after creation.`

## Default Value

By default, Automatic Key Rotation is not enabled.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/keys/how-to-configure-key-rotation>
2. <https://docs.microsoft.com/en-us/azure/storage/common/customer-managed-keys-overview#update-the-key-version>
3. <https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disks-enable-customer-managed-keys-powershell#set-up-an-azure-key-vault-and-diskencryptionset-optionally-with-automatic-key-rotation>
4. <https://azure.microsoft.com/en-us/updates/public-preview-automatic-key-rotation-of-customermanaged-keys-for-encrypting-azure-managed-disks/>
5. <https://docs.microsoft.com/en-us/cli/azure/keyvault/key/rotation-policy?view=azure-cli-latest#az-keyvault-key-rotation-policy-update>
6. <https://docs.microsoft.com/en-us/powershell/module/az.keyvault/set-azkeyvaultkeyrotationpolicy?view=azps-8.1.0>
7. <https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/scalar-data-types/timespan>
8. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-6-use-a-secure-key-management-process>

## Additional Information

Automatic Key Rotation is in public preview, so any configuration will not change upon full release.

**Note**: Azure CLI and Powershell use ISO8601 flags to input timespans. Every timespan input will be in the format P<timespanInISO8601Format>(Y,M,D). The leading P is required with it denoting `period`. The (Y,M,D) are for the duration of Year, Month, Day respectively. A time frame of 2 years, 2 months, 2 days would be (P2Y2M2D).
