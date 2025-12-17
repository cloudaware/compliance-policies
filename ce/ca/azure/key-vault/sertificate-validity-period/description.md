# Description

This policy identifies Azure Key Vault Certificates that are valid for more that 12 months.
Restrict the validity period of certificates stored in Azure Key Vault to 12 months or less.

## Rationale

Limiting certificate validity reduces the risk of misuse if compromised and helps ensure timely renewal, improving security and reliability.

## Impact

Minor administrative effort required to ensure certificate renewal and lifecycle management.

## Audit

This policy flags an *Azure Key Vault Certificate* as `INCOMPLIANT` if `Validity Period (in months)` is set to more than 12.

## Default Value

`Validity Period (in months)` is set to 12 by default.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates>
2. <https://learn.microsoft.com/en-us/cli/azure/keyvault>
3. <https://learn.microsoft.com/en-us/powershell/module/az.keyvault>
