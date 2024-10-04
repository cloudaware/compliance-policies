# Description

Cross Tenant Replication in Azure allows data to be replicated across multiple Azure tenants. While this feature can be beneficial for data sharing and availability, it also poses a significant security risk if not properly managed. Unauthorized data access, data leakage, and compliance violations are potential risks. Disabling Cross Tenant Replication ensures that data is not inadvertently replicated across different tenant boundaries without explicit authorization.

## Rationale

Disabling Cross Tenant Replication minimizes the risk of unauthorized data access and ensures that data governance policies are strictly adhered to. This control is especially critical for organizations with stringent data security and privacy requirements, as it prevents the accidental sharing of sensitive information.

## Impact

Disabling Cross Tenant Replication may affect data availability and sharing across different Azure tenants. Ensure that this change aligns with your organizational data sharing and availability requirements.

## Audit

### From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under `Data management`, click `Object replication`.
3. Click `Advanced settings`.
4. Ensure `Allow cross-tenant replication` is not checked.

### From Azure CLI

```sh
az storage account list --query "[*].[name,allowCrossTenantReplication]"
```

The value of `false` should be returned for each storage account listed.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [92a89a79-6c52-4a7e-a03f-61306fc49312](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%92a89a79-6c52-4a7e-a03f-61306fc49312) - **Name**: `Storage accounts should prevent cross tenant object replication`

## Default Value

For new storage accounts created after Dec 15, 2023 cross tenant replication is not enabled.

## References

1. <https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-prevent-cross-tenant-policies?tabs=portal>
