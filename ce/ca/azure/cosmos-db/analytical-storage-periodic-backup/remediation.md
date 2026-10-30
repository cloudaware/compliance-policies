# Remediation

This finding is a configuration review, not evidence that Synapse Link or Fabric
Mirroring is active. Before migrating, confirm that the account and its API support
continuous backup. Review workload eligibility, retention, restore requirements,
regional availability, and pricing impact. Migration from periodic to continuous
backup is irreversible.

## From Azure Portal

1. Open the Azure Cosmos DB account.
2. Select **Backup & Restore**.
3. Select **Continuous** backup.
4. Choose the available continuous-backup retention option that meets the recovery
   requirement.
5. Review the irreversible-change warning, then confirm the migration.

## From Azure CLI

```sh
az cosmosdb update \
  --name {{cosmosdb-account-name}} \
  --resource-group {{resource-group-name}} \
  --backup-policy-type Continuous
```

Verify the change:

```sh
az cosmosdb show \
  --name {{cosmosdb-account-name}} \
  --resource-group {{resource-group-name}} \
  --query "backupPolicy.type" \
  --output tsv
```

The command must return `Continuous`.

## References

1. <https://learn.microsoft.com/en-us/azure/cosmos-db/continuous-backup-restore-introduction>
2. <https://learn.microsoft.com/en-us/cli/azure/cosmosdb#az-cosmosdb-update>
