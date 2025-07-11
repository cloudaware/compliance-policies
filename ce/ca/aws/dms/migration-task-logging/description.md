# Description

This policy checks that AWS DMS Replication Tasks have CloudWatch logging enabled for key replication components.  It verifies that the following components are configured to emit logs at the default severity level or higher:

- `TARGET_APPLY` – Data and DDL statements applied to the target database.
- `TARGET_LOAD` – Data batches being loaded into the target database.
- `SOURCE_CAPTURE` – Change data capture (CDC) records sourced from the origin database or service and handed off to the DMS sorter.
- `SOURCE_UNLOAD` – Data extracted from the source database during full-load operations.

DMS supports the following log severity levels, each inclusive of messages from all lower tiers:

- `LOGGER_SEVERITY_ERROR` – Only error events.
- `LOGGER_SEVERITY_WARNING` – Warnings and error events.
- `LOGGER_SEVERITY_INFO` – Informational, warning, and error events.
- `LOGGER_SEVERITY_DEFAULT` – Default informational, warning, and error events (equivalent to INFO).
- `LOGGER_SEVERITY_DEBUG` – Debug, informational, warning, and error events.
- `LOGGER_SEVERITY_DETAILED_DEBUG` – Full diagnostic output, including debug, informational, warning, and error events.

## Rationale

Enabling logging for DMS task provides visibility into each phase of data migration: full load, CDC capture, data sorting, and application, enabling proactive health monitoring. This granular data is essential for capturing detailed error, warning, and diagnostic messages for performance tuning and connectivity issue resolution.

## Audit

This policy marks an *AWS DMS Migration Task* as `INCOMPLIANT` if the `Settings JSON` for **Logging** meet any of the following conditions:

- `EnableLogging` is set to **false**.
- The severity level for `TARGET_LOAD`, `TARGET_APPLY`, `SOURCE_CAPTURE`, or `SOURCE_UNLOAD` is missing or configured below **LOGGER_SEVERITY_DEFAULT**.
