# Description

Cosmos DB can use tokens or Entra ID for client authentication which in turn will use Azure RBAC for authorization. Using Entra ID is significantly more secure because Entra ID handles the credentials and allows for MFA and centralized management, and the Azure RBAC better integrated with the rest of Azure.

## Rationale

Entra ID client authentication is considerably more secure than token-based authentication because the tokens must be persistent at the client. Entra ID does not require this.

## Audit

### From Powershell

```ps
$cosmosdbname = "<your-cosmos-db-account-name>" $resourcegroup = "<your-resource-group-name>" az cosmosdb show --name $cosmosdbname --resource-group $resourcegroup | ConvertFrom-Json
```

In the resulting output, `disableLocalAuth` should be `true`.

## Default Value

The default is to use tokens/keys for client authentication.

## References

1. <https://learn.microsoft.com/en-us/azure/cosmos-db/role-based-access-control>
