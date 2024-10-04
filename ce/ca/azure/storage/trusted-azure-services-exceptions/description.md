# Description

NOTE: This recommendation assumes that the `Public network access` parameter is set to `Enabled from selected virtual networks and IP addresses`. Please ensure the prerequisite recommendation has been implemented before proceeding:

- Ensure Default Network Access Rule for Storage Accounts is Set to Deny

Some Azure services that interact with storage accounts operate from networks that can't be granted access through network rules. To help this type of service work as intended, allow the set of trusted Azure services to bypass the network rules. These services will then use strong authentication to access the storage account. If the `Allow Azure services on the trusted services list to access this storage account` exception is enabled, the following services are granted access to the storage account: Azure Backup, Azure Data Box, Azure DevTest Labs, Azure Event Grid, Azure Event Hubs, Azure File Sync, Azure HDInsight, Azure Import/Export, Azure Monitor, Azure Networking Services, and Azure Site Recovery (when registered in the subscription).

## Rationale

Turning on firewall rules for storage account will block access to incoming requests for data, including from other Azure services. We can re-enable this functionality by enabling `Trusted Azure Services` through networking exceptions.

## Impact

This creates authentication credentials for services that need access to storage resources so that services will no longer need to communicate via network request. There may be a temporary loss of communication as you set each Storage Account. It is recommended to not do this on mission-critical resources during business hours.

## Audit

### From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, under Security + networking, click `Networking`.
3. Click on the `Firewalls and virtual networks` heading.
4. Under `Exceptions`, ensure that `Allow Azure services on the trusted services list to access this storage account` is checked.

### From Azure CLI

Ensure `bypass` contains `AzureServices`:

```sh
az storage account list --query '[*].networkRuleSet'
```

### From PowerShell

```ps
Connect-AzAccount Set-AzContext -Subscription <subscription ID> Get-AzStorageAccountNetworkRuleset -ResourceGroupName <resource group> -Name <storage account name> |Select-Object Bypass
```

If the response from the above command is `None`, the storage account configuration is out of compliance with this check. If the response is `AzureServices`, the storage account configuration is in compliance with this check.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c9d007d0-c057-4772-b18c-01e546713bcd](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc9d007d0-c057-4772-b18c-01e546713bcd) - **Name**: `Storage accounts should allow access from trusted Microsoft services`

## Default Value

By default, Storage Accounts will accept connections from clients on any network.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
