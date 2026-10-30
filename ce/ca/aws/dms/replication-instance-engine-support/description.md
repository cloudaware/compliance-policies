# Description

Ensure that AWS Database Migration Service (DMS) replication instances use an engine version before its published end-of-life (EOL) date.

## Rationale

AWS schedules automatic upgrades at a version's EOL. A retained instance reporting that version after the deadline warrants investigation and a tested upgrade, or reconciliation of stale inventory. This is an actionable operational lifecycle check, not a requirement to run the newest release or evidence of a specific vulnerability.

## Impact

An engine upgrade interrupts replication. Verify endpoint compatibility and task behavior before scheduling maintenance, including source-log retention for change data capture (CDC). Multi-AZ deployment does not exempt an instance from engine lifecycle assessment or eliminate the need to plan the upgrade interruption.

## Audit

This policy marks an *AWS DMS Replication Instance* as `INCOMPLIANT` if it is not in an excluded `Status` listed below and its current `Engine Version` is **3.4.6**, **3.4.7**, **3.5.1**, **3.5.2**, **3.5.3**, or **3.6.0**. These releases have already reached EOL and are matched directly, without checking the evaluation date. Version **3.5.4** is `INCOMPLIANT` on or after **March 31, 2027**, its future EOL date. The earlier no-new-instance restriction does not make an existing instance noncompliant.

The calendar was verified against the current English HTML AWS DMS release notes on October 26, 2026. Earlier PDF copies can contain superseded deadlines:

| Engine version | Release | No new instances | EOL / automatic upgrade |
| --- | --- | --- | --- |
| 3.4.6 | 2021-11-30 | 2024-09-30 | 2024-10-31 |
| 3.4.7 | 2022-05-31 | 2024-09-30 | 2024-10-31 |
| 3.5.1 | 2023-06-30 | 2024-11-30 | 2025-03-15 |
| 3.5.2 | 2023-10-29 | 2025-03-30 | 2025-04-29 |
| 3.5.3 | 2024-05-17 | 2026-02-28 | 2026-06-30 |
| 3.5.4 | 2024-11-15 | 2027-01-31 | 2027-03-31 |
| 3.6.0 | 2024-12-27 | 2026-04-27 | 2026-07-27 |
| 3.6.1 | 2025-05-15 | Not announced | Not announced |

Version **3.5.4** is `COMPLIANT` before March 31, 2027. Version **3.6.1** is `COMPLIANT` because AWS has not announced its EOL.

Instances with `Status` **deleted**, **deleting**, **creating**, or **failed** are `INAPPLICABLE`, even when the engine version is absent.

Missing `Engine Version` for an instance outside the excluded states is diagnostic `UNDETERMINED`. Nonblank versions outside the exact verified calendar, including older unlisted releases, are `INAPPLICABLE`.
