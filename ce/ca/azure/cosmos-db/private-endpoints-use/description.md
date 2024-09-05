# Description

Private endpoints limit network traffic to approved sources.

## Rationale

For sensitive data, private endpoints allow granular control of which services can communicate with Cosmos DB and ensure that this network traffic is private. You set this up on a case by case basis for each service you wish to be connected.

## Impact

Only whitelisted services will have access to communicate with the Cosmos DB.

## Audit

### From Azure Portal

1. Open the portal menu.
2. Select the Azure Cosmos DB blade.
3. Select the Azure Cosmos DB account.
4. Select `Networking`.
5. Ensure `Public network access` is set to `Selected networks`.
6. Ensure the listed networks are set appropriately.
7. Select `Private access`.
8. Ensure a private endpoint exists and `Connection state is Approved`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [58440f8a-10c5-4151-bdce-dfbaad4a20b7](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F58440f8a-10c5-4151-bdce-dfbaad4a20b7) - **Name**: `CosmosDB accounts should use private link`

## Default Value

By default Cosmos DB does not have private endpoints enabled and its traffic is public to the network.

## References

1. <https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-configure-private-endpoints>
2. <https://docs.microsoft.com/en-us/azure/private-link/tutorial-private-endpoint-cosmosdb-portal>
3. <https://docs.microsoft.com/en-us/cli/azure/cosmosdb/private-endpoint-connection?view=azure-cli-latest>
4. <https://docs.microsoft.com/en-us/cli/azure/network/private-endpoint?view=azure-cli-latest#az-network-private-endpoint-create>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
