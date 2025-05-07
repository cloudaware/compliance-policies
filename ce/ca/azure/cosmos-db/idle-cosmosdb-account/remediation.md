# Remediation

## If the Account is No Longer Needed

Delete the account using the following commands:

### Azure CLI

```sh
az cosmosdb delete --name {{cosmosdb-account-name}} --resource-group {{resource-group-name}}
```

### PowerShells

```ps
Remove-AzCosmosDBAccount -ResourceGroupName "{{resource-group-name}}" -Name "{{cosmosdb-account-name}}"
```

### If the Account is Needed But Idle Consider Serverless Tier

To get started with using the serverless model, you must create a new serverless account. Migrating an existing account to or from the serverless model currently isn't supported.
