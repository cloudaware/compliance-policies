# Description

Cosmos DB can use tokens or Entra ID for client authentication, which in turn uses Azure RBAC for authorization. Using Entra ID is significantly more secure because Entra ID handles credentials, enables MFA and centralized management, and Azure RBAC is better integrated with the rest of Azure.

## Rationale

Entra ID client authentication is considerably more secure than token-based authentication because tokens must be stored on the client. Entra ID does not require this.

## Audit

### From PowerShell

```ps
$cosmosDbName = "{{cosmos-db-account-name}}"
$resourceGroup = "{{resource-group-name}}"
az cosmosdb show --name $cosmosDbName --resource-group $resourceGroup | ConvertFrom-Json
```

In the resulting output, `disableLocalAuth` should be `true`.

## Default Value

The default is to use tokens/keys for client authentication.

## References

1. <https://learn.microsoft.com/en-us/azure/cosmos-db/role-based-access-control>
