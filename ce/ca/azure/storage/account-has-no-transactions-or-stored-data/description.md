# Description

Review Azure Storage Accounts that have not processed transactions and have not stored data during the last 30 days. The policy evaluates the 30-day sum of the `Transactions` metric and the 30-day average of the `Used Capacity` metric.

## Rationale

An unused storage account can still create management overhead and may incur charges for account-level features, such as private endpoints, diagnostic settings, or retained service data. Reviewing accounts with no observed activity or capacity helps identify resources that can be retired after their business and technical dependencies have been verified.

## Impact

Storage accounts identified by this policy are candidates for decommissioning. Removing confirmed unused accounts reduces management overhead and costs associated with attached services.

Before deletion, follow the normal change-management process to confirm ownership, application dependencies, and retention or disaster-recovery requirements. Deleting a storage account permanently removes its data and can interrupt dependent workloads.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` when both of the following metrics are zero for the last 30 days:

- `Transactions` (sum)
- `Used Capacity` (average)

The account is `UNDETERMINED` when either metric is unavailable. It is `COMPLIANT` when either transactions or stored data are present.
