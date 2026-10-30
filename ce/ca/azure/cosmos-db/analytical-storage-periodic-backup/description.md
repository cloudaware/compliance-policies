# Description

Ensure that Azure Cosmos DB accounts with analytical storage enabled use continuous
backup instead of periodic backup. This configuration aligns the backup mode with
analytical workloads and helps identify opportunities to reduce avoidable costs.

## Rationale

Analytical storage supports large-scale analytical workloads, including Synapse Link
and Fabric Mirroring scenarios. Continuous backup is the recommended backup mode
for eligible workloads and can be more cost-effective than periodic backup. It also
supports point-in-time restoration within the configured retention period.

## Impact

Using periodic backup for an eligible analytical workload can result in avoidable
backup costs and provides restoration only from scheduled backup copies. Changing
from periodic to continuous backup is a one-way operation that can affect backup
retention options, restore procedures, regional availability, and cost. Plan the
change around the workload's operational and recovery requirements.

## Audit

This policy flags an *Azure Cosmos DB Account* as `INCOMPLIANT` when both of the
following conditions are true:

- `Analytical Storage` is set to `Enabled`.
- `Backup Policy Type` is set to `Periodic`.

An account is `COMPLIANT` when analytical storage is enabled and the backup policy
type is `Continuous`. An account is `INAPPLICABLE` when analytical storage is
disabled. The result is `UNDETERMINED` when either setting is unavailable or has an
unrecognized value.

## References

1. <https://learn.microsoft.com/en-us/azure/cosmos-db/continuous-backup-restore-introduction>
2. <https://learn.microsoft.com/en-us/cli/azure/cosmosdb#az-cosmosdb-show>
