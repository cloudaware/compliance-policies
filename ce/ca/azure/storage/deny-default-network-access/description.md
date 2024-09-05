# Description

Restricting default network access helps to provide a new layer of security, since storage accounts accept connections from clients on any network. To limit access to selected networks, the default action must be changed.

## Rationale

Storage accounts should be configured to deny access to traffic from all networks (including internet traffic). Access can be granted to traffic from specific Azure Virtual networks, allowing a secure network boundary for specific applications to be built. Access can also be granted to public internet IP address ranges to enable connections from specific internet or on-premises clients. When network rules are configured, only applications from allowed networks can access a storage account. When calling from an allowed network, applications continue to require proper authorization (a valid access key or SAS token) to access the storage account.

## Impact

All allowed networks will need to be whitelisted on each specific network, creating administrative overhead. This may result in loss of network connectivity, so do not turn on for critical resources during business hours.

## Audit

### From Azure Console

1. Go to Storage Accounts.
2. For each storage account, Click on the `Networking` blade.
3. Click the `Firewalls and virtual networks` heading.
4. Ensure that Allow access from `All networks` is not selected.

### From Azure CLI

Ensure `defaultAction` is not set to `Allow`:

```sh
az storage account list --query '[*].networkRuleSet'
```

### From PowerShell

```ps
Connect-AzAccount Set-AzContext -Subscription <subscription ID> Get-AzStorageAccountNetworkRuleset -ResourceGroupName <resource group> -Name <storage account name> |Select-Object DefaultAction
```

### PowerShell Result - Non-Compliant

```
DefaultAction : Allow
```

### PowerShell Result - Compliant

```
DefaultAction : Deny
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [34c877ad-507e-4c82-993e-3452a6e0ad3c](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F34c877ad-507e-4c82-993e-3452a6e0ad3c) - **Name**: `Storage accounts should restrict network access`
- **Policy ID**: [2a1a9cdf-e04d-429a-8416-3bfb72a1b26f](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F2a1a9cdf-e04d-429a-8416-3bfb72a1b26f) - **Name**: `Storage accounts should restrict network access using virtual network rules`

## Default Value

By default, Storage Accounts will accept connections from clients on any network.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
