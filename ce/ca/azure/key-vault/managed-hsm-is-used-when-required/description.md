# Description

Azure Key Vault Managed HSM is a fully managed, highly available, single-tenant cloud service that safeguards cryptographic keys using FIPS 140-2 Level 3 validated HSMs.

**Note:** While an automated assessment procedure exists for this recommendation, the assessment status remains manual, as this recommendation to use Managed HSM applies only to scenarios where specific regulatory and compliance requirements mandate the use of a dedicated hardware security module.

## Rationale

Managed HSM is a fully managed, highly available, single-tenant service that ensures FIPS 140-2 Level 3 compliance. It provides centralized key management, isolated access control, and private endpoints for secure access. Integrated with Azure services, it supports migration from Key Vault, ensures data residency, and offers monitoring and auditing for enhanced security.

## Impact

Managed HSM incurs a cost of $0.40 to $5 per month for each actively used HSM-protected key, depending on the key type and quantity. Each key version is billed separately. Additionally, there is an hourly usage fee of $3.20 per Managed HSM pool.

## Audit

### From Azure CLI

Run the following command to list key vaults:

```sh
az keyvault list --query [*].[name,type]
```

Ensure that at least one key vault with type `Microsoft.KeyVault/managedHSMs` exists.

## References

1. <https://learn.microsoft.com/en-us/azure/security/fundamentals/key-management-choose>
2. <https://learn.microsoft.com/en-us/azure/key-vault/managed-hsm/overview>
3. <https://azure.microsoft.com/en-gb/pricing/details/key-vault/>
4. <https://learn.microsoft.com/en-us/azure/key-vault/managed-hsm/quick-create-cli>
5. <https://learn.microsoft.com/en-us/cli/azure/keyvault>
