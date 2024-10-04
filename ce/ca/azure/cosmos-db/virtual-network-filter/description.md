# Description

Limiting your Cosmos DB to only communicate on whitelisted networks lowers its attack footprint.

## Rationale

Selecting certain networks for your Cosmos DB to communicate restricts the number of networks including the internet that can interact with what is stored within the database.

## Impact

**WARNING**: Failure to whitelist the correct networks will result in a connection loss.

**WARNING**: Changes to Cosmos DB firewalls may take up to 15 minutes to apply. Ensure that sufficient time is planned for remediation or changes to avoid disruption.

## Audit

### From Azure Portal

1. Open the portal menu.
2. Select the Azure Cosmos DB blade.
3. Select a Cosmos DB to audit.
4. Select `Networking`.
5. Under `Public network access`, ensure `Selected networks` is selected.
6. Under `Virtual networks`, ensure appropriate virtual networks are configured.

### From Azure CLI

Retrieve a list of all CosmosDB database names:

```sh
az cosmosdb list
```

For each database listed, run the following command:

```sh
az cosmosdb show <database id>
```

For each database, ensure that `isVirtualNetworkFilterEnabled` is set to `true`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [862e97cf-49fc-4a5c-9de4-40d4e2e7c8eb](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F862e97cf-49fc-4a5c-9de4-40d4e2e7c8eb) - **Name**: `Azure Cosmos DB accounts should have firewall rules`

## Default Value

By default, Cosmos DBs are set to have access all networks.

## References

1. <https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-configure-private-endpoints>
2. <https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-configure-vnet-service-endpoint>
3. <https://docs.microsoft.com/en-us/cli/azure/cosmosdb?view=azure-cli-latest#az-cosmosdb-show>
4. <https://docs.microsoft.com/en-us/cli/azure/cosmosdb/database?view=azure-cli-latest#az-cosmosdb-database-list>
5. <https://docs.microsoft.com/en-us/powershell/module/az.cosmosdb/?view=azps-8.1.0>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
