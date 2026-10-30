# Description

Ensure that auto-pause is enabled for eligible Azure SQL Database serverless
databases. Auto-pause suspends compute after the configured period of inactivity,
which can reduce charges for intermittent workloads.

## Rationale

Azure SQL Database serverless automatically scales compute for variable workloads.
When auto-pause is enabled, it also pauses inactive databases and resumes them when
they receive a new connection. This avoids paying for idle compute while retaining
the database and its configuration.

## Impact

With auto-pause disabled, an idle serverless database continues to incur compute
charges. Enabling it can add resume latency to the first connection after a pause,
so it may be unsuitable for workloads that require consistently low connection
latency or cannot be paused between scheduled jobs.

## Audit

This policy evaluates an *Azure SQL Database* that uses the General Purpose
serverless compute tier.

A *Database* is marked as `INCOMPLIANT` when `Auto Pause Delay` is `-1`, which
means that auto-pause is disabled.

A *Database* is marked as `INAPPLICABLE` if it meets any of the following
conditions:

- It is a system database.
- Its `Kind` does not identify it as serverless.
- Its `Current SKU: Tier` is not `GeneralPurpose`.

A *Database* is marked as `UNDETERMINED` if its `Kind` is unavailable, or if a
serverless database has no `Current SKU: Tier` or `Auto Pause Delay` value.

A *Database* is marked as `COMPLIANT` when it is in scope and `Auto Pause Delay`
is a value other than `-1`.

## References

1. <https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview>
2. <https://learn.microsoft.com/en-us/cli/azure/sql/db#az-sql-db-update>
3. <https://learn.microsoft.com/en-us/powershell/module/az.sql/set-azsqldatabase>
