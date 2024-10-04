# Description

The recommended way to access Key Vaults is to use the Azure Role-Based Access Control (RBAC) permissions model.

Azure RBAC is an authorization system built on Azure Resource Manager that provides fine-grained access management of Azure resources. It allows users to manage Key, Secret, and Certificate permissions. It provides one place to manage all permissions across all key vaults.

## Rationale

The new RBAC permissions model for Key Vaults enables a much finer grained access control for key vault secrets, keys, certificates, etc., than the vault access policy. This in turn will permit the use of privileged identity management over these roles, thus securing the key vaults with JIT Access management.

## Impact

Implementation needs to be properly designed from the ground up, as this is a fundamental change to the way key vaults are accessed/managed. Changing permissions to key vaults will result in loss of service as permissions are re-applied. For the least amount of downtime, map your current groups and users to their corresponding permission needs.

## Audit

### From Azure Portal

1. From Azure Home open the Portal Menu in the top left corner.
2. Select Key Vaults.
3. Select a Key Vault to audit.
4. Select Access configuration.
5. Ensure the Permission Model radio button is set to `Azure role-based access control`.

### From Azure CLI

Run the following command for each Key Vault in each Resource Group:

```sh
az keyvault show --resource-group <RESOURCE GROUP NAME> --name <KEY VAULT NAME>
```

Ensure the `enableRbacAuthorization` setting is set to `true` within the output of the above command.

### From PowerShell

Run the following PowerShell command:

```ps
Get-AzKeyVault -Vaultname <KEY VAULT NAME> -ResourceGroupName <RESOURCE GROUP NAME>
```

Ensure the `Enabled For RBAC Authorization` setting is set to `True`

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [12d4fa5e-1f9f-4c21-97a9-b99b3c6611b5](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F12d4fa5e-1f9f-4c21-97a9-b99b3c6611b5) - **Name**: `[Preview]: Azure Key Vault should use RBAC permission model`

## Default Value

The default value for Access control in Key Vaults is Vault Policy.

## References

1. <https://docs.microsoft.com/en-gb/azure/key-vault/general/rbac-migration#vault-access-policy-to-azure-rbac-migration-steps>
2. <https://docs.microsoft.com/en-gb/azure/role-based-access-control/role-assignments-portal?tabs=current>
3. <https://docs.microsoft.com/en-gb/azure/role-based-access-control/overview>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>
