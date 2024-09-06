# Remediation

Map all the resources that currently access to the Azure Cosmos DB account with keys or access tokens.

Create an Entra ID identity for each of these resources:

- For Azure resources, you can create a managed identity. You may choose between system-assigned and user-assigned managed identities.
- For non-Azure resources, create an Entra ID identity. Grant each Entra ID identity the minimum permission it requires. When possible, we recommend you use one of the 2 built-in role definitions: Cosmos DB Built-in Data Reader or Cosmos DB Built-in Data Contributor. Validate that the new resource is functioning correctly. After new permissions are granted to identities, it may take a few hours until they propagate. When all resources are working correctly with the new identities, continue to the next step.

## From Powershell

```ps
$cosmosdbname = "<your-cosmos-db-account-name>" $resourcegroup = "<your-resource-group-name>" az cosmosdb show --name $cosmosdbname --resource-group $resourcegroup | ConvertFrom-Json az resource update --ids $cosmosdb.id --set properties.disableLocalAuth=true --latest-include-preview
```
