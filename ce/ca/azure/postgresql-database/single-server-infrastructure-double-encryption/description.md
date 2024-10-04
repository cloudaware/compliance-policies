# Description

Azure Database for PostgreSQL servers should be created with 'infrastructure double encryption' enabled.

**NOTE**: This recommendation currently only applies to Single Server, not Flexible Server. See additional information below for details about the planned retirement of Azure PostgreSQL Single Server.

## Rationale

If Double Encryption is enabled, another layer of encryption is implemented at the hardware level before the storage or network level. Information will be encrypted before it is even accessed, preventing both interception of data in motion if the network layer encryption is broken and data at rest in system resources such as memory or processor cache. Encryption will also be in place for any backups taken of the database, so the key will secure access the data in all forms. For the most secure implementation of key based encryption, it is recommended to use a Customer Managed asymmetric RSA 2048 Key in Azure Key Vault.

## Impact

The read and write speeds to the database will be impacted if both default encryption and Infrastructure Encryption are checked, as a secondary form of encryption requires more resource overhead for the cryptography of information. This cost is justified for information security. Customer managed keys are recommended for the most secure implementation, leading to overhead of key management. The key will also need to be backed up in a secure location, as loss of the key will mean loss of the information in the database.

## Audit

### From Azure Portal

1. From Azure Home, click on more services.
2. Click on `Databases`.
3. Click on `Azure Database for PostgreSQL servers`.
4. Select the database by clicking on its name.
5. Under `Security`, click `Data encryption`.
6. Ensure that `Infrastructure encryption enabled` is displayed and is `checked`.

### From Azure CLI

Enter the command:

```sh
az postgres server configuration show --name <servername> --resource-group <resourcegroup> --query 'properties.infrastructureEncryption' -o tsv
```

Verify that `Infrastructure encryption` is `enabled`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [24fba194-95d6-48c0-aea7-f65bf859c598](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F24fba194-95d6-48c0-aea7-f65bf859c598) - **Name**: `Infrastructure encryption should be enabled for Azure Database for PostgreSQL servers`

## Default Value

By Default, `Double Encryption` is `disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/postgresql/howto-double-encryption>
2. <https://docs.microsoft.com/en-us/azure/postgresql/concepts-infrastructure-double-encryption>
3. <https://docs.microsoft.com/en-us/azure/postgresql/concepts-data-encryption-postgresql>
4. <https://docs.microsoft.com/en-us/azure/key-vault/keys/byok-specification>
5. <https://docs.microsoft.com/en-us/azure/postgresql/howto-double-encryption>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-4-enable-data-at-rest-encryption-by-default>

## Additional Information

**RETIREMENT of Azure PostgreSQL Single Server**: Azure PostgreSQL Single Server is slated for retirement by March 25, 2025. Please use these resources to consider and prepare for migration:

- <https://learn.microsoft.com/en-us/azure/postgresql/single-server/whats-happening-to-postgresql-single-server>
- <https://learn.microsoft.com/en-us/azure/postgresql/migrate/concepts-single-to-flexible>
