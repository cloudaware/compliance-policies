# Description

Automated cryptographic key rotation in Key Vault allows users to configure Key Vault to automatically generate a new key version at a specified frequency. A key rotation policy can be defined for each individual key.

## Rationale

Automatic key rotation reduces risk by ensuring that keys are rotated without manual intervention.

Azure and NIST recommend that keys be rotated every two years or less. Refer to 'Table 1: Suggested cryptoperiods for key types' on page 46 of the following document for more information: <https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf>.

## Impact

There is an additional cost for each scheduled key rotation.

## Audit

This policy marks an *Azure Key Vault* as `INCOMPLIANT` if any of its *Key Vault Keys*:

- Missing `Lifetime Actions`,
- `Lifetime Actions` don’t include a **Rotate** action, or
- Include a **Rotate** action but haven’t been rotated in over **two** years (exceeding the industry‑standard maximum key lifetime).

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
9. <https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf>
